import electron from 'electron';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import https from 'https';
import http from 'http';
import crypto from 'crypto';
import { DiscoveryService } from './services/discovery.ts';
import { NetworkService } from './services/NetworkService.ts';
import { StandardKey } from './types/keyMap.js';

const { app, BrowserWindow, Menu, Tray, ipcMain, nativeImage, shell } = electron;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 导入 native addon
let driver: any = null;
try {
    // 根据环境判断 addon 路径
    // 开发环境：使用相对路径
    // 生产环境（打包后）：使用 process.resourcesPath
    const addonPath = app.isPackaged
        ? path.join(process.resourcesPath, 'native/build/Release/driver.node')
        : path.resolve(__dirname, '../../native/build/Release/driver.node');
    
    console.log('尝试加载 Native addon:', addonPath);
    console.log('应用状态 - isPackaged:', app.isPackaged);
    
    if (fs.existsSync(addonPath)) {
        console.log('Native addon 文件存在');
        // 使用 require 加载 native 模块（createRequire 用于 ES modules）
        const { createRequire } = await import('module');
        const require = createRequire(import.meta.url);
        driver = require(addonPath);
        console.log('Native driver module loaded successfully');
        console.log('Available functions:', Object.keys(driver));
    } else {
        console.warn('Native driver module not found at:', addonPath);
    }
} catch (error) {
    console.error('Failed to load native driver module:', error);
    console.error('Error details:', error instanceof Error ? error.message : error);
    console.error('Error stack:', error instanceof Error ? error.stack : error);
}

const isDevelopment = process.env.NODE_ENV === 'development';
const devServerUrl = process.env.VITE_DEV_SERVER_URL ?? 'http://localhost:5173';
const rendererHtmlPath = path.resolve(__dirname, '../index.html');

// 设置用户数据目录为程序所在目录的 data 文件夹（实现完全便携）
// 开发环境：使用项目根目录的 data 文件夹
// 生产环境（打包后）：使用可执行文件所在目录的 data 文件夹
let localDataDir: string;
if (app.isPackaged) {
    // 打包后的应用：使用可执行文件所在目录
    const appDir = path.dirname(app.getPath('exe'));
    localDataDir = path.join(appDir, 'data');
} else {
    // 开发环境或未打包：使用项目根目录
    // __dirname 是 dist/electron 目录，需要向上一级到项目根目录
    const projectRoot = path.resolve(__dirname, '..');
    localDataDir = path.join(projectRoot, 'data');
}

try {
    fs.mkdirSync(localDataDir, { recursive: true });
    app.setPath('userData', localDataDir);
    console.log('用户数据目录已设置为:', localDataDir);
} catch (error) {
    console.error('设置用户数据目录失败:', error);
}

const forwardedKeys: Set<string> = new Set([
  StandardKey.CONFIRM,  // 空格键 - 确定/播放暂停
  StandardKey.MENU,     // M 键 - 呼出菜单
  StandardKey.BACK,     // Escape - 返回
  StandardKey.LEFT,
  StandardKey.RIGHT,
  StandardKey.UP,
  StandardKey.DOWN,
  StandardKey.MINUS,
  StandardKey.UNDERSCORE,
  StandardKey.EQUALS,
  StandardKey.PLUS
]);

let isSettingsPanelFocused = false;

let win: InstanceType<typeof BrowserWindow>;
let tray: InstanceType<typeof Tray> | null = null;
let isQuitting = false;

type HomeMode = 'tv' | 'game';

type AppSettings = {
    launchModuleId: string;
    openModuleOnLaunch: boolean;
    startAtLogin: boolean;
    homeMode: HomeMode;
};

const defaultSettings: AppSettings = {
    launchModuleId: '',
    openModuleOnLaunch: false,
    startAtLogin: false,
    homeMode: 'tv'
};

function getPluginConfigPath() {
    return path.join(app.getPath('userData'), 'plugin-config.json');
}

function getAppSettingsPath() {
    return path.join(app.getPath('userData'), 'app-settings.json');
}

function getIconCacheDir() {
    return path.join(app.getPath('userData'), 'icon-cache');
}

