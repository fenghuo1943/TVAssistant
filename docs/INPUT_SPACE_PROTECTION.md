# 输入框空格键保护实现说明

## 问题背景

在将确定键（CONFIRM）映射为空格键后，出现了一个问题：

**问题：** 当用户在设置页面的输入框中输入内容时，按空格键会触发表单的"确定"操作，而不是输入空格字符。

**影响范围：**
- 添加网址页面的"网站名称"输入框
- 添加网址页面的"网站地址"输入框
- 编辑网址弹窗中的所有输入框
- 任何其他的文本输入框

## 解决方案

### 1. 新增辅助函数

在 `src/types/keyMap.ts` 中添加了两个辅助函数：

#### `isInInputElement()` - 检查是否在输入框中

```typescript
/**
 * 检查当前焦点是否在输入框元素中
 * @returns 是否在输入框中
 */
export function isInInputElement(): boolean {
  const activeElement = document.activeElement;
  if (!activeElement) {
    return false;
  }
  
  const tagName = activeElement.tagName.toLowerCase();
  return (
    tagName === 'input' ||
    tagName === 'textarea' ||
    (activeElement as HTMLElement).isContentEditable
  );
}
```

**功能：**
- 检查当前获得焦点的元素是否是输入框
- 支持 `<input>`、`<textarea>` 和可编辑元素（`contenteditable`）

#### `shouldPreventConfirmDefault()` - 检查是否应该阻止确认键默认行为

```typescript
/**
 * 检查是否应该阻止确认键的默认行为
 * 在输入框中，空格键应该输入空格而不是作为确认键
 * @param event 键盘事件
 * @returns 是否应该阻止默认行为
 */
export function shouldPreventConfirmDefault(event: KeyboardEvent): boolean {
  // 如果是确认键（空格键）且在输入框中，不应该阻止默认行为
  if (event.key === StandardKey.CONFIRM && isInInputElement()) {
    return false;
  }
  
  // 其他情况都阻止默认行为
  return true;
}
```

**功能：**
- 判断在当前情况下是否应该阻止确认键的默认行为
- 在输入框中按空格键时，返回 `false`（允许输入空格）
- 其他情况返回 `true`（阻止默认行为，执行确认操作）

### 2. 在 SettingsPanel.vue 中应用保护

在 `handleKeydown` 函数的开始处添加输入框检查：

```typescript
// 键盘导航处理
function handleKeydown(event: KeyboardEvent) {
  const { key } = event;
  
  // 如果编辑弹窗打开，不处理（由 SiteManagement 组件自行处理）
  if (isEditDialogOpen.value) {
    return;
  }
  
  // ✅ 新增：如果在输入框中，允许默认行为（输入空格等）
  // 但方向键、返回键、菜单键仍然需要处理
  const isInput = isInInputElement();
  if (isInput && key === StandardKey.CONFIRM) {
    // 在输入框中按空格键，允许输入空格
    return;
  }
  
  // ... 其他按键处理逻辑
}
```

**工作原理：**
1. 检测到用户按下空格键（CONFIRM）
2. 检查当前焦点是否在输入框中
3. 如果在输入框中，直接返回，允许浏览器默认行为（输入空格）
4. 如果不在输入框中，继续执行后续的导航逻辑

### 3. 导入必要的函数

```typescript
import { StandardKey, isInInputElement } from '../types/keyMap.js';
```

## 保护范围

### ✅ 受保护的输入框

1. **添加网址页面**
   - 网站名称输入框 (`#add-site-name`)
   - 网站地址输入框 (`#add-site-url`)

2. **编辑网址弹窗**
   - 网站名称输入框 (`#edit-name-input`)
   - 网站地址输入框 (`#edit-url-input`)
   - 图标 URL 输入框 (`#edit-icon-input`)

3. **未来的输入框**
   - 任何使用 `<input>` 或 `<textarea>` 的地方
   - 任何设置了 `contenteditable="true"` 的元素

### ⚠️ 不受影响的按键

