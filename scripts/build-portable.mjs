import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');

// 配置
const OUTPUT_DIR = path.join(projectRoot, 'dist-portable');
const APP_NAME = 'TVAssistant';

console.log('📦 开始构建便携式版本...\n');

// 清理输出目录
if (fs.existsSync(OUTPUT_DIR)) {
    console.log('🗑️  清理旧的输出目录...');
    fs.rmSync(OUTPUT_DIR, { recursive: true, force: true });
}
fs.mkdirSync(OUTPUT_DIR, { recursive: true });

// 复制函数
function copyDir(src, dest) {
    if (!fs.existsSync(src)) {
        console.warn(`⚠️  源目录不存在: ${src}`);
        return;
    }
    
    fs.mkdirSync(dest, { recursive: true });
    const entries = fs.readdirSync(src, { withFileTypes: true });
    
    for (const entry of entries) {
        // 跳过 node_modules、.git、data 等目录
        if (entry.name === 'node_modules' || entry.name === '.git' || entry.name === 'data') {
            continue;
        }
        
        const srcPath = path.join(src, entry.name);
        const destPath = path.join(dest, entry.name);
        
        if (entry.isDirectory()) {
            copyDir(srcPath, destPath);
        } else {
            fs.copyFileSync(srcPath, destPath);
        }
    }
}

function copyFile(src, dest) {
    if (!fs.existsSync(src)) {
        console.warn(`⚠️  源文件不存在: ${src}`);
        return;
    }
    fs.copyFileSync(src, dest);
    console.log(`✅ 已复制: ${path.relative(projectRoot, src)}`);
}

// 1. 复制编译后的文件
console.log('\n📂 复制编译文件...');
copyDir(path.join(projectRoot, 'dist'), path.join(OUTPUT_DIR, 'dist'));

// 2. 复制 native addon
console.log('\n📂 复制 Native Addon...');
const nativeBuildDir = path.join(projectRoot, 'native', 'build', 'Release');
if (fs.existsSync(nativeBuildDir)) {
    const destNativeDir = path.join(OUTPUT_DIR, 'native', 'build', 'Release');
    copyDir(nativeBuildDir, destNativeDir);
    console.log('✅ Native Addon 已复制');
} else {
    console.warn('⚠️  Native Addon 未找到，可能需要先编译');
}

// 3. 复制 package.json（需要修改）
console.log('\n📂 准备 package.json...');
const packageJson = JSON.parse(fs.readFileSync(path.join(projectRoot, 'package.json'), 'utf-8'));
packageJson.main = 'dist/electron/main.js';
packageJson.scripts = {
    start: 'electron .'
};
// 只保留运行时需要的依赖
const runtimeDeps = {};
if (packageJson.dependencies) {
    Object.keys(packageJson.dependencies).forEach(key => {
        runtimeDeps[key] = packageJson.dependencies[key];
    });
}
packageJson.dependencies = runtimeDeps;
// 移除 devDependencies
delete packageJson.devDependencies;

fs.writeFileSync(
    path.join(OUTPUT_DIR, 'package.json'),
    JSON.stringify(packageJson, null, 2)
);
console.log('✅ package.json 已准备');

// 4. 复制必要的配置文件
console.log('\n📂 复制配置文件...');
const filesToCopy = [
    'vite.config.ts',
    'tsconfig.json'
];

filesToCopy.forEach(file => {
    const src = path.join(projectRoot, file);
    if (fs.existsSync(src)) {
        copyFile(src, path.join(OUTPUT_DIR, file));
    }
});

// 5. 创建启动脚本（Windows）
console.log('\n📂 创建启动脚本...');
const startBatContent = `@echo off
chcp 65001 >nul
title ${APP_NAME}
echo ========================================
echo   ${APP_NAME}
echo ========================================
echo.
cd /d "%~dp0"
start "" "node_modules\\.bin\\electron.exe" .
`;
fs.writeFileSync(path.join(OUTPUT_DIR, '启动.bat'), startBatContent, 'utf-8');
console.log('✅ 启动脚本已创建');

// 6. 创建 README
const readmeContent = `# ${APP_NAME} - 便携式版本

## 使用说明

1. **直接运行**：双击 \`启动.bat\` 文件即可

2. **手动启动**（如果批处理文件不工作）：
   \`\`\`bash
   # 打开命令行，进入本目录
   npx electron .
   \`\`\`

## 注意事项

- 请勿删除 \`node_modules\`、\`dist\`、\`native\` 文件夹
- **所有配置数据保存在 \`data\` 文件夹中**（首次运行后自动生成）
- **完全便携**：可以将整个文件夹复制到任何位置，配置会跟随移动
- 如需备份配置，只需复制 \`data\` 文件夹

## 目录结构

\`\`\`
${APP_NAME}/
├── 启动.bat          # 启动脚本
├── package.json      # 项目配置
├── data/             # 用户数据（首次运行后生成）
│   ├── app-settings.json
│   ├── plugin-config.json
│   └── icon-cache/
├── dist/             # 编译后的代码
├── native/           # Native Addon
└── node_modules/     # 依赖包
\`\`\`

## 技术栈

- Electron
- Vue 3
- TypeScript
- Vite
`;
fs.writeFileSync(path.join(OUTPUT_DIR, 'README.txt'), readmeContent, 'utf-8');
console.log('✅ 说明文档已创建');

// 7. 安装依赖
console.log('\n📦 正在安装依赖（这可能需要几分钟）...');
try {
    execSync('npm install --production', {
        cwd: OUTPUT_DIR,
        stdio: 'inherit'
    });
    console.log('✅ 依赖安装完成');
} catch (error) {
    console.error('❌ 依赖安装失败:', error.message);
    console.log('\n💡 提示：你可以稍后手动运行：');
    console.log(`   cd ${OUTPUT_DIR}`);
    console.log('   npm install --production');
}

console.log('\n✨ 便携式版本构建完成！');
console.log(`📁 输出目录: ${OUTPUT_DIR}`);
console.log('\n📋 下一步操作：');
console.log('1. 将整个文件夹复制到目标机器');
console.log('2. 双击 "启动.bat" 运行');
console.log('\n💡 提示：文件夹大小约 200-300MB（包含所有依赖）');
