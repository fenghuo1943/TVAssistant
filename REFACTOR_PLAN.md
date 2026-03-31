# TVAssistant 界面代码重构计划

**文档版本**: v1.0  
**创建日期**: 2026-03-31  
**最后更新**: 2026-03-31  
**项目路径**: `e:\Electron\TVAssistant`

---

## 📋 执行原则

### AI 执行指南
1. **按优先级顺序执行**: P0 → P1 → P2 → P3
2. **每个任务独立提交**: 使用 Git 分支管理
3. **构建验证**: 每次修改后执行 `npm run build`
4. **测试重点**: 键盘导航、焦点管理、响应式布局
5. **代码风格**: 保持现有 TypeScript + Vue 3 Composition API 风格

### 关键约束
- ✅ 不改变现有功能行为
- ✅ 保持键盘导航的完整性
- ✅ 维护响应式设计的兼容性
- ✅ 遵循现有的代码组织模式

---

## 🔴 P0 - 紧急修复（立即处理）

### 任务 1: 清理调试代码和修复明显 bug

**元数据**:
```yaml
优先级：P0
预计时间：30 分钟
影响文件:
  - src/components/SettingsPanel.vue
风险等级：低
验证方式：构建测试 + 键盘导航测试
```

**问题描述**:
SettingsPanel.vue 中存在多处 console.log 调试代码，以及焦点管理逻辑的重复条件判断

**具体修改点**:

#### 1.1 移除 console.log 语句
**位置**: `src/components/SettingsPanel.vue`
- 第 260-271 行：focusSite 函数中的调试日志
- 第 348-352 行：网址管理页面的调试日志
- 第 446 行：ArrowRight 处理的调试日志
- 第 506 行：ArrowRight 处理的调试日志

**操作**:
```typescript
// 删除这些行（示例）
console.log('focusSite called, index:', index, 'total:', total, 'refs length:', siteItemRefs.value.length);
console.log('siteItemRefs[0]:', siteItemRefs.value[0]);
console.log('nextTick - siteItemRefs[0]:', siteItemRefs.value[0]);
console.log('Trying to focus element:', element);
console.log('Focused and scrolled!');
console.log('focusedSiteIndex:', focusedSiteIndex.value);
console.log('focusedButtonIndex:', focusedButtonIndex.value);
console.log('ArrowRight123');
console.log('ArrowRight12322');
```

#### 1.2 修复重复条件判断
**位置**: `src/components/SettingsPanel.vue` 第 350 行

**当前代码**:
```typescript
if ((props.activeMenu === 'site-management' || focusedSiteIndex.value >= 0) && focusedSiteIndex.value >= 0) {
```

**修改为**:
```typescript
if (props.activeMenu === 'site-management' && focusedSiteIndex.value >= 0) {
```

**验证步骤**:
1. 运行 `npm run dev` 启动应用
2. 打开设置面板
3. 测试网址管理的键盘导航（上下左右、回车）
4. 确认控制台无错误输出

---

### 任务 2: 类型安全增强

**元数据**:
```yaml
优先级：P0
预计时间：45 分钟
影响文件:
  - src/HomePage.vue
  - src/components/SettingsPanel.vue
  - src/plugins/types.ts
风险等级：中
验证方式：TypeScript 编译检查 + 运行时测试
```

**问题描述**:
ipcRenderer 使用了隐式的 any 类型，缺少严格的接口定义

**具体修改点**:

#### 2.1 扩展插件类型定义
**文件**: `src/plugins/types.ts`

**添加内容**:
```typescript
// 在文件末尾添加
export type LiveMenuData = {
  currentChannel?: string;
  央视频道?: string[];
  卫视频道?: string[];
};

export type PluginConfig = Record<string, unknown>;

export interface IpcRenderer {
  on(channel: string, listener: (event: unknown, payload: { key: string }) => void): void;
  removeListener(channel: string, listener: (event: unknown, payload: { key: string }) => void): void;
  send(channel: string, ...args: unknown[]): void;
  invoke<T = unknown>(channel: string, ...args: unknown[]): Promise<T>;
}
```

#### 2.2 更新 HomePage.vue 的类型注解
**文件**: `src/HomePage.vue`

**修改点**:
```typescript
// 第 52-61 行，替换现有的 ipcRenderer 类型定义
import type { IpcRenderer } from './plugins/types';

const ipcRenderer = ((window as typeof window & { 
  require?: (moduleName: string) => { ipcRenderer?: IpcRenderer } 
}).require?.('electron')?.ipcRenderer ?? null) as IpcRenderer | null;
```

