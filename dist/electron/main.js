import electron from 'electron';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { DiscoveryService } from "./services/discovery.js";
import { NetworkService } from "./services/NetworkService.js";
const { app, BrowserWindow, Menu, Tray, nativeImage, shell } = electron;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const isDevelopment = process.env.NODE_ENV === 'development';
const devServerUrl = process.env.VITE_DEV_SERVER_URL ?? 'http://localhost:5173';
const rendererHtmlPath = path.resolve(__dirname, '../index.html');
let win;
let tray = null;
let isQuitting = false;
function createTrayIcon() {
    const customIconPathCandidates = [
        path.resolve(__dirname, '../assets/tray-icon.png'),
        path.resolve(__dirname, '../../electron/assets/tray-icon.png')
    ];
    const customIconPath = customIconPathCandidates.find((candidate) => fs.existsSync(candidate));
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
    win = new BrowserWindow({
        width: 800,
        height: 600,
        backgroundColor: '#06161b',
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
