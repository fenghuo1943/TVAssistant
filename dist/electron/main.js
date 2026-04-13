import electron from 'electron';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import https from 'https';
import http from 'http';
import crypto from 'crypto';
import { DiscoveryService } from "./services/discovery.js";
import { NetworkService } from "./services/NetworkService.js";
import { StandardKey } from './types/keyMap.js';
const { app, BrowserWindow, Menu, Tray, ipcMain, nativeImage, shell } = electron;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const isDevelopment = process.env.NODE_ENV === 'development';
const devServerUrl = process.env.VITE_DEV_SERVER_URL ?? 'http://localhost:5173';
const rendererHtmlPath = path.resolve(__dirname, '../index.html');
const forwardedKeys = new Set([
    StandardKey.CONFIRM, // 空格键 - 确定/播放暂停
    StandardKey.MENU, // M 键 - 呼出菜单
    StandardKey.BACK, // Escape - 返回
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
let win;
let tray = null;
let isQuitting = false;
const defaultSettings = {
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
function getIconCachePath(url) {
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
        return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    }
    catch (error) {
        console.error('读取插件配置失败:', error);
        return {};
    }
}
function writePluginConfigFile(config) {
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
        const raw = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
        return {
            ...defaultSettings,
            ...raw,
            startAtLogin: app.getLoginItemSettings().openAtLogin
        };
    }
    catch (error) {
        console.error('读取应用设置失败:', error);
        return {
            ...defaultSettings,
            startAtLogin: app.getLoginItemSettings().openAtLogin
        };
    }
}
function writeAppSettingsFile(settings) {
    const filePath = getAppSettingsPath();
    fs.mkdirSync(path.dirname(filePath), { recursive: true });
    fs.writeFileSync(filePath, JSON.stringify(settings, null, 2), 'utf-8');
}
async function downloadIcon(url, maxRedirects = 5) {
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
        console.log(`正在下载图标: ${url}`);
        protocol.get(url, options, (res) => {
            console.log(`下载图标状态码: ${res.statusCode}`);
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
                }
                else if (location.startsWith('/')) {
                    const urlObj = new URL(url);
                    redirectUrl = `${urlObj.protocol}//${urlObj.host}${location}`;
                }
                console.log(`跟随重定向到: ${redirectUrl} (剩余次数: ${maxRedirects - 1})`);
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
            const chunks = [];
            res.on('data', (chunk) => chunks.push(chunk));
            res.on('end', () => {
                const buffer = Buffer.concat(chunks);
                console.log(`图标下载成功，大小: ${buffer.length} bytes`);
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
async function cacheIcon(url) {
    try {
        console.log('正在缓存图标123:', url);
        const cacheDir = getIconCacheDir();
        fs.mkdirSync(cacheDir, { recursive: true });
        const cachePath = getIconCachePath(url);
        // 检查是否已缓存
        if (fs.existsSync(cachePath)) {
            console.log(`图标已缓存: ${url}`);
            return `file://${cachePath}`;
        }
        // 下载图标
        console.log(`正在下载图标: ${url}`);
        const iconBuffer = await downloadIcon(url);
        if (!iconBuffer || iconBuffer.length === 0) {
            console.error(`图标下载失败或为空: ${url}`);
            return null;
        }
        // 保存到缓存
        fs.writeFileSync(cachePath, iconBuffer);
        console.log(`图标已缓存到: ${cachePath}`);
        return `file://${cachePath}`;
    }
    catch (error) {
        console.error(`缓存图标失败: ${url}`, error);
        return null;
    }
}
function persistAppSettings(value) {
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
function forwardKeyInput(target) {
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
    const icon = nativeImage.createFromDataURL(`data:image/svg+xml;base64,${Buffer.from(traySvg).toString('base64')}`);
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
    }
    else {
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
    tray.setContextMenu(Menu.buildFromTemplate([
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
    ]));
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
    }
    catch (error) {
        console.error('创建图标缓存目录失败:', error);
    }
    ipcMain.handle('settings:get', () => {
        return readAppSettingsFile();
    });
    ipcMain.handle('settings:set', (_event, value) => {
        return persistAppSettings(value);
    });
    // 监听设置面板焦点状态
    ipcMain.on('settings-panel:focus-changed', (event, isFocused) => {
        isSettingsPanelFocused = isFocused;
    });
    ipcMain.handle('plugin-config:get', (_event, pluginId) => {
        const config = readPluginConfigFile();
        return config[pluginId] ?? {};
    });
    ipcMain.handle('plugin-config:set', (_event, pluginId, value) => {
        const config = readPluginConfigFile();
        config[pluginId] = value;
        writePluginConfigFile(config);
        return config[pluginId];
    });
    // 图标缓存相关 IPC
    ipcMain.handle('icon:cache', async (_event, url) => {
        //console.log('Caching icon:', url);
        if (!url)
            return null;
        return await cacheIcon(url);
    });
    ipcMain.handle('icon:get-cached', (_event, url) => {
        if (!url)
            return null;
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
            }
            catch (error) {
                console.error('清除图标缓存失败:', error);
                return false;
            }
        }
        return true;
    });
    // 删除单个图标缓存
    ipcMain.handle('icon:delete', (_event, url) => {
        if (!url)
            return false;
        try {
            const cachePath = getIconCachePath(url);
            if (fs.existsSync(cachePath)) {
                fs.unlinkSync(cachePath);
                console.log(`已删除图标缓存: ${cachePath}`);
                return true;
            }
            console.log(`图标缓存不存在: ${cachePath}`);
            return false;
        }
        catch (error) {
            console.error(`删除图标缓存失败: ${url}`, error);
            return false;
        }
    });
    // 通过文件路径删除图标缓存
    ipcMain.handle('icon:delete-by-path', (_event, filePath) => {
        if (!filePath)
            return false;
        try {
            if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath);
                console.log(`已通过路径删除图标缓存: ${filePath}`);
                return true;
            }
            console.log(`图标文件不存在: ${filePath}`);
            return false;
        }
        catch (error) {
            console.error(`通过路径删除图标缓存失败: ${filePath}`, error);
            return false;
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