**修改所有 async 函数的返回类型**:
```typescript
async function loadPluginConfig(pluginId: string): Promise<PluginConfig> {
  const response = await ipcRenderer?.invoke<PluginConfig>('plugin-config:get', pluginId);
  return response ?? {};
}

async function savePluginConfig(pluginId: string, config: PluginConfig): Promise<void> {
  currentPluginConfig.value = config;
  await ipcRenderer?.invoke('plugin-config:set', pluginId, config);
}

async function loadSettings(): Promise<void> {
  const response = await ipcRenderer?.invoke<Partial<AppSettings>>('settings:get');
  settings.value = {
    ...defaultSettings,
    ...response
  };
}

async function saveSettings(value: Partial<AppSettings>): Promise<void> {
  const response = await ipcRenderer?.invoke<Partial<AppSettings>>('settings:set', value);
  settings.value = {
    ...settings.value,
    ...value,
    ...response
  };
}

async function ensureActivePluginReady(): Promise<BrowserPlugin | null> {
  // ... 现有逻辑
}

async function fetchLiveMenuData(): Promise<void> {
  // ... 现有逻辑
}

async function selectLiveChannel(channelName: string): Promise<void> {
  // ... 现有逻辑
}

async function adjustActivePluginVolume(delta: number): Promise<void> {
  // ... 现有逻辑
}
```

#### 2.3 更新 SettingsPanel.vue 的类型注解
**文件**: `src/components/SettingsPanel.vue`

**修改点**:
```typescript
// 在第 140 行附近添加导入
import type { IpcRenderer } from '../plugins/types';

// 替换第 142-143 行的 ipcRenderer 定义
const ipcRenderer = ((window as typeof window & { 
  require?: (moduleName: string) => { ipcRenderer?: IpcRenderer } 
}).require?.('electron')?.ipcRenderer ?? null);
```

**验证步骤**:
1. 运行 `npm run build` 确保 TypeScript 编译通过
2. 检查是否有类型错误
3. 测试 IPC 通信功能正常

---

## 🟠 P1 - 高优先级（本周内完成）

### 任务 3: 提取键盘导航逻辑为 Composable

**元数据**:
```yaml
优先级：P1
预计时间：2 小时
影响文件:
  - src/composables/useKeyboardNavigation.ts (新建)
  - src/composables/useFocusManagement.ts (新建)
  - src/composables/useLiveMenu.ts (新建)
  - src/HomePage.vue
  - src/components/SettingsPanel.vue
风险等级：中高
验证方式：完整的键盘导航测试
```

**目标**: 将分散在各组件中的键盘事件处理逻辑提取为可复用的 composables

#### 3.1 创建 useKeyboardNavigation
**文件**: `src/composables/useKeyboardNavigation.ts`

**实现内容**:
```typescript
import { type Ref } from 'vue';

export type KeyHandlerMap = Record<string, () => void>;

export function createKeyHandler(
  handlers: KeyHandlerMap,
  options: { preventDefault?: boolean; stopPropagation?: boolean } = {}
): (event: KeyboardEvent) => void {
  const { preventDefault = true, stopPropagation = false } = options;
  
  return (event: KeyboardEvent) => {
    const handler = handlers[event.key];
    if (handler) {
      if (preventDefault) event.preventDefault();
      if (stopPropagation) event.stopPropagation();
      handler();
    }
  };
}

export function mergeHandlers(...handlers: KeyHandlerMap[]): KeyHandlerMap {
  return Object.assign({}, ...handlers);
}

export function useConditionalHandler(
  condition: Ref<boolean>,
  handlers: KeyHandlerMap
): KeyHandlerMap {
  const conditionalHandlers: KeyHandlerMap = {};
  
  Object.entries(handlers).forEach(([key, handler]) => {
    conditionalHandlers[key] = () => {
      if (condition.value) {
        handler();
      }
    };
  });
  
  return conditionalHandlers;
}
```

#### 3.2 创建 useFocusManagement
**文件**: `src/composables/useFocusManagement.ts`

