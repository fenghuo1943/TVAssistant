import electron from 'electron';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { DiscoveryService } from "./services/discovery.js";
import { NetworkService } from "./services/NetworkService.js";
const { app, BrowserWindow, Menu, Tray, ipcMain, nativeImage, shell } = electron;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const isDevelopment = process.env.NODE_ENV === 'development';
const devServerUrl = process.env.VITE_DEV_SERVER_URL ?? 'http://localhost:5173';
const rendererHtmlPath = path.resolve(__dirname, '../index.html');
const forwardedKeys = new Set(['Enter', ' ', 'Escape', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', '-', '_', '=', '+']);
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
            webviewTag: true
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
        //win.webContents.openDevTools();
    }
    else {
        win.loadFile(rendererHtmlPath);
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
