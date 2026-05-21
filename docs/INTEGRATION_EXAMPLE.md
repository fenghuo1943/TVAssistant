# 在 HomePage 中集成前台应用检测

## 示例代码

以下展示如何在 `HomePage.vue` 中集成前台应用检测功能：

### 1. 导入 Composable

```typescript
import { useForegroundAppDetection } from './composables/useForegroundAppDetection';
```

### 2. 在 setup 中使用

```typescript
// 假设 appState.settings 是响应式的
const settings = computed(() => appState.settings);

// 初始化前台应用检测
const {
  isLocalAppActive,
  currentForegroundApp,
  startMonitoring,
  stopMonitoring
} = useForegroundAppDetection(settings);
```

### 3. 在 onMounted 中启动监控

```typescript
onMounted(async () => {
  updateTime();
  timer = window.setInterval(updateTime, 1000);
  ipcRenderer?.on('app-keydown', handleForwardedKeydown);

  await loadSettings();
  openConfiguredModule();

  // 启动前台应用监控（每 2 秒检查一次）
  startMonitoring(2000);

  nextTick(() => {
    focusSelectedCard();
  });
});
```

### 4. 在 onBeforeUnmount 中停止监控

```typescript
onBeforeUnmount(() => {
  if (timer) {
    window.clearInterval(timer);
  }

  // 停止前台应用监控
  stopMonitoring();

  disableAutoHide();
  ipcRenderer?.removeListener('app-keydown', handleForwardedKeydown);
});
```

### 5. 监听状态变化并执行操作

```typescript
import { watch } from 'vue';

// 监听前台应用状态变化
watch(isLocalAppActive, (isActive) => {
  if (isActive) {
    console.log('用户切换到本地应用');
    
    // 示例操作 1: 暂停正在播放的视频
    const webview = webviewRefManager.ref.value;
    if (webview) {
      webview.executeJavaScript(`
        document.querySelector('video')?.pause();
      `).catch(err => console.error('暂停视频失败:', err));
    }
    
    // 示例操作 2: 最小化窗口
    // ipcRenderer?.send('window:minimize');
    
    // 示例操作 3: 显示通知
    // showNotification('检测到您切换到其他应用');
  } else {
    console.log('用户返回到 TVAssistant');
    
    // 可以在这里恢复之前的状态
  }
});

// 监听当前前台应用路径变化
watch(currentForegroundApp, (appPath) => {
  if (appPath) {
    console.log('当前前台应用:', appPath);
    
    // 可以根据不同的应用执行不同的操作
    if (appPath.includes('notepad.exe')) {
      console.log('用户打开了记事本');
    } else if (appPath.includes('chrome.exe')) {
      console.log('用户打开了 Chrome 浏览器');
    }
  }
});
```

## 完整示例

```vue
<script lang="ts" setup>
import { computed, onMounted, onBeforeUnmount, watch } from 'vue';
import { useForegroundAppDetection } from './composables/useForegroundAppDetection';
import { appState } from './homePageShared';

// ... 其他导入和代码 ...

// 初始化前台应用检测
const settings = computed(() => appState.settings);
const {
  isLocalAppActive,
  currentForegroundApp,
  startMonitoring,
  stopMonitoring
} = useForegroundAppDetection(settings);

// 监听状态变化
watch(isLocalAppActive, (isActive) => {
  if (isActive) {
    console.log('✓ 用户切换到本地应用');
    
    // 自动暂停视频
    const webview = webviewRefManager.ref.value;
    if (webview && appState.activeUrl) {
      webview.executeJavaScript(`
        const video = document.querySelector('video');
        if (video && !video.paused) {
          video.pause();
          console.log('[TVAssistant] 自动暂停视频');
        }
      `).catch(err => console.error('暂停视频失败:', err));
    }
  } else {
    console.log('✗ 用户离开本地应用');
  }
});

onMounted(async () => {
  // ... 现有的初始化代码 ...
  
  // 启动前台应用监控
  startMonitoring(2000);
});

onBeforeUnmount(() => {
  // ... 现有的清理代码 ...
  
  // 停止前台应用监控
  stopMonitoring();
});
</script>
```

## 高级用法

### 场景 1: 智能窗口管理

当用户切换到特定应用时自动最小化：

```typescript
watch(currentForegroundApp, async (appPath) => {
  if (!appPath) return;
  
  // 定义需要自动最小化的应用
  const autoMinimizeApps = [
    'game.exe',
    'video-player.exe'
  ];
  
  const shouldMinimize = autoMinimizeApps.some(app => 
    appPath.toLowerCase().includes(app)
  );
  
  if (shouldMinimize) {
    console.log('检测到游戏/播放器，自动最小化');
    ipcRenderer?.send('window:minimize');
  }
});
```

### 场景 2: 使用统计

记录用户使用各个应用的时长：

```typescript
import { ref } from 'vue';

const appUsageStats = ref<Map<string, number>>(new Map());
let lastSwitchTime = Date.now();

watch(currentForegroundApp, (appPath) => {
  if (!appPath) return;
  
  const now = Date.now();
  const duration = now - lastSwitchTime;
  
  // 累加使用时长
  const currentDuration = appUsageStats.value.get(appPath) || 0;
  appUsageStats.value.set(appPath, currentDuration + duration);
  
  lastSwitchTime = now;
  
  console.log(`应用 ${appPath} 使用了 ${duration}ms`);
});

// 定期保存统计数据
setInterval(() => {
  const stats = Object.fromEntries(appUsageStats.value);
  localStorage.setItem('appUsageStats', JSON.stringify(stats));
}, 60000); // 每分钟保存一次
```

### 场景 3: 上下文感知UI

根据前台应用调整界面：

```typescript
const uiMode = ref<'normal' | 'gaming' | 'media'>('normal');

watch(currentForegroundApp, (appPath) => {
  if (!appPath) {
    uiMode.value = 'normal';
    return;
  }
  
  const lowerPath = appPath.toLowerCase();
  
  if (lowerPath.includes('game') || lowerPath.includes('steam')) {
    uiMode.value = 'gaming';
  } else if (lowerPath.includes('player') || lowerPath.includes('vlc')) {
    uiMode.value = 'media';
  } else {
    uiMode.value = 'normal';
  }
});

// 在模板中根据模式调整样式
// <div :class="['container', `mode-${uiMode}`]">
```

## 注意事项

1. **性能**: 默认 2 秒的检查间隔已经过优化，不会对性能造成明显影响
2. **内存**: Composable 会在组件卸载时自动清理定时器
3. **错误处理**: 所有异步操作都有 try-catch 保护
4. **响应式**: `isLocalAppActive` 和 `currentForegroundApp` 都是响应式引用，可以直接在模板中使用

## 调试技巧

在开发过程中，可以启用详细日志：

```typescript
// 在 composable 中添加更多日志
console.log('[ForegroundApp] 检查结果:', {
  isLocalAppActive: isLocalAppActive.value,
  currentForegroundApp: currentForegroundApp.value,
  localAppCount: getLocalAppPaths().length
});
```

或者在浏览器控制台中直接测试：

```javascript
// 手动触发检查
const result = await ipcRenderer.invoke('app:get-foreground-app-path');
console.log('前台应用:', result);
```

## 下一步

根据你的具体需求，可以选择：

1. **基本监控**: 只需调用 `startMonitoring()` 即可
2. **自定义逻辑**: 监听 `isLocalAppActive` 或 `currentForegroundApp` 的变化
3. **高级功能**: 结合使用统计、智能窗口管理等场景

祝你使用愉快！🎉
