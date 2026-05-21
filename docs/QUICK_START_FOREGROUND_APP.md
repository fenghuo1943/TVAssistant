# 快速开始 - 前台应用检测功能

## 🎯 功能说明

此功能允许你的 Electron 应用检测当前系统前台运行的应用程序，并判断它是否为你已添加的本地应用。

## 📦 已完成的工作

✅ Native Addon (C++) 已扩展  
✅ Electron IPC 接口已添加  
✅ Native Addon 已重新编译  
✅ 测试脚本已验证通过  

## 🚀 立即使用

### 步骤 1: 在组件中导入 IPC Renderer

```typescript
import type { IpcRenderer } from '../plugins/types.ts';

const ipcRenderer = ((window as typeof window & { require?: (moduleName: string) => { ipcRenderer?: IpcRenderer } })
  .require?.('electron')?.ipcRenderer ?? null) as IpcRenderer | null;
```

### 步骤 2: 获取前台应用路径

```typescript
async function getCurrentForegroundApp() {
  const appPath = await ipcRenderer?.invoke<string>('app:get-foreground-app-path');
  console.log('当前前台应用:', appPath);
  return appPath;
}
```

### 步骤 3: 检查是否为本地应用

```typescript
async function checkIfLocalApp(localAppPaths: string[]) {
  const isMatched = await ipcRenderer?.invoke<boolean>(
    'app:is-foreground-app-in-list',
    localAppPaths
  );
  
  if (isMatched) {
    console.log('✓ 前台应用是已添加的本地应用');
  } else {
    console.log('✗ 前台应用不是已添加的本地应用');
  }
  
  return isMatched;
}
```

### 步骤 4: 从设置中获取本地应用列表

```typescript
// 假设你有 settings 对象
function getLocalAppPathsFromSettings(settings: AppSettings): string[] {
  return settings.customShortcuts
    .filter(sc => sc.type === 'application')
    .map(sc => {
      // 将 file:// URL 转换为本地路径
      if (sc.url.startsWith('file:///')) {
        let path = decodeURIComponent(sc.url.substring(8));
        if (process.platform === 'win32') {
          path = path.replace(/^\//, '');
        }
        return path;
      }
      return sc.url;
    });
}
```

### 步骤 5: 完整示例 - 自动监控

```typescript
import { ref, onMounted, onUnmounted } from 'vue';
import type { AppSettings } from '../settings.ts';

export default {
  props: {
    settings: Object as () => AppSettings
  },
  
  setup(props) {
    const isLocalAppActive = ref(false);
    let monitorInterval: number | null = null;
    
    // 开始监控
    async function startMonitoring() {
      const localAppPaths = getLocalAppPathsFromSettings(props.settings);
      
      if (localAppPaths.length === 0) {
        console.log('没有本地应用，跳过监控');
        return;
      }
      
      // 每 2 秒检查一次
      monitorInterval = window.setInterval(async () => {
        try {
          const isMatched = await ipcRenderer?.invoke<boolean>(
            'app:is-foreground-app-in-list',
            localAppPaths
          );
          
          isLocalAppActive.value = isMatched || false;
          
          if (isMatched) {
            console.log('检测到用户切换到本地应用');
            // 在这里执行你的逻辑
            // 例如：暂停视频、隐藏界面、保存状态等
          }
        } catch (error) {
          console.error('监控失败:', error);
        }
      }, 2000);
    }
    
    // 停止监控
    function stopMonitoring() {
      if (monitorInterval) {
        clearInterval(monitorInterval);
        monitorInterval = null;
      }
    }
    
    onMounted(() => {
      startMonitoring();
    });
    
    onUnmounted(() => {
      stopMonitoring();
    });
    
    return {
      isLocalAppActive
    };
  }
};
```

## 🧪 测试功能

运行测试脚本验证功能是否正常：

```bash
cd e:\Electron\TVAssistant
node test-foreground-app.cjs
```

你应该看到类似这样的输出：

```
✓ Native Addon 加载成功
✓ 前台应用路径: C:\...\SomeApp.exe
✓ 稳定性测试完成
```

## 📚 更多文档

- [详细使用文档](./foreground-app-detection.md)
- [实现总结](./IMPLEMENTATION_SUMMARY.md)

## 💡 应用场景示例

### 场景 1: 智能窗口管理
当用户切换到本地应用时，自动最小化 TVAssistant

### 场景 2: 自动暂停
当用户切换到其他应用时，暂停正在播放的视频

### 场景 3: 使用统计
记录用户使用各个应用的时长

### 场景 4: 上下文感知
根据当前前台应用调整 TVAssistant 的行为

## ⚠️ 注意事项

1. **性能**: 建议检查间隔不低于 1 秒
2. **权限**: 某些系统进程可能需要管理员权限
3. **平台**: 当前仅支持 Windows
4. **编译**: 修改 C++ 代码后需要重新编译 Native Addon

## 🔧 重新编译 Native Addon

如果你修改了 `native/addon.cpp`，需要重新编译：

```bash
cd native
npx node-gyp rebuild
```

## ❓ 常见问题

**Q: 为什么返回空字符串？**  
A: 可能没有活动窗口，或者权限不足。检查控制台日志获取详细信息。

**Q: 可以获取 macOS/Linux 的前台应用吗？**  
A: 当前仅支持 Windows。如需跨平台支持，需要为其他平台实现相应的代码。

**Q: 会影响性能吗？**  
A: Native C++ 实现非常高效。只要不在高频循环中调用（建议 ≥1 秒间隔），对性能影响可忽略。

## 🎉 开始使用吧！

现在你已经具备了检测前台应用的所有工具。根据你的具体需求，选择合适的场景进行集成。

如有问题，请查看详细文档或检查控制台日志。