function getIconCachePath(url: string): string {
    // 使用 URL 的哈希作为文件名
    const hash = crypto.createHash('md5').update(url).digest('hex');
    return path.join(getIconCacheDir(), `${hash}.png`);
}

function readPluginConfigFile() {
    const filePath = getPluginConfigPath();
    if (!fs.existsSync(filePath)) {
        return {};
    }

    try {
        return JSON.parse(fs.readFileSync(filePath, 'utf-8')) as Record<string, Record<string, unknown>>;
    } catch (error) {
        console.error('读取插件配置失败:', error);
        return {};
    }
}

function writePluginConfigFile(config: Record<string, Record<string, unknown>>) {
    const filePath = getPluginConfigPath();
    fs.mkdirSync(path.dirname(filePath), { recursive: true });
    fs.writeFileSync(filePath, JSON.stringify(config, null, 2), 'utf-8');
}

function readAppSettingsFile() {
    const filePath = getAppSettingsPath();
    if (!fs.existsSync(filePath)) {
        return {
            ...defaultSettings,
            startAtLogin: app.getLoginItemSettings().openAtLogin
        };
    }

    try {
        const raw = JSON.parse(fs.readFileSync(filePath, 'utf-8')) as Partial<AppSettings>;
        return {
            ...defaultSettings,
            ...raw,
            startAtLogin: app.getLoginItemSettings().openAtLogin
        };
    } catch (error) {
        console.error('读取应用设置失败:', error);
        return {
            ...defaultSettings,
            startAtLogin: app.getLoginItemSettings().openAtLogin
        };
    }
}

function writeAppSettingsFile(settings: AppSettings) {
    const filePath = getAppSettingsPath();
    fs.mkdirSync(path.dirname(filePath), { recursive: true });
    fs.writeFileSync(filePath, JSON.stringify(settings, null, 2), 'utf-8');
}

async function downloadIcon(url: string, maxRedirects: number = 5): Promise<Buffer | null> {
    return new Promise((resolve) => {
        const protocol = url.startsWith('https:') ? https : http;
        
        // 构造请求选项，添加必要的请求头
        const options = {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                'Accept': 'image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8',
                'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8',
                'Connection': 'keep-alive'
            }
        };      
        
        protocol.get(url, options, (res) => {            
            // 处理重定向
            if (res.statusCode === 301 || res.statusCode === 302 || res.statusCode === 307 || res.statusCode === 308) {
                const location = res.headers.location;
                
                if (!location) {
                    console.error(`重定向但没有 Location 头: ${url}`);
                    resolve(null);
                    return;
                }
                
                if (maxRedirects <= 0) {
                    console.error(`重定向次数过多: ${url}`);
                    resolve(null);
                    return;
                }
                
                // 构造完整的重定向 URL
                let redirectUrl = location;
                if (location.startsWith('//')) {
                    redirectUrl = url.split('//')[0] + location;
                } else if (location.startsWith('/')) {
                    const urlObj = new URL(url);
                    redirectUrl = `${urlObj.protocol}//${urlObj.host}${location}`;
                }
                                
                // 递归调用，跟随重定向
                res.resume(); // 消耗当前响应数据
                downloadIcon(redirectUrl, maxRedirects - 1).then(resolve);
                return;
            }
            
            if (res.statusCode !== 200) {
                console.error(`下载图标失败: ${url}, 状态码: ${res.statusCode}`);
                resolve(null);
                return;
            }

            const chunks: Buffer[] = [];
            res.on('data', (chunk) => chunks.push(chunk));
            res.on('end', () => {
                const buffer = Buffer.concat(chunks);
                resolve(buffer);
            });
            res.on('error', (err) => {
                console.error(`下载图标错误: ${url}`, err);
                resolve(null);
            });
        }).on('error', (err) => {
            console.error(`请求图标失败: ${url}`, err);
            resolve(null);
        });
    });
}