**实现内容**:
```typescript
import { ref, nextTick, type Ref } from 'vue';

export interface FocusOptions {
  total: number;
  currentIndex: Ref<number>;
  loop?: boolean;
  onChange?: (newIndex: number) => void;
}

export function useCircularFocus(options: FocusOptions) {
  const { total, currentIndex, loop = true, onChange } = options;
  
  function move(offset: number) {
    if (total === 0) return;
    
    let newIndex = currentIndex.value + offset;
    
    if (loop) {
      newIndex = (newIndex + total) % total;
    } else {
      newIndex = Math.max(0, Math.min(total - 1, newIndex));
    }
    
    currentIndex.value = newIndex;
    onChange?.(newIndex);
    
    nextTick(() => {
      // 焦点逻辑由调用者处理
    });
  }
  
  return {
    moveLeft: () => move(-1),
    moveRight: () => move(1),
    moveUp: () => move(-1),
    moveDown: () => move(1),
    setCurrent: (index: number) => {
      if (index >= 0 && index < total) {
        currentIndex.value = index;
        onChange?.(index);
      }
    }
  };
}

export function useRefManager<T extends Element>() {
  const refs = ref<(T | null)[]>([]) as Ref<(T | null)[]>;
  
  const setRef = (element: T | null, index: number) => {
    if (element) {
      refs.value[index] = element;
    } else {
      delete refs.value[index];
    }
  };
  
  const focus = (index: number) => {
    const element = refs.value[index];
    if (element instanceof HTMLElement) {
      element.focus();
      element.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  };
  
  return { refs, setRef, focus };
}
```

#### 3.3 创建 useLiveMenu
**文件**: `src/composables/useLiveMenu.ts`

**实现内容**:
```typescript
import { computed, reactive, ref } from 'vue';
import type { BrowserPlugin } from '../plugins/types';

export type LiveMenuGroup = {
  label: string;
  items: string[];
};

export type LiveMenuState = {
  visible: boolean;
  groupIndex: number;
  column: 'group' | 'item';
  groups: LiveMenuGroup[];
  itemIndices: number[];
};

export function useLiveMenu() {
  const state = reactive<LiveMenuState>({
    visible: false,
    groupIndex: 0,
    column: 'group',
    groups: [
      { label: '央视频道', items: ['内容稍后添加'] },
      { label: '卫视频道', items: ['内容稍后添加'] }
    ],
    itemIndices: [0, 0]
  });
  
  const currentChannel = ref('');
  const currentPluginId = ref('');
  const currentPluginConfig = ref<Record<string, unknown>>({});
  
  const currentGroup = computed(() => state.groups[state.groupIndex]);
  const currentItemIndex = computed(() => state.itemIndices[state.groupIndex] ?? 0);
  const currentItems = computed(() => currentGroup.value?.items ?? []);
  const heading = computed(() => currentChannel.value || currentGroup.value?.label || '');
  
  function toggle() {
    state.visible = !state.visible;
    if (!state.visible) {
      state.column = 'group';
    }
  }
  
  function close() {
    state.visible = false;
    state.column = 'group';
  }
  
  function moveGroup(offset: number) {
    const total = state.groups.length;
    state.groupIndex = (state.groupIndex + offset + total) % total;
  }
  
  function moveItem(offset: number) {
    const items = currentItems.value;
    const total = items.length;
    const nextIndex = (currentItemIndex.value + offset + total) % total;
    state.itemIndices[state.groupIndex] = nextIndex;
  }
  
  function syncChannel(channelName: string) {
    if (!channelName) return;
    
    const normalized = channelName.trim();
    currentChannel.value = normalized;
    
    const groupIndex = state.groups.findIndex(g => g.items.includes(normalized));
    if (groupIndex === -1) return;
    
    const itemIndex = state.groups[groupIndex].items.indexOf(normalized);
    state.groupIndex = groupIndex;
    state.itemIndices[groupIndex] = itemIndex;
  }
  
  function applyGroups(data: { currentChannel?: string; 央视频道?: string[]; 卫视频道?: string[] }) {
    const cctv = data.央视频道?.length ? data.央视频道 : ['内容稍后添加'];
    const satellite = data.卫视频道?.length ? data.卫视频道 : ['内容稍后添加'];
    
    state.groups = [
      { label: '央视频道', items: cctv },
      { label: '卫视频道', items: satellite }
    ];
    
    state.itemIndices = state.groups.map(() => 0);
    state.groupIndex = 0;
    syncChannel(data.currentChannel ?? '');
  }
  
  function switchColumn() {
    state.column = state.column === 'group' ? 'item' : 'group';
  }
  
  return {
    state,
    currentChannel,
    currentPluginId,
    currentPluginConfig,
    currentGroup,
    currentItemIndex,
    currentItems,
    heading,
    toggle,
    close,
    moveGroup,
    moveItem,
    syncChannel,
    applyGroups,
    switchColumn
  };
}
```

