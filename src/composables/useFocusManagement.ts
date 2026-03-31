/**
 * 焦点管理 Composable
 * 提供统一的焦点管理和导航逻辑
 */

import { ref, nextTick, type Ref } from 'vue';

/**
 * 圆形焦点选项
 */
export interface CircularFocusOptions {
  /** 总项目数 */
  total: number;
  /** 当前索引的 ref */
  currentIndex: Ref<number>;
  /** 是否循环，默认为 true */
  loop?: boolean;
  /** 索引变化时的回调 */
  onChange?: (newIndex: number) => void;
}

/**
 * 使用圆形焦点导航
 * @param options 配置选项
 * @returns 焦点移动方法
 */
export function useCircularFocus(options: CircularFocusOptions) {
  const { total, currentIndex, loop = true, onChange } = options;
  
  /**
   * 移动焦点
   * @param offset 偏移量
   */
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
  }
  
  return {
    /** 向左移动焦点 */
    moveLeft: () => move(-1),
    /** 向右移动焦点 */
    moveRight: () => move(1),
    /** 向上移动焦点 */
    moveUp: () => move(-1),
    /** 向下移动焦点 */
    moveDown: () => move(1),
    /** 设置当前索引 */
    setCurrent: (index: number) => {
      if (index >= 0 && index < total) {
        currentIndex.value = index;
        onChange?.(index);
      }
    }
  };
}

/**
 * 引用管理器
 * @template T 元素类型
 */
export function useRefManager<T extends Element>() {
  const refs = ref<(T | null)[]>([]) as Ref<(T | null)[]>;
  
  /**
   * 设置引用
   * @param element 元素
   * @param index 索引
   */
  const setRef = (element: T | null, index: number) => {
    if (element) {
      refs.value[index] = element;
    } else {
      delete refs.value[index];
    }
  };
  
  /**
   * 聚焦指定元素
   * @param index 元素索引
   */
  const focus = (index: number) => {
    const element = refs.value[index];
    if (element instanceof HTMLElement) {
      element.focus();
      element.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  };
  
  return { refs, setRef, focus };
}

/**
 * 焦点状态管理
 * @template T 焦点目标类型
 */
export interface FocusState<T extends string> {
  /** 当前焦点类型 */
  type: T;
  /** 当前索引 */
  index: number;
}

/**
 * 使用焦点状态管理
 * @param initialState 初始状态
 * @returns 焦点状态和方法
 */
export function useFocusState<T extends string>(initialState: FocusState<T>) {
  const focusState = ref<FocusState<T>>(initialState);
  
  const setFocus = (type: T, index: number = 0) => {
    focusState.value = { type, index };
  };
  
  return {
    focusState,
    setFocus,
    isType: (type: T) => focusState.value.type === type,
    getIndex: () => focusState.value.index
  };
}
