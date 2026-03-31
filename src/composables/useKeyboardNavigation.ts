/**
 * 键盘导航 Composable
 * 提供统一的键盘事件处理逻辑
 */

import type { Ref } from 'vue';

/**
 * 键盘事件处理器映射
 */
export type KeyHandlerMap = Record<string, () => void>;

/**
 * 键盘事件处理器选项
 */
export interface KeyHandlerOptions {
  /** 是否阻止默认行为，默认为 true */
  preventDefault?: boolean;
  /** 是否停止事件传播，默认为 false */
  stopPropagation?: boolean;
}

/**
 * 创建键盘事件处理器
 * @param handlers 按键到处理函数的映射
 * @param options 配置选项
 * @returns 键盘事件处理函数
 */
export function createKeyHandler(
  handlers: KeyHandlerMap,
  options: KeyHandlerOptions = {}
): (event: KeyboardEvent) => void {
  const { preventDefault = true, stopPropagation = false } = options;
  
  return (event: KeyboardEvent) => {
    const handler = handlers[event.key];
    if (handler) {
      if (preventDefault) {
        event.preventDefault();
      }
      if (stopPropagation) {
        event.stopPropagation();
      }
      handler();
    }
  };
}

/**
 * 合并多个键盘事件处理器
 * @param handlersList 处理器数组
 * @returns 合并后的处理器
 */
export function mergeHandlers(...handlersList: KeyHandlerMap[]): KeyHandlerMap {
  return Object.assign({}, ...handlersList);
}

/**
 * 根据条件创建条件处理器
 * @param condition 条件 ref
 * @param handlers 处理器映射
 * @returns 条件处理器映射
 */
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
