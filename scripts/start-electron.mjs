import { spawn } from 'child_process';
import path from 'path';
import process from 'process';

const projectRoot = process.cwd();
const electronBinary = process.platform === 'win32'
    ? path.join(projectRoot, 'node_modules', 'electron', 'dist', 'electron.exe')
    : path.join(projectRoot, 'node_modules', '.bin', 'electron');
const electronEntry = path.join(projectRoot, 'dist', 'electron', 'main.js');

const childEnv = { ...process.env };
delete childEnv.ELECTRON_RUN_AS_NODE;

const child = spawn(electronBinary, [electronEntry], {
    cwd: projectRoot,
    stdio: 'inherit',
    env: {
        ...childEnv,
        NODE_ENV: 'production'
    }
});

child.on('exit', (code) => {
    process.exit(code ?? 0);
});
