/**
 * 按键映射枚举
 * 用于统一管理项目中的按键名称，方便后续更改按键映射
 */
/**
 * 标准按键枚举
 * 对应浏览器 KeyboardEvent.key 的值
 */
export var StandardKey;
(function (StandardKey) {
    /** 返回键 (Escape) */
    StandardKey["BACK"] = "Escape";
    /** 菜单键 (m) */
    StandardKey["MENU"] = "m";
    /** 确定键 (Space) - 用于确认、播放/暂停 */
    StandardKey["CONFIRM"] = " ";
    /** 上方向键 */
    StandardKey["UP"] = "ArrowUp";
    /** 下方向键 */
    StandardKey["DOWN"] = "ArrowDown";
    /** 左方向键 */
    StandardKey["LEFT"] = "ArrowLeft";
    /** 右方向键 */
    StandardKey["RIGHT"] = "ArrowRight";
    /** 减号键 */
    StandardKey["MINUS"] = "-";
    /** 下划线键 (Shift + -) */
    StandardKey["UNDERSCORE"] = "_";
    /** 等号键 */
    StandardKey["EQUALS"] = "=";
    /** 加号键 (Shift + =) */
    StandardKey["PLUS"] = "+";
    /** Tab 键 */
    StandardKey["TAB"] = "Tab";
    /** Backspace 键 */
    StandardKey["BACKSPACE"] = "Backspace";
})(StandardKey || (StandardKey = {}));
/**
 * 按键映射配置
 * 可以通过修改此配置来更改按键映射
 */
export const KeyMapping = {
    // 基本导航键
    'back': StandardKey.BACK,
    'confirm': StandardKey.CONFIRM,
    'menu': StandardKey.MENU,
    'up': StandardKey.UP,
    'down': StandardKey.DOWN,
    'left': StandardKey.LEFT,
    'right': StandardKey.RIGHT,
    // 功能键
    'minus': StandardKey.MINUS,
    'underscore': StandardKey.UNDERSCORE,
    'equals': StandardKey.EQUALS,
    'plus': StandardKey.PLUS,
    'tab': StandardKey.TAB,
    'backspace': StandardKey.BACKSPACE
};
/**
 * 获取按键的实际值
 * @param keyName 按键名称
 * @returns 实际的按键值
 */
export function getKey(keyName) {
    return KeyMapping[keyName] || keyName;
}
/**
 * 检查按键是否匹配
 * @param eventKey 事件中的按键值
 * @param keyName 要匹配的按键名称
 * @returns 是否匹配
 */
export function isKey(eventKey, keyName) {
    return eventKey === getKey(keyName);
}
/**
 * 检查是否是导航键
 * @param key 按键值
 * @returns 是否是导航键
 */
export function isNavigationKey(key) {
    return [
        StandardKey.UP,
        StandardKey.DOWN,
        StandardKey.LEFT,
        StandardKey.RIGHT,
        StandardKey.CONFIRM,
        StandardKey.BACK,
        StandardKey.MENU
    ].includes(key);
}
/**
 * 检查是否是音量控制键
 * @param key 按键值
 * @returns 是否是音量控制键
 */
export function isVolumeKey(key) {
    return [
        StandardKey.MINUS,
        StandardKey.UNDERSCORE,
        StandardKey.EQUALS,
        StandardKey.PLUS
    ].includes(key);
}
/**
 * 检查当前焦点是否在输入框元素中
 * @returns 是否在输入框中
 */
export function isInInputElement() {
    const activeElement = document.activeElement;
    if (!activeElement) {
        return false;
    }
    const tagName = activeElement.tagName.toLowerCase();
    return (tagName === 'input' ||
        tagName === 'textarea' ||
        activeElement.isContentEditable);
}
/**
 * 检查是否应该阻止确认键的默认行为
 * 在输入框中，空格键应该输入空格而不是作为确认键
 * @param event 键盘事件
 * @returns 是否应该阻止默认行为
 */
export function shouldPreventConfirmDefault(event) {
    // 如果是确认键（空格键）且在输入框中，不应该阻止默认行为
    if (event.key === StandardKey.CONFIRM && isInInputElement()) {
        return false;
    }
    // 其他情况都阻止默认行为
    return true;
}