#### 3.4 重构 HomePage.vue
**文件**: `src/HomePage.vue`

**修改策略**:
1. 导入新的 composables
2. 替换原有的分散状态为 composable 状态
3. 简化键盘事件处理函数

**详细步骤**:
```typescript
// 在 script 部分顶部添加导入
import { createKeyHandler, useConditionalHandler } from '../composables/useKeyboardNavigation';
import { useCircularFocus, useRefManager } from '../composables/useFocusManagement';
import { useLiveMenu } from '../composables/useLiveMenu';

// 替换原有的状态声明
const liveMenu = useLiveMenu();

// 替换 cardRefs 管理
const { refs: cardRefs, setRef: setCardRef, focus: focusCard } = useRefManager<HTMLButtonElement>();
const { refs: backButtonRefs, setRef: setBackButtonRef } = useRefManager<HTMLButtonElement>();
const { refs: webviewRefs, setRef: setWebviewRef } = useRefManager<Electron.WebviewTag>();

// 替换 selectedIndex 管理
const { move: moveSelection, setCurrent: setSelectedIndex } = useCircularFocus({
  total: shortcuts.value.length,
  currentIndex: selectedIndex,
  loop: true,
  onChange: () => focusCard(selectedIndex.value)
});

// 重构键盘事件处理
const handleHomeKeydown = createKeyHandler({
  'ArrowLeft': () => moveSelection(-1),
  'ArrowRight': () => moveSelection(1),
  'ArrowUp': () => moveSelection(-1),
  'ArrowDown': () => moveSelection(1),
  'Enter': () => openSite(shortcuts.value[selectedIndex.value]),
  ' ': () => openSite(shortcuts.value[selectedIndex.value])
}, { stopPropagation: true });

const handleLiveMenuKeydown = createKeyHandler({
  'Escape': liveMenu.close,
  'Backspace': liveMenu.close,
  'ArrowLeft': liveMenu.switchColumn,
  'ArrowRight': liveMenu.switchColumn,
  'ArrowUp': () => {
    if (liveMenu.state.column === 'group') {
      liveMenu.moveGroup(-1);
    } else {
      liveMenu.moveItem(-1);
    }
  },
  'ArrowDown': () => {
    if (liveMenu.state.column === 'group') {
      liveMenu.moveGroup(1);
    } else {
      liveMenu.moveItem(1);
    }
  },
  'Enter': () => {
    if (liveMenu.state.column === 'item') {
      selectLiveChannel(liveMenu.currentItems.value[liveMenu.currentItemIndex.value]);
    }
  }
}, { stopPropagation: true });

// 合并键盘事件处理器
const handleKeydown = createKeyHandler({
  'Escape': () => {
    if (showSettings.value && !activeUrl.value) {
      closeSettings();
    } else if (activeUrl.value) {
      goHome();
    }
  },
  'Backspace': () => {
    if (showSettings.value && !activeUrl.value) {
      closeSettings();
    } else if (activeUrl.value) {
      goHome();
    }
  }
}, { stopPropagation: true });

// 在 handleKeydown 中添加条件处理
const combinedKeydown = (event: KeyboardEvent) => {
  if (showSettings.value && !activeUrl.value) {
    // 设置页面的事件由 SettingsPanel 处理
    if (event.key === 'Escape' || event.key === 'Backspace') {
      event.preventDefault();
      closeSettings();
    }
    return;
  }
  
  if (activeUrl.value) {
    if (liveMenu.state.visible) {
      handleLiveMenuKeydown(event);
      return;
    }
    
    // 浏览器模式的快捷键
    if (event.key === 'Enter' && liveMenu.isLiveMenuAvailable.value) {
      event.preventDefault();
      liveMenu.toggle();
      return;
    }
    
    if (event.key === '-' || event.key === '_') {
      event.preventDefault();
      void adjustActivePluginVolume(-0.05);
      return;
    }
    
    if (event.key === '=' || event.key === '+') {
      event.preventDefault();
      void adjustActivePluginVolume(0.05);
      return;
    }
    
    handleKeydown(event);
    return;
  }
  
  handleHomeKeydown(event);
};
```