以下按键即使在输入框中也会被拦截处理：

- **方向键** (UP/DOWN/LEFT/RIGHT) - 用于在表单元素间导航
- **返回键** (BACK/Escape) - 用于关闭弹窗或返回
- **菜单键** (MENU/m) - 用于呼出菜单
- **音量控制键** (MINUS/PLUS 等) - 用于调整音量

这是有意设计的，因为：
1. 方向键在输入框中移动光标的需求较少（可以用鼠标或 Home/End 键）
2. 返回键和菜单键的功能优先级更高
3. 保持键盘导航的一致性

## 测试场景

### 场景 1：在添加网址页面输入空格

**操作步骤：**
1. 打开设置 → 添加新网址
2. 点击"网站名称"输入框
3. 按空格键

**预期结果：**
- ✅ 输入框中出现空格字符
- ❌ 不会触发"确认"按钮

### 场景 2：在编辑网址弹窗中输入空格

**操作步骤：**
1. 在网址管理页面，点击某个网址的"编辑"按钮
2. 在弹出的编辑对话框中，点击任意输入框
3. 按空格键

**预期结果：**
- ✅ 输入框中出现空格字符
- ❌ 不会关闭弹窗或触发确认

### 场景 3：在非输入框区域按空格键

**操作步骤：**
1. 在设置页面的侧边栏或卡片上
2. 按空格键

**预期结果：**
- ✅ 触发"确认"操作（如选中项目、打开下拉框等）
- ❌ 不会输入空格字符

### 场景 4：在输入框中使用方向键

**操作步骤：**
1. 在添加网址页面的输入框中
2. 按方向键（上下左右）

**预期结果：**
- ✅ 方向键仍然被拦截，用于在表单元素间导航
- ❌ 不会在输入框中移动光标

**注意：** 这是当前设计的行为。如果需要在输入框中使用方向键移动光标，可以进一步优化逻辑。

## 未来优化建议

### 1. 更精细的输入框保护

如果需要在使用方向键时也能在输入框中移动光标，可以这样修改：

```typescript
// 如果在输入框中，且是方向键或空格键，允许默认行为
const isInput = isInInputElement();
if (isInput && (
  key === StandardKey.CONFIRM ||
  key === StandardKey.UP ||
  key === StandardKey.DOWN ||
  key === StandardKey.LEFT ||
  key === StandardKey.RIGHT
)) {
  // 允许浏览器默认行为
  return;
}
```

### 2. 特殊模式切换

可以添加一个"编辑模式"，在编辑模式下所有导航键都被禁用：

```typescript
const isEditMode = ref(false);

function enterEditMode() {
  isEditMode.value = true;
}

function exitEditMode() {
  isEditMode.value = false;
}

// 在 handleKeydown 中
if (isEditMode.value && isNavigationKey(key)) {
  return; // 允许默认行为
}
```

### 3. 用户可配置

允许用户在设置中选择：
- "在输入框中启用导航键"（默认关闭）
- "空格键作为确认键"（默认开启）

## 相关文件

- `src/types/keyMap.ts` - 定义了 `isInInputElement()` 和 `shouldPreventConfirmDefault()` 函数
- `electron/types/keyMap.ts` - Electron 主进程的版本（占位实现）
- `src/components/SettingsPanel.vue` - 应用了输入框保护逻辑
- `src/HomePage.vue` - 不需要保护（没有输入框）

## 总结

✅ **已完成：**
- 添加了 `isInInputElement()` 辅助函数
- 添加了 `shouldPreventConfirmDefault()` 辅助函数
- 在 SettingsPanel 中应用了输入框保护
- 移除了 main.ts 中冗余的 `StandardKey.SPACE`

✅ **效果：**
- 在输入框中按空格键可以正常输入空格
- 在非输入框区域按空格键仍然作为确认键
- 保持了键盘导航的一致性

⚠️ **注意事项：**
- 方向键在输入框中仍然被拦截（用于导航）
- 如果需要更精细的控制，可以参考"未来优化建议"
