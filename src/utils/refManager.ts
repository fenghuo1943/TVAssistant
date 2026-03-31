/**
 * 引用管理器
 * 封装 Vue 3 的 ref 管理逻辑，提供统一的引用操作接口
 */

import { ref, type Ref, type ComponentPublicInstance } from 'vue';

/**
 * 引用管理器接口
 */
export interface RefManager<T extends Element = Element> {
  refs: Ref<(T | null)[]>;
  setRef: (element: T | null, index: number) => void;
  focus: (index: number) => void;
  blur: (index: number) => void;
  getRef: (index: number) => T | null;
  getTotal: () => number;
}

/**
 * 创建数组引用管理器
 * @returns 引用管理器对象
 */
export function createRefManager<T extends Element = Element>(): RefManager<T> {
  const refs = ref<(T | null)[]>([]) as Ref<(T | null)[]>;
  
  /**
   * 设置引用
   * @param element - DOM 元素或 null
   * @param index - 索引位置
   */
  const setRef = (element: T | null, index: number) => {
    if (element) {
      refs.value[index] = element;
    } else {
      delete refs.value[index];
    }
  };
  
  /**
   * 获取引用
   * @param index - 索引位置
   * @returns DOM 元素或 null
   */
  const getRef = (index: number): T | null => {
    return refs.value[index] ?? null;
  };
  
  /**
   * 聚焦指定元素
   * @param index - 索引位置
   */
  const focus = (index: number) => {
    const element = refs.value[index];
    if (element instanceof HTMLElement) {
      element.focus();
      element.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'nearest' 
      });
    }
  };
  
  /**
   * 失焦指定元素
   * @param index - 索引位置
   */
  const blur = (index: number) => {
    const element = refs.value[index];
    if (element instanceof HTMLElement) {
      element.blur();
    }
  };
  
  /**
   * 获取总数
   * @returns 引用数组长度
   */
  const getTotal = () => refs.value.length;
  
  return {
    refs,
    setRef,
    focus,
    blur,
    getRef,
    getTotal
  };
}

/**
 * 单个引用管理器接口
 */
export interface SingleRefManager<T extends Element = Element> {
  ref: Ref<T | null>;
  setRef: (element: T | ComponentPublicInstance | null) => void;
  focus: () => void;
  blur: () => void;
  exists: () => boolean;
}

/**
 * 创建单个引用管理器
 * @param initialElement - 初始元素
 * @returns 单个引用管理器对象
 */
export function createSingleRefManager<T extends Element = Element>(
  initialElement: T | null = null
): SingleRefManager<T> {
  const elementRef = ref<T | null>(initialElement) as Ref<T | null>;
  
  const setRef = (element: T | ComponentPublicInstance | null) => {
    if (element instanceof Element) {
      elementRef.value = element as T;
    } else {
      elementRef.value = null;
    }
  };
  
  const focus = () => {
    if (elementRef.value instanceof HTMLElement) {
      elementRef.value.focus();
      elementRef.value.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'nearest' 
      });
    }
  };
  
  const blur = () => {
    if (elementRef.value instanceof HTMLElement) {
      elementRef.value.blur();
    }
  };
  
  const exists = () => elementRef.value !== null;
  
  return {
    ref: elementRef,
    setRef,
    focus,
    blur,
    exists
  };
}

/**
 * 类型守卫：判断是否为 Vue 组件实例
 * @param element - 待判断的元素
 * @returns 是否为组件实例
 */
export function isComponentPublicInstance(
  element: Element | ComponentPublicInstance | null
): element is ComponentPublicInstance {
  return element !== null && !(element instanceof Element);
}

/**
 * 类型守卫：判断是否为原生 DOM 元素
 * @param element - 待判断的元素
 * @returns 是否为 DOM 元素
 */
export function isElement(
  element: Element | ComponentPublicInstance | null
): element is Element {
  return element instanceof Element;
}

/**
 * 安全的元素转换
 * @param element - 原始元素
 * @returns 转换后的元素或 null
 */
export function safeElementCast<T extends Element>(
  element: Element | ComponentPublicInstance | null
): T | null {
  if (element instanceof Element) {
    return element as T;
  }
  return null;
}
