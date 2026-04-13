/**
 * 按键映射枚举（Electron 主进程）
 * 与 src/types/keyMap.ts 保持一致
 * 用于统一管理项目中的按键名称，方便后续更改按键映射
 */

/**
 * 标准按键枚举
 * 对应浏览器 KeyboardEvent.key 的值
 */
export enum StandardKey {
  /** 返回键 (Escape) */
  BACK = "Escape",
  /** 菜单键 (m) */
  MENU = "Alt",
  /** 确定键 (Space) - 用于确认、播放/暂停 */
  CONFIRM = " ",
  /** 上方向键 */
  UP = "ArrowUp",
  /** 下方向键 */
  DOWN = "ArrowDown",
  /** 左方向键 */
  LEFT = "ArrowLeft",
  /** 右方向键 */
  RIGHT = "ArrowRight",
  /** 减号键 */
  MINUS = "-",
  /** 下划线键 (Shift + -) */
  UNDERSCORE = "_",
  /** 等号键 */
  EQUALS = "=",
  /** 加号键 (Shift + =) */
  PLUS = "+",
  /** Tab 键 */
  TAB = "Tab",
  /** Backspace 键 */
  BACKSPACE = "Backspace",
}

/**
 * 按键映射配置
 * 可以通过修改此配置来更改按键映射
 */
export const KeyMapping: Record<string, string> = {
  // 基本导航键
  back: StandardKey.BACK,
  confirm: StandardKey.CONFIRM,
  menu: StandardKey.MENU,
  up: StandardKey.UP,
  down: StandardKey.DOWN,
  left: StandardKey.LEFT,
  right: StandardKey.RIGHT,

  // 功能键
  minus: StandardKey.MINUS,
  underscore: StandardKey.UNDERSCORE,
  equals: StandardKey.EQUALS,
  plus: StandardKey.PLUS,
  tab: StandardKey.TAB,
  backspace: StandardKey.BACKSPACE,
};

/**
 * 获取按键的实际值
 * @param keyName 按键名称
 * @returns 实际的按键值
 */
export function getKey(keyName: string): string {
  return KeyMapping[keyName] || keyName;
}

/**
 * 检查按键是否匹配
 * @param eventKey 事件中的按键值
 * @param keyName 要匹配的按键名称
 * @returns 是否匹配
 */
export function isKey(eventKey: string, keyName: string): boolean {
  return eventKey === getKey(keyName);
}

/**
 * 检查是否是导航键
 * @param key 按键值
 * @returns 是否是导航键
 */
export function isNavigationKey(key: string): boolean {
  return [
    StandardKey.UP,
    StandardKey.DOWN,
    StandardKey.LEFT,
    StandardKey.RIGHT,
    StandardKey.CONFIRM,
    StandardKey.BACK,
    StandardKey.MENU,
  ].includes(key as StandardKey);
}

/**
 * 检查是否是音量控制键
 * @param key 按键值
 * @returns 是否是音量控制键
 */
export function isVolumeKey(key: string): boolean {
  return [
    StandardKey.MINUS,
    StandardKey.UNDERSCORE,
    StandardKey.EQUALS,
    StandardKey.PLUS,
  ].includes(key as StandardKey);
}

/**
 * 检查当前焦点是否在输入框元素中（Electron 主进程版本）
 * 注意：这个函数在主进程中主要用于类型定义，实际使用应在渲染进程中
 * @returns 是否在输入框中
 */
export function isInInputElement(): boolean {
  // 在 Electron 主进程中，通常不直接访问 DOM
  // 这个函数主要是为了与 renderer 端保持一致的 API
  return false;
}
