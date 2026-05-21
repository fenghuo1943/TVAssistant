# 前台应用检测功能使用说明

## 功能概述

本项目已扩展 Native Addon，实现了获取系统前台应用程序的功能。可以用于判断当前用户正在使用的应用是否为已添加的本地应用。

## 新增的 Native Addon 函数

### 1. `getForegroundAppPath()`
获取当前前台应用程序的完整进程路径。

**返回值**: `string` - 前台应用的完整路径（例如：`C:\Program Files\App\app.exe`），如果无法获取则返回空字符串。

### 2. `isForegroundAppInList(pathList: string[])`
检查当前前台应用是否在给定的路径列表中。

**参数**: 
- `pathList`: 应用路径数组

**返回值**: `boolean` - 如果前台应用匹配列表中的任意路径则返回 `true`，否则返回 `false`。

**匹配规则**:
- 精确匹配（不区分大小写）
- 子路径匹配（支持部分路径匹配）

## IPC 接口（主进程）

### 1. `app:get-foreground-app-path`
获取前台应用路径的 IPC 接口。

**使用示例**:
```typescript
// 在渲染进程中
const appPath = await ipcRenderer.invoke<string>('app:get-foreground-app-path');
console.log('当前前台应用:', appPath);
```

### 2. `app:is-foreground-app-in-list`
检查前台应用是否在指定列表中的 IPC 接口。

**使用示例**:
```typescript
// 在渲染进程中
const localAppPaths = [
  'C:/Program Files/Player/player.exe',
  'C:/Windows/System32/notepad.exe'
];

const isMatched = await ipcRenderer.invoke<boolean>(
  'app:is-foreground-app-in-list', 
  localAppPaths
);

if (isMatched) {
  console.log('前台应用是已添加的本地应用');
} else {
  console.log('前台应用不是已添加的本地应用');
}
```

## 实际应用场景

### 场景 1: 检测用户是否切换到已添加的本地应用

```typescript
import { ref, onMounted, onUnmounted } from 'vue';
import type { IpcRenderer } from '../plugins/types.ts';

const ipcRenderer = ((window as typeof window & { require?: (moduleName: string) => { ipcRenderer?: IpcRenderer } })
  .require?.('electron')?.ipcRenderer ?? null) as IpcRenderer | null;

// 从设置中获取所有本地应用的路径
function getLocalAppPaths(customShortcuts: any[]): string[] {
  return customShortcuts
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

// 定期检查前台应用
let checkInterval: number | null = null;

async function startForegroundAppCheck(localAppPaths: string[]) {
  if (localAppPaths.length === 0) return;
  
  checkInterval = window.setInterval(async () => {
    try {
      const isLocalApp = await ipcRenderer?.invoke<boolean>(
        'app:is-foreground-app-in-list',
        localAppPaths
      );
      
      if (isLocalApp) {
        console.log('检测到用户切换到本地应用');
        // 执行相应操作，例如暂停视频、隐藏界面等
      }
    } catch (error) {
      console.error('检查前台应用失败:', error);
    }
  }, 2000); // 每 2 秒检查一次
}

function stopForegroundAppCheck() {
  if (checkInterval) {
    clearInterval(checkInterval);
    checkInterval = null;
  }
}

// 在组件中使用
onMounted(() => {
  const localAppPaths = getLocalAppPaths(settings.value.customShortcuts);
  startForegroundAppCheck(localAppPaths);
});

onUnmounted(() => {
  stopForegroundAppCheck();
});
```

### 场景 2: 获取前台应用信息用于日志记录

```typescript
async function logCurrentForegroundApp() {
  const appPath = await ipcRenderer?.invoke<string>('app:get-foreground-app-path');
  
  if (appPath) {
    console.log(`[${new Date().toISOString()}] 前台应用: ${appPath}`);
    
    // 可以发送到服务器或保存到本地日志文件
    // await sendToServer({ event: 'app_switch', appPath, timestamp: Date.now() });
  }
}
```

### 场景 3: 智能窗口管理

```typescript
// 当检测到用户切换到特定应用时，自动最小化 TVAssistant
async function handleAppSwitch(localAppPaths: string[]) {
  const isLocalApp = await ipcRenderer?.invoke<boolean>(
    'app:is-foreground-app-in-list',
    localAppPaths
  );
  
  if (isLocalApp) {
    // 最小化当前窗口
    ipcRenderer?.send('window:minimize');
    console.log('用户切换到本地应用，自动最小化 TVAssistant');
  }
}
```

## 注意事项

1. **权限要求**: 该功能需要访问其他进程的信息，在 Windows 上通常需要管理员权限才能获取某些系统进程的完整路径。

2. **性能考虑**: 频繁调用可能会影响性能，建议设置合理的检查间隔（如 1-2 秒）。

3. **路径格式**: 
   - Windows 路径不区分大小写，内部已做小写转换处理
   - 支持 `file://` URL 格式和本地路径格式的匹配

4. **错误处理**: 如果无法获取前台应用（例如没有活动窗口），函数会返回空字符串或 `false`。

5. **Native Addon 编译**: 修改 C++ 代码后需要重新编译 Native Addon：
   ```bash
   cd native
   npm run rebuild
   ```

## 调试技巧

在控制台查看详细的日志输出：
- Native Addon 会打印前台应用路径和匹配结果
- 主进程会记录 IPC 调用的详细信息

```javascript
// 在开发者工具控制台中测试
const result = await ipcRenderer.invoke('app:get-foreground-app-path');
console.log('前台应用路径:', result);
```

## 扩展建议

如果需要更强大的功能，可以考虑：
1. 获取前台应用的窗口标题
2. 获取应用的图标
3. 监听前台应用切换事件（使用 Windows Hook）
4. 支持更多平台（macOS/Linux）