#### 3.5 重构 SettingsPanel.vue
**文件**: `src/components/SettingsPanel.vue`

**修改策略**: 类似 HomePage，使用 composables 简化焦点管理

**验证步骤**:
1. 测试所有页面的键盘导航
2. 确认焦点管理正确
3. 检查代码行数是否减少
4. 运行 `npm run build` 确保编译通过

---

### 任务 4: 优化状态管理

**元数据**:
```yaml
优先级：P1
预计时间：1.5 小时
影响文件:
  - src/HomePage.vue
风险等级：中
验证方式：功能测试 + 性能测试
```

**目标**: 将分散的 ref 状态组织成 reactive 对象

**修改策略**:
```typescript
// 在 HomePage.vue 中
const appState = reactive({
  currentTime: '',
  currentDate: '',
  selectedIndex: 0,
  activeUrl: '',
  activeTitle: '',
  showSettings: false,
  activeSettingsMenu: 'general' as SettingsMenuKey,
  settings: { ...defaultSettings } as AppSettings
});

// 计算属性保持不变，但引用 appState 中的值
const shortcuts = computed(() => {
  return defaultShortcuts.filter(shortcut => 
    appState.settings.enabledShortcuts.includes(shortcut.url)
  );
});
```

---

### 任务 5: 完善错误处理和用户提示

**元数据**:
```yaml
优先级：P1
预计时间：1 小时
影响文件:
  - src/utils/errorHandler.ts (新建)
  - src/components/Notification.vue (可选)
  - src/HomePage.vue
  - src/components/SettingsPanel.vue
风险等级：低
验证方式：错误场景模拟测试
```

#### 5.1 创建错误处理工具
**文件**: `src/utils/errorHandler.ts`

```typescript
export type ErrorLevel = 'info' | 'warning' | 'error';

export interface ErrorOptions {
  level?: ErrorLevel;
  message?: string;
  retryable?: boolean;
  maxRetries?: number;
}

export function showError(message: string, options: ErrorOptions = {}) {
  console.error(`[${options.level ?? 'error'}] ${message}`);
  
  // 可以在这里集成通知系统
  if (typeof window !== 'undefined') {
    // 简单的 toast 通知
    const toast = document.createElement('div');
    toast.className = 'error-toast';
    toast.textContent = message;
    toast.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      padding: 12px 24px;
      background: rgba(255, 59, 48, 0.9);
      color: white;
      border-radius: 8px;
      z-index: 9999;
      animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
  }
}

export async function withRetry<T>(
  fn: () => Promise<T>,
  options: ErrorOptions = {}
): Promise<T> {
  const { maxRetries = 3, retryable = true } = options;
  let lastError: unknown;
  
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;
      if (!retryable || i === maxRetries - 1) break;
      await new Promise(resolve => setTimeout(resolve, 1000 * (i + 1)));
    }
  }
  
  showError(options.message ?? '操作失败', { ...options, level: 'error' });
  throw lastError;
}
```

#### 5.2 应用到现有代码
**文件**: `src/HomePage.vue`

**修改示例**:
```typescript
import { withRetry, showError } from '../utils/errorHandler';

async function loadPluginConfig(pluginId: string): Promise<PluginConfig> {
  try {
    return await withRetry(
      async () => {
        const response = await ipcRenderer?.invoke<PluginConfig>('plugin-config:get', pluginId);
        return response ?? {};
      },
      { 
        message: `加载插件 ${pluginId} 配置失败`,
        retryable: true,
        maxRetries: 3
      }
    );
  } catch {
    showError(`无法加载插件配置，请检查网络连接`);
    return {};
  }
}
```

---

## 🟡 P2 - 中优先级（下周完成）

### 任务 6: 样式系统重构

**元数据**:
```yaml
优先级：P2
预计时间：2 小时
影响文件:
  - src/styles/variables.css (新建)
  - src/styles/global.css (新建)
  - src/HomePage.vue
  - src/components/HomeLanding.vue
  - src/components/HomeBrowser.vue
  - src/components/SettingsPanel.vue
风险等级：低
验证方式：视觉回归测试
```

#### 6.1 创建设计令牌
**文件**: `src/styles/variables.css`