async function cacheIcon(url: string): Promise<string | null> {
    try {
        const cacheDir = getIconCacheDir();
        fs.mkdirSync(cacheDir, { recursive: true });

        const cachePath = getIconCachePath(url);
        
        // 检查是否已缓存
        if (fs.existsSync(cachePath)) {
            return `file://${cachePath}`;
        }

        const iconBuffer = await downloadIcon(url);
        
        if (!iconBuffer || iconBuffer.length === 0) {
            console.error(`图标下载失败或为空: ${url}`);
            return null;
        }

        // 保存到缓存
        fs.writeFileSync(cachePath, iconBuffer);        
        return `file://${cachePath}`;
    } catch (error) {
        console.error(`缓存图标失败: ${url}`, error);
        return null;
    }
}

function persistAppSettings(value: Partial<AppSettings>) {
    const nextSettings = {
        ...readAppSettingsFile(),
        ...value
    };

    app.setLoginItemSettings({
        openAtLogin: nextSettings.startAtLogin,
        path: process.execPath
    });

    nextSettings.startAtLogin = app.getLoginItemSettings().openAtLogin;
    writeAppSettingsFile(nextSettings);
    return nextSettings;
}

function forwardKeyInput(target: InstanceType<typeof BrowserWindow>['webContents']) {
    target.on('before-input-event', (event, input) => {
        if (input.type !== 'keyDown') {
            return;
        }
        
        // 如果设置面板有焦点，不拦截任何按键，让浏览器默认行为处理
        if (isSettingsPanelFocused) {
            return;
        }
        
        if (!forwardedKeys.has(input.key)) {
            return;
        }

        event.preventDefault();
        win.webContents.send('app-keydown', { key: input.key });
    });
}

function resolveCustomIconPath() {
    return [
        path.resolve(__dirname, '../assets/tray-icon.png'),
        path.resolve(__dirname, '../../electron/assets/tray-icon.png')
    ].find((candidate) => fs.existsSync(candidate));
}

function createTrayIcon() {
    const customIconPath = resolveCustomIconPath();
    if (customIconPath) {
        return nativeImage.createFromPath(customIconPath).resize({ width: 16, height: 16 });
    }

    const traySvg = `
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
            <rect x="1.5" y="2" width="13" height="9" rx="2" fill="#06161b" stroke="#55d6be" stroke-width="1.5"/>
            <rect x="4.5" y="5" width="7" height="3" rx="1" fill="#55d6be"/>
            <rect x="6" y="11.5" width="4" height="1.5" rx="0.75" fill="#55d6be"/>
            <rect x="5" y="13" width="6" height="1.5" rx="0.75" fill="#55d6be"/>
        </svg>
    `.trim();

    const icon = nativeImage.createFromDataURL(
        `data:image/svg+xml;base64,${Buffer.from(traySvg).toString('base64')}`
    );

    return icon.resize({ width: 16, height: 16 });
}

function createWindow() {
    const customIconPath = resolveCustomIconPath();

    win = new BrowserWindow({
        width: 800,
        height: 600,
        backgroundColor: '#06161b',
        icon: customIconPath,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            webviewTag: true,
            webSecurity: false
        }
    });

    win.webContents.setWindowOpenHandler(({ url }) => {
        shell.openExternal(url);
        return { action: 'deny' };
    });

    forwardKeyInput(win.webContents);

    win.webContents.on('did-attach-webview', (_event, guestContents) => {
        forwardKeyInput(guestContents);
    });

    console.log('Loading URL:', isDevelopment ? devServerUrl : rendererHtmlPath);
    if (isDevelopment) {
        win.loadURL(devServerUrl);
        win.webContents.openDevTools();
    } else {
        win.loadFile(rendererHtmlPath);
        // 临时启用开发者工具以调试图标缓存问题
        setTimeout(() => {
            win.webContents.openDevTools();
        }, 1000);
    }

    win.on('close', (event) => {
        if (isQuitting) {
            return;
        }

        event.preventDefault();
        win.hide();
    });
}

function showMainWindow() {
    if (win.isMinimized()) {
        win.restore();
    }

    win.show();
    win.focus();
}

