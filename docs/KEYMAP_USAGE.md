# 按键映射枚举使用指南

## 概述

本项目已将硬编码的按键名称替换为统一的枚举定义，方便后续更改按键映射配置。

## 文件位置

- **Renderer 进程**: `src/types/keyMap.ts`
- **Electron 主进程**: `electron/types/keyMap.ts`

## 核心功能

### 1. StandardKey 枚举

定义了所有常用按键的常量：

```typescript
import { StandardKey } from '@/types/keyMap';

// 基本导航键
StandardKey.BACK       // 'Escape' - 返回键
StandardKey.CONFIRM    // ' ' - 确定键/播放暂停
StandardKey.MENU       // 'm' - 菜单键
StandardKey.UP         // 'ArrowUp' - 上方向键
StandardKey.DOWN       // 'ArrowDown' - 下方向键
StandardKey.LEFT       // 'ArrowLeft' - 左方向键
StandardKey.RIGHT      // 'ArrowRight' - 右方向键

// 功能键
StandardKey.MINUS      // '-' - 减号键
StandardKey.UNDERSCORE // '_' - 下划线键
StandardKey.EQUALS     // '=' - 等号键
StandardKey.PLUS       // '+' - 加号键
StandardKey.TAB        // 'Tab' - Tab 键
StandardKey.BACKSPACE  // 'Backspace' - Backspace 键
```

### 2. 辅助函数

#### isKey() - 检查按键是否匹配

```typescript
import { isKey } from '@/types/keyMap';

if (isKey(event.key, 'back')) {
  // 处理返回键
}

if (isKey(event.key, 'confirm')) {
  // 处理确定键
}
```

#### isNavigationKey() - 检查是否是导航键

```typescript
import { isNavigationKey } from '@/types/keyMap';

if (isNavigationKey(event.key)) {
  // 处理导航键（上下左右、确认、返回）
  console.log('这是导航键');
}
```

#### isVolumeKey() - 检查是否是音量控制键

```typescript
import { isVolumeKey } from '@/types/keyMap';

if (isVolumeKey(event.key)) {
  // 处理音量控制键（+、-、=、_）
  const delta = (event.key === StandardKey.MINUS || event.key === StandardKey.UNDERSCORE) 
    ? -0.05 
    : 0.05;
  adjustVolume(delta);
}
```

## 使用示例

### 示例 1: 基本按键处理

**之前的写法：**
```typescript
function handleKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape') {
    goBack();
  }
  
  if (event.key === 'Enter') {
    confirm();
  }
  
  if (event.key === 'ArrowUp') {
    moveUp();
  }
}
```

**推荐的写法：**
```typescript
import { StandardKey } from '@/types/keyMap';

function handleKeydown(event: KeyboardEvent) {
  if (event.key === StandardKey.BACK) {
    goBack();
  }
  
  if (event.key === StandardKey.CONFIRM) {
    confirm();
  }
  
  if (event.key === StandardKey.UP) {
    moveUp();
  }
}
```

### 示例 2: 音量控制

**之前的写法：**
```typescript
if (event.key === '-' || event.key === '_') {
  adjustVolume(-0.05);
}

if (event.key === '=' || event.key === '+') {
  adjustVolume(0.05);
}
```

**推荐的写法：**
```typescript
import { StandardKey, isVolumeKey } from '@/types/keyMap';

if (isVolumeKey(event.key)) {
  const delta = (event.key === StandardKey.MINUS || event.key === StandardKey.UNDERSCORE) 
    ? -0.05 
    : 0.05;
  adjustVolume(delta);
}
```

### 示例 3: Electron 主进程中的按键转发

**之前的写法：**
```typescript
const forwardedKeys = new Set(['Enter', ' ', 'Escape', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown']);
```

**推荐的写法：**
```typescript
import { StandardKey } from './types/keyMap.js';

const forwardedKeys: Set<string> = new Set([
  StandardKey.CONFIRM,  // Space
  StandardKey.MENU,     // m
  StandardKey.BACK,     // Escape
  StandardKey.LEFT,
  StandardKey.RIGHT,
  StandardKey.UP,
  StandardKey.DOWN
]);
```

## 自定义按键映射

如果需要更改按键映射（例如将返回键从 Escape 改为 Backspace），只需修改枚举定义：

### 方法 1: 修改枚举值

```typescript
// 在 keyMap.ts 中
export enum StandardKey {
  BACK = 'Backspace',  // 原来是 'Escape'
  CONFIRM = 'Enter',
  // ... 其他按键
}
```

### 方法 2: 修改映射配置

```typescript
// 在 keyMap.ts 中
export const KeyMapping: Record<string, string> = {
  'back': 'Backspace',  // 原来是 StandardKey.BACK
  'confirm': StandardKey.CONFIRM,
  // ... 其他映射
};
```

修改后，所有使用 `StandardKey.BACK` 或 `isKey(key, 'back')` 的地方都会自动使用新的按键。

## 已迁移的文件

以下文件已完成按键枚举化改造：

1. ✅ `electron/main.ts` - 更新了 forwardedKeys
2. ✅ `src/HomePage.vue` - 更新了所有按键判断
3. ✅ `src/components/SettingsPanel.vue` - 更新了所有按键判断
4. ✅ `src/components/Settings/SiteManagement.vue` - 更新了编辑弹窗的按键判断

## 优势

1. **集中管理**: 所有按键定义在一个地方，便于维护
2. **类型安全**: 使用 TypeScript 枚举，提供编译时类型检查
3. **易于修改**: 只需修改一处即可全局生效
4. **语义清晰**: `StandardKey.BACK` 比 `'Escape'` 更具可读性
5. **避免拼写错误**: 使用枚举可以避免字符串拼写错误
6. **便于重构**: 如果需要更改按键映射，只需修改枚举定义

## 注意事项

1. 确保在 Electron 主进程和 Renderer 进程中使用相同的枚举定义
2. 修改按键映射后，需要全面测试所有相关功能
3. 保持两个端的 `keyMap.ts` 文件同步
4. 对于组合键（如 Shift + -），需要分别处理每个按键

## 后续工作

建议逐步将项目中剩余的按键比较代码也迁移到使用枚举：

- [ ] `src/composables/useLiveMenu.ts`
- [ ] 其他组件中的按键处理逻辑

搜索模式：`key === '...'` 或 `event.key === '...'`