```css
:root {
  /* 颜色系统 */
  --color-primary: rgba(120, 247, 255, 0.85);
  --color-primary-soft: rgba(120, 247, 255, 0.28);
  --color-success: rgba(99, 194, 111, 0.92);
  --color-danger: rgba(255, 59, 48, 0.9);
  --color-warning: rgba(255, 149, 0, 0.9);
  
  /* 背景色 */
  --bg-dark: #06161b;
  --bg-glass: rgba(15, 21, 28, 0.88);
  --bg-glass-light: rgba(28, 28, 28, 0.96);
  --bg-overlay: rgba(0, 0, 0, 0.58);
  
  /* 文字颜色 */
  --text-primary: #f4f7f8;
  --text-secondary: rgba(236, 245, 248, 0.82);
  --text-tertiary: rgba(210, 220, 230, 0.72);
  
  /* 间距系统 */
  --spacing-xs: 8px;
  --spacing-sm: 14px;
  --spacing-md: 24px;
  --spacing-lg: 42px;
  --spacing-xl: 66px;
  
  /* 圆角 */
  --radius-sm: 10px;
  --radius-md: 18px;
  --radius-lg: 28px;
  --radius-xl: 32px;
  
  /* 阴影 */
  --shadow-sm: 0 4px 12px rgba(0, 0, 0, 0.2);
  --shadow-md: 0 18px 36px rgba(0, 0, 0, 0.28);
  --shadow-lg: 0 28px 60px rgba(0, 0, 0, 0.42);
  
  /* 断点 */
  --breakpoint-sm: 640px;
  --breakpoint-md: 980px;
  --breakpoint-lg: 1100px;
  
  /* 过渡 */
  --transition-fast: 0.18s ease;
  --transition-normal: 0.24s ease;
  --transition-slow: 0.3s ease;
}
```

#### 6.2 应用设计令牌
**示例**: 修改 `HomePage.vue`

```css
.home-shell {
  --line-color: var(--color-primary);
  --text-soft: var(--text-secondary);
  position: relative;
  min-height: 100vh;
  padding: var(--spacing-lg) var(--spacing-lg) calc(var(--spacing-lg) + 14px);
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  isolation: isolate;
}

@media (max-width: var(--breakpoint-lg)) {
  .home-shell {
    padding: 22px 20px 28px;
  }
}
```

---

### 任务 7: 性能优化

**元数据**:
```yaml
优先级：P2
预计时间：1.5 小时
影响文件:
  - src/utils/debounce.ts (新建)
  - src/HomePage.vue
  - src/components/SettingsPanel.vue
风险等级：低
验证方式：性能分析 + 用户体验测试
```

#### 7.1 创建防抖工具
**文件**: `src/utils/debounce.ts`

```typescript
export function debounce<T extends (...args: any[]) => any>(
  fn: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timer: ReturnType<typeof setTimeout> | null = null;
  
  return (...args: Parameters<T>) => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}

export function throttle<T extends (...args: any[]) => any>(
  fn: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;
  
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      fn(...args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}
```

#### 7.2 应用到直播菜单
**文件**: `src/HomePage.vue`

```typescript
import { debounce } from '../utils/debounce';

const debouncedFetchLiveMenu = debounce(async () => {
  await fetchLiveMenuData();
}, 500);

// 在需要的地方调用 debouncedFetchLiveMenu 而不是 fetchLiveMenuData
```

---

### 任务 8: 可访问性（A11y）改进

**元数据**:
```yaml
优先级：P2
预计时间：1.5 小时
影响文件:
  - src/components/HomeLanding.vue
  - src/components/HomeBrowser.vue
  - src/components/SettingsPanel.vue
风险等级：低
验证方式：屏幕阅读器测试 + 键盘导航测试
```

**修改清单**:
- [ ] 为所有按钮添加明确的 `aria-label`
- [ ] 为动态内容添加 `aria-live` 区域
- [ ] 完善焦点管理和可见性指示
- [ ] 添加角色语义（role="tablist", role="tabpanel" 等）

**示例**:
```vue
<!-- 在 HomeBrowser.vue 中 -->
<div
  v-if="showLiveMenu"
  class="live-menu-overlay"
  aria-label="直播频道菜单"
  role="dialog"
  aria-modal="true"
>
  <div class="live-menu-panel" role="region">
    <div class="live-menu-heading" aria-live="polite">{{ liveMenuHeading }}</div>
    <!-- ... -->
  </div>
</div>
```

