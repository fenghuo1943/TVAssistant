import * as ResEdit from 'resedit';
import * as PELibrary from 'pe-library';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 配置
const EXE_PATH = path.resolve(__dirname, '../release/win-unpacked/电视助手.exe');
const ICON_PATH = path.resolve(__dirname, '../electron/assets/icon.ico');

console.log('开始嵌入图标...');
console.log('EXE 路径:', EXE_PATH);
console.log('图标路径:', ICON_PATH);

// 检查文件是否存在
if (!fs.existsSync(EXE_PATH)) {
    console.error('错误: 找不到 exe 文件:', EXE_PATH);
    process.exit(1);
}

if (!fs.existsSync(ICON_PATH)) {
    console.error('错误: 找不到图标文件:', ICON_PATH);
    process.exit(1);
}

try {
    // 读取 exe 文件
    const exeData = fs.readFileSync(EXE_PATH);
    const exe = PELibrary.NtExecutable.from(exeData);
    const res = PELibrary.NtExecutableResource.from(exe);

    // 读取图标文件
    const iconData = fs.readFileSync(ICON_PATH);

    // 生成图标资源
    const iconFile = ResEdit.Data.IconFile.from(iconData);
    
    // 添加新的图标资源
    ResEdit.Resource.IconGroupEntry.replaceIconsForResource(
        res.entries,
        1, // 图标组 ID
        1033, // 语言 ID (1033 = 英语-美国)
        iconFile.icons.map(item => item.data)
    );

    // 保存修改后的资源到 exe
    res.outputResource(exe);
    const newExeData = Buffer.from(exe.generate());
    
    // 写回 exe 文件
    fs.writeFileSync(EXE_PATH, newExeData);
    
    console.log('✓ 图标已成功嵌入到 exe 文件中!');
    console.log('文件路径:', EXE_PATH);
} catch (error) {
    console.error('✗ 嵌入图标失败:', error);
    process.exit(1);
}