function createTray() {
    if (tray) {
        return;
    }

    tray = new Tray(createTrayIcon());
    tray.setToolTip('TV Assistant');
    tray.setContextMenu(
        Menu.buildFromTemplate([
            {
                label: '显示主窗口',
                click: () => {
                    showMainWindow();
                }
            },
            {
                label: '退出',
                click: () => {
                    isQuitting = true;
                    app.quit();
                }
            }
        ])
    );

    tray.on('click', () => {
        if (win.isVisible()) {
            win.focus();
            return;
        }

        showMainWindow();
    });
}

app.whenReady().then(() => {
    // 预先创建图标缓存目录
    const iconCacheDir = getIconCacheDir();
    try {
        fs.mkdirSync(iconCacheDir, { recursive: true });
        //console.log('图标缓存目录已准备:', iconCacheDir);
    } catch (error) {
        console.error('创建图标缓存目录失败:', error);
    }

    ipcMain.handle('settings:get', () => {
        return readAppSettingsFile();
    });

    ipcMain.handle('settings:set', (_event, value: Partial<AppSettings>) => {
        return persistAppSettings(value);
    });
    
    // 监听设置面板焦点状态
    ipcMain.on('settings-panel:focus-changed', (event, isFocused) => {
        isSettingsPanelFocused = isFocused;
    });

    ipcMain.handle('plugin-config:get', (_event, pluginId: string) => {
        const config = readPluginConfigFile();
        return config[pluginId] ?? {};
    });

    ipcMain.handle('plugin-config:set', (_event, pluginId: string, value: Record<string, unknown>) => {
        const config = readPluginConfigFile();
        config[pluginId] = value;
        writePluginConfigFile(config);
        return config[pluginId];
    });

    // 图标缓存相关 IPC
    ipcMain.handle('icon:cache', async (_event, url: string) => {
        //console.log('Caching icon:', url);
        if (!url) return null;
        return await cacheIcon(url);
    });

    ipcMain.handle('icon:get-cached', (_event, url: string) => {
        if (!url) return null;
        const cachePath = getIconCachePath(url);
        if (fs.existsSync(cachePath)) {
            //console.log('找到缓存图标:', cachePath);
            return `file://${cachePath}`;
        }
        //console.log('未找到缓存图标:', url);
        return null;
    });

    ipcMain.handle('icon:clear-cache', () => {
        const cacheDir = getIconCacheDir();
        if (fs.existsSync(cacheDir)) {
            try {
                const files = fs.readdirSync(cacheDir);
                files.forEach(file => {
                    fs.unlinkSync(path.join(cacheDir, file));
                });
                console.log('图标缓存已清除');
                return true;
            } catch (error) {
                console.error('清除图标缓存失败:', error);
                return false;
            }
        }
        return true;
    });

    // 删除单个图标缓存
    ipcMain.handle('icon:delete', (_event, url: string) => {
        if (!url) return false;
        try {
            const cachePath = getIconCachePath(url);
            if (fs.existsSync(cachePath)) {
                fs.unlinkSync(cachePath);
                console.log(`已删除图标缓存: ${cachePath}`);
                return true;
            }
            console.log(`图标缓存不存在: ${cachePath}`);
            return false;
        } catch (error) {
            console.error(`删除图标缓存失败: ${url}`, error);
            return false;
        }
    });

    // 通过文件路径删除图标缓存
    ipcMain.handle('icon:delete-by-path', (_event, filePath: string) => {
        if (!filePath) return false;
        try {
            if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath);
                console.log(`已通过路径删除图标缓存: ${filePath}`);
                return true;
            }
            console.log(`图标文件不存在: ${filePath}`);
            return false;
        } catch (error) {
            console.error(`通过路径删除图标缓存失败: ${filePath}`, error);
            return false;
        }
    });

    // 打开文件选择对话框选择 .exe 文件
    ipcMain.handle('file:select-exe', async () => {
        const result = await electron.dialog.showOpenDialog(win, {
            title: '选择应用程序',
            properties: ['openFile'],
            filters: [
                { name: '可执行文件', extensions: ['exe'] },
                { name: '所有文件', extensions: ['*'] }
            ]
        });
        
        if (result.canceled || result.filePaths.length === 0) {
            return null;
        }
        
        return result.filePaths[0];
    });

    // 从可执行文件中提取图标
    ipcMain.handle('icon:extract-from-exe', async (_event, exePath: string) => {
        if (!exePath || !fs.existsSync(exePath)) {
            console.warn(`文件不存在: ${exePath}`);
            return null;
        }
        
        try {
            console.log(`开始提取图标: ${exePath}`);
            
            // 生成缓存路径
            const cachePath = getIconCachePath(`exe://${exePath}`);
            
            // 确保缓存目录存在
            fs.mkdirSync(path.dirname(cachePath), { recursive: true });
            
            // 尝试使用 native addon 提取高清图标
            if (driver && driver.extractIcon) {
                console.log('使用 Native API 提取图标');
                const success = driver.extractIcon(exePath, cachePath.replace('file:///', ''));
                
                if (success) {
                    console.log(`成功使用 Native API 提取图标到 ${cachePath}`);
                    const stats = fs.statSync(cachePath.replace('file:///', ''));
                    console.log(`图标文件大小: ${(stats.size / 1024).toFixed(2)} KB`);
                    return `file://${cachePath.replace('file:///', '')}`;
                } else {
                    console.warn('Native API 提取失败，降级到 app.getFileIcon');
                }
            } else {
                console.log('Native addon 不可用，使用 app.getFileIcon');
            }
            
            // 降级方案：使用 app.getFileIcon
            const icon = await app.getFileIcon(exePath, { size: 'large' });
            
            if (icon.isEmpty()) {
                console.warn(`无法从 ${exePath} 提取图标（图标为空）`);
                return null;
            }
            
            const originalSize = icon.getSize();
            console.log(`成功提取图标，原始尺寸: ${originalSize.width}x${originalSize.height}`);
            
            // 暂时禁用缩放，直接使用原始尺寸
            const finalIcon = icon;
            
            console.log(`最终图标尺寸: ${finalIcon.getSize().width}x${finalIcon.getSize().height}`);
            
            // 保存为 PNG 文件
            const buffer = finalIcon.toPNG();
            fs.writeFileSync(cachePath.replace('file:///', ''), buffer);
            
            console.log(`已从 ${exePath} 提取并缓存图标到 ${cachePath}`);
            console.log(`图标文件大小: ${(buffer.length / 1024).toFixed(2)} KB`);
            return `file://${cachePath.replace('file:///', '')}`;
        } catch (error) {
            console.error(`从 ${exePath} 提取图标失败:`, error);
            console.error(`错误详情:`, error instanceof Error ? error.message : error);
            return null;
        }
    });

    // 打开本地应用程序
    ipcMain.handle('app:open-local', async (_event, exePath: string) => {
        if (!exePath) {
            return { success: false, error: '文件路径为空' };
        }
        
        try {
            // 转换 file:// URL 为本地路径
            let filePath = exePath;
            if (exePath.startsWith('file:///')) {
                filePath = decodeURIComponent(exePath.substring(8));
                // Windows 路径处理
                if (process.platform === 'win32') {
                    filePath = filePath.replace(/^\//, '');
                }
            }
            
            // 检查文件是否存在
            if (!fs.existsSync(filePath)) {
                console.error(`文件不存在: ${filePath}`);
                return { success: false, error: '文件不存在' };
            }
            
            // 使用 shell.openPath 打开文件
            const result = await shell.openPath(filePath);
            
            if (result) {
                console.error(`打开应用失败: ${result}`);
                return { success: false, error: result };
            }
            
            console.log(`成功打开应用: ${filePath}`);
            return { success: true };
        } catch (error) {
            console.error(`打开应用时出错:`, error);
            return { success: false, error: error instanceof Error ? error.message : '未知错误' };
        }
    });

    createWindow();
    createTray();

    const discovery = new DiscoveryService(9999, console.log);
    discovery.start();

    const network = new NetworkService(5001, console.log);
    network.start();

    app.on('before-quit', () => {
        isQuitting = true;
        discovery.stop();
        network.stop();
    });

    app.on('activate', () => {
        showMainWindow();
    });
});
    
