# TVAssistant - 打包分发说明

##  打包方式

本项目支持两种打包方式：

### 方式一：标准 Electron 应用（推荐用于分发）

生成完整的 Electron 应用目录，包含运行时，无需 Node.js 环境。

```bash
# 构建并打包
npm run build
npm run pack

# 或者一步完成
npm run build && npm run pack
```

**输出位置：** `release/win-unpacked/`

**特点：**
- ✅ 完全独立，包含 Electron 运行时
- ✅ 无需安装 Node.js、npm
- ✅ 双击 `TVAssistant.exe` 即可运行
- ✅ 可以复制到任何 Windows 电脑使用
- ️ 体积较大（约 370MB）

**目录结构：**
```
win-unpacked/
├── TVAssistant.exe          # 主程序
├── resources/               # 应用资源
│   ├── app.asar            # 应用代码
│   └── native/             # Native Addon
├── locales/                 # 语言包
├── *.dll                   # Chromium 运行时库
├── *.pak                   # Chrome 资源包
└── data/                   # 用户数据（首次运行后生成）
```

---

### 方式二：绿色便携版（轻量级）

不包含 Electron 运行时，需要目标机器有 Node.js 环境。

```bash
# 构建并打包
npm run build:portable
```

**输出位置：** `dist-portable/`

**特点：**
- ✅ 体积较小（约 40MB）
- ✅ 预装所有 npm 依赖
- ✅ 首次运行自动安装依赖
- ⚠️ 需要 Node.js 环境
- ️ 通过 `启动.bat` 运行

---

## 🚀 分发和使用

### 标准版分发流程

1. **打包应用**
   ```bash
   npm run build && npm run pack
   ```

2. **压缩文件夹**
   - 右键 `release/win-unpacked` 文件夹
   - 选择"发送到" -> "压缩(zipped)文件夹"
   - 或使用 7-Zip、WinRAR 压缩

3. **分发给用户**
   - 发送压缩包
   - 或复制到 U 盘

4. **用户使用**
   - 解压压缩包
   - 双击 `TVAssistant.exe` 运行
   - 首次运行会自动创建 `data` 文件夹存储配置

---

## ⚙️ 配置说明

### 用户数据位置

所有配置数据保存在程序目录下的 `data` 文件夹：

```
TVAssistant.exe
data/
├── app-settings.json       # 应用设置
├── plugin-config.json      # 插件配置
└── icon-cache/             # 图标缓存
```

**优势：**
- ✅ 配置跟随程序移动
- ✅ 每个副本独立配置
- ✅ 备份只需复制 `data` 文件夹
- ✅ 卸载无残留（删除整个文件夹即可）

---

## 🔧 打包配置

### package.json 中的 build 配置

```json
{
  "build": {
    "appId": "com.tvassistant.app",
    "productName": "TVAssistant",
    "directories": {
      "output": "release",
      "buildResources": "electron/assets"
    },
    "files": [
      "dist/**/*",
      "native/build/Release/driver.node",
      "package.json"
    ],
    "extraResources": [
      {
        "from": "native/build/Release",
        "to": "native/build/Release",
        "filter": ["**/*"]
      }
    ],
    "win": {
      "target": [
        {
          "target": "dir",
          "arch": ["x64"]
        }
      ]
    }
  }
}
```

### 关键配置项

- **appId**: 应用唯一标识符
- **productName**: 应用名称（显示在任务栏和文件夹名）
- **directories.output**: 输出目录
- **files**: 需要打包的文件
- **extraResources**: 额外资源（Native Addon）
- **win.target**: Windows 打包目标（dir = 未打包目录）

---

## 📊 打包方式对比

| 特性 | 标准版 (pack) | 绿色版 (portable) |
|------|--------------|------------------|
| **包含 Electron 运行时** | ✅ 是 | ❌ 否 |
| **需要 Node.js** | ❌ 否 | ✅ 是 |
| **体积大小** | ~370MB | ~40MB |
| **启动方式** | TVAssistant.exe | 启动.bat |
| **适用场景** | 正式分发 | 内网/开发测试 |
| **独立性** | 完全独立 | 依赖 Node.js |

---

##  常见问题

### Q1: 打包后 Native Addon 无法加载？

**A:** 检查 `electron/main.ts` 中的路径配置：

```typescript
const addonPath = app.isPackaged
    ? path.join(process.resourcesPath, 'native/build/Release/driver.node')
    : path.resolve(__dirname, '../../native/build/Release/driver.node');
```

### Q2: 如何修改应用图标？

**A:** 
1. 准备 `.ico` 格式的图标文件
2. 放到 `electron/assets/` 目录
3. 修改 `package.json` 中的 `build.win.icon` 配置

### Q3: 如何生成安装包（.exe 安装程序）？

**A:** 修改 `package.json` 配置：

```json
"win": {
  "target": [
    {
      "target": "nsis",
      "arch": ["x64"]
    }
  ]
}
```

然后运行：
```bash
npm run dist
```

### Q4: 如何减小打包体积？

**A:** 
- 使用 asar 压缩（已默认启用）
- 移除不必要的依赖
- 使用代码分割和 Tree Shaking
- 考虑使用 electron-builder 的压缩选项

---

##  快速开始

```bash
# 1. 安装依赖
npm install

# 2. 构建项目
npm run build

# 3. 打包应用
npm run pack

# 4. 测试运行
cd release/win-unpacked
.\TVAssistant.exe

# 5. 压缩分发
# 右键 win-unpacked 文件夹 -> 发送到 -> 压缩文件夹
```

---

## 📝 注意事项

1. **首次运行**会自动创建 `data` 文件夹，请勿删除
2. **Native Addon** 已自动打包到 `resources/native/` 目录
3. **配置文件**保存在 `data` 文件夹，移动程序时配置会跟随
4. **杀毒软件**可能会误报，需要将 `TVAssistant.exe` 加入白名单
5. **权限要求**：某些功能可能需要管理员权限（如虚拟驱动）

---

## 🔗 相关文档

- [Electron Builder 官方文档](https://www.electron.build/)
- [Electron 官方文档](https://www.electronjs.org/docs)
- [项目 README](./README.md)

---

**祝使用愉快！** 