---

## 🟢 P3 - 低优先级（后续迭代）

### 任务 9: 引入状态管理库（Pinia）

**元数据**:
```yaml
优先级：P3
预计时间：4 小时
影响文件:
  - src/stores/settings.ts (新建)
  - src/stores/liveMenu.ts (新建)
  - src/stores/pluginManager.ts (新建)
  - src/main.ts
  - src/HomePage.vue
  - src/components/SettingsPanel.vue
风险等级：高
验证方式：完整的功能测试
```

**实施步骤**:
1. 安装 Pinia: `npm install pinia`
2. 在 `main.ts` 中初始化
3. 创建各个 store 模块
4. 迁移现有状态
5. 更新组件引用

---

### 任务 10: 代码结构优化

**元数据**:
```yaml
优先级：P3
预计时间：2 小时
影响文件:
  - src/constants/index.ts (新建)
  - src/utils/refManager.ts (新建)
  - src/App.vue
  - src/HomePage.vue
风险等级：中
验证方式：构建测试
```

---

### 任务 11: 功能完善

**元数据**:
```yaml
优先级：P3
预计时间：3 小时
影响文件:
  - src/components/SettingsPanel.vue
  - src/settings.ts
风险等级：中
验证方式：功能测试
```

**待实现功能**:
- 游戏模式的实际功能
- "添加新网址"页面
- "壁纸设置"页面
- 本地应用扫描功能

---

## 📊 执行追踪

### 完成情况表

| 任务 ID | 优先级 | 状态 | 完成日期 | 备注 |
|--------|--------|------|----------|------|
| 1 | P0 | ✅ 已完成 | 2026-03-31 | 清理调试代码 |
| 2 | P0 | ✅ 已完成 | 2026-03-31 | 类型安全增强 |
| 3 | P1 | ⬜ 待开始 | - | 键盘导航 Composable |
| 4 | P1 | ⬜ 待开始 | - | 状态管理优化 |
| 5 | P1 | ⬜ 待开始 | - | 错误处理 |
| 6 | P2 | ⬜ 待开始 | - | 样式系统 |
| 7 | P2 | ⬜ 待开始 | - | 性能优化 |
| 8 | P2 | ⬜ 待开始 | - | 可访问性 |
| 9 | P3 | ⬜ 待开始 | - | Pinia |
| 10 | P3 | ⬜ 待开始 | - | 代码结构 |
| 11 | P3 | ⬜ 待开始 | - | 功能完善 |

---

## 🛠️ 开发工作流

### 标准操作流程

```bash
# 1. 创建特性分支
git checkout -b feature/refactor-task-{编号}

# 2. 执行重构

# 3. 运行构建
npm run build

# 4. 测试功能
npm run dev

# 5. 提交更改
git add .
git commit -m "refactor: 完成任务{编号} - {任务名称}"

# 6. 推送到远程
git push origin feature/refactor-task-{编号}

# 7. 创建 Pull Request
```

### 验证检查清单

每个任务完成后必须确认：
- [ ] TypeScript 编译通过 (`npm run build`)
- [ ] 无新的 ESLint 警告
- [ ] 键盘导航功能正常
- [ ] 焦点管理正确
- [ ] 响应式布局正常
- [ ] 无 console.error/warning
- [ ] 性能无明显下降
- [ ] 相关测试通过

---

## 📝 附录

### 相关文件索引

**核心组件**:
- `src/App.vue` - 根组件
- `src/HomePage.vue` - 主页面
- `src/components/HomeLanding.vue` - 落地页
- `src/components/HomeBrowser.vue` - 浏览器组件
- `src/components/SettingsPanel.vue` - 设置面板

**Composables** (新建):
- `src/composables/useKeyboardNavigation.ts`
- `src/composables/useFocusManagement.ts`
- `src/composables/useLiveMenu.ts`

**工具函数** (新建):
- `src/utils/errorHandler.ts`
- `src/utils/debounce.ts`
- `src/utils/refManager.ts`

**样式文件** (新建):
- `src/styles/variables.css`
- `src/styles/global.css`

**类型定义**:
- `src/plugins/types.ts`
- `src/homePageShared.ts`
- `src/settings.ts`

### 关键依赖版本

```json
{
  "vue": "^3.x",
  "electron": "^x.x.x",
  "typescript": "^5.x",
  "vite": "^5.x"
}
```

---

**文档结束**
