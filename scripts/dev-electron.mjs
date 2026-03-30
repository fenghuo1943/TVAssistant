import { execFile, spawn } from 'child_process';
import { existsSync, watch } from 'fs';
import path from 'path';
import process from 'process';
import waitOn from 'wait-on';

const projectRoot = process.cwd();
const electronBinary = process.platform === 'win32'
    ? path.join(projectRoot, 'node_modules', 'electron', 'dist', 'electron.exe')
    : path.join(projectRoot, 'node_modules', '.bin', 'electron');
const electronEntry = path.join(projectRoot, 'dist', 'electron', 'main.js');
const electronWatchDir = path.join(projectRoot, 'dist', 'electron');
const rendererEntry = path.join(projectRoot, 'dist', 'index.html');

if (!existsSync(electronBinary)) {
    throw new Error(`Electron binary not found: ${electronBinary}`);
}

let child = null;
let restartTimer = null;
let shuttingDown = false;
let pendingRestart = false;
let stoppingElectron = false;

function startElectron() {
    if (shuttingDown || child || stoppingElectron) {
        return;
    }

    pendingRestart = false;
    const childEnv = { ...process.env };
    delete childEnv.ELECTRON_RUN_AS_NODE;

    child = spawn(electronBinary, [electronEntry], {
        cwd: projectRoot,
        stdio: 'inherit',
        env: {
            ...childEnv,
            NODE_ENV: 'development'
        }
    });

    child.on('exit', () => {
        child = null;
        stoppingElectron = false;
        if (pendingRestart && !shuttingDown) {
            startElectron();
        }
    });
}

function stopElectron() {
    if (!child) {
        return;
    }

    pendingRestart = true;
    stoppingElectron = true;

    if (process.platform === 'win32') {
        execFile('taskkill', ['/pid', String(child.pid), '/t', '/f']);
        return;
    }

    child.kill('SIGTERM');
}

function scheduleRestart() {
    clearTimeout(restartTimer);
    restartTimer = setTimeout(() => {
        if (!child) {
            startElectron();
            return;
        }
        stopElectron();
    }, 150);
}

async function main() {
    await waitOn({
        resources: [
            'tcp:5173',
            `file:${electronEntry}`
        ]
    });

    startElectron();

    watch(electronWatchDir, { recursive: true }, () => {
        scheduleRestart();
    });

    if (existsSync(rendererEntry)) {
        watch(rendererEntry, () => {
            scheduleRestart();
        });
    }
}

function shutdown() {
    shuttingDown = true;
    clearTimeout(restartTimer);
    if (child) {
        stopElectron();
    }

    setTimeout(() => {
        process.exit(0);
    }, 200);
}

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);

main().catch((error) => {
    console.error(error);
    process.exit(1);
});
