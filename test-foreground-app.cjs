/**
 * 前台应用检测功能测试脚本
 * 
 * 使用方法:
 * 1. 确保 Native Addon 已编译 (npm run build-portable)
 * 2. 运行此脚本: node test-foreground-app.js
 */

const path = require('path');

// 加载 Native Addon
const addonPath = path.join(__dirname, 'native/build/Release/driver.node');
console.log('加载 Native Addon:', addonPath);

let driver;
try {
    driver = require(addonPath);
    console.log('✓ Native Addon 加载成功');
    console.log('可用函数:', Object.keys(driver));
} catch (error) {
    console.error('✗ Native Addon 加载失败:', error.message);
    process.exit(1);
}

console.log('\n=== 测试开始 ===\n');

// 测试 1: 获取前台应用路径
console.log('测试 1: 获取前台应用路径');
try {
    const appPath = driver.getForegroundAppPath();
    if (appPath) {
        console.log('✓ 前台应用路径:', appPath);
    } else {
        console.log('⚠ 无法获取前台应用路径（可能没有活动窗口）');
    }
} catch (error) {
    console.error('✗ 获取前台应用路径失败:', error.message);
}

console.log('\n---\n');

// 测试 2: 检查是否在列表中（空列表）
console.log('测试 2: 检查空列表');
try {
    const result = driver.isForegroundAppInList([]);
    console.log('✓ 空列表检查结果:', result, '(预期: false)');
} catch (error) {
    console.error('✗ 检查失败:', error.message);
}

console.log('\n---\n');

// 测试 3: 检查是否匹配常见应用
console.log('测试 3: 检查常见应用路径');
try {
    // 添加一些常见的 Windows 应用路径进行测试
    const testPaths = [
        'C:\\Windows\\explorer.exe',
        'C:\\Windows\\System32\\notepad.exe',
        'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
    ];
    
    const result = driver.isForegroundAppInList(testPaths);
    console.log('✓ 常见应用检查结果:', result);
    console.log('  测试路径:', testPaths);
} catch (error) {
    console.error('✗ 检查失败:', error.message);
}

console.log('\n---\n');

// 测试 4: 多次调用测试稳定性
console.log('测试 4: 稳定性测试（连续调用 5 次）');
try {
    for (let i = 1; i <= 5; i++) {
        const appPath = driver.getForegroundAppPath();
        console.log(`  第 ${i} 次:`, appPath || '(无)');
        
        // 短暂延迟
        const start = Date.now();
        while (Date.now() - start < 100) {
            // 忙等待
        }
    }
    console.log('✓ 稳定性测试完成');
} catch (error) {
    console.error('✗ 稳定性测试失败:', error.message);
}

console.log('\n=== 测试完成 ===\n');

// 提供使用说明
console.log('使用说明:');
console.log('1. 在 Electron 主进程中使用:');
console.log('   const appPath = await ipcMain.handle("app:get-foreground-app-path", ...)');
console.log('');
console.log('2. 在渲染进程中使用:');
console.log('   const appPath = await ipcRenderer.invoke("app:get-foreground-app-path")');
console.log('');
console.log('3. 批量检查:');
console.log('   const isMatched = await ipcRenderer.invoke("app:is-foreground-app-in-list", paths)');
