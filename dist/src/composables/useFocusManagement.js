/**
 * 焦点管理 Composable
 * 提供统一的焦点管理和导航逻辑
 */
import { ref } from 'vue';
/**
 * 使用圆形焦点导航
 * @param options 配置选项
 * @returns 焦点移动方法
 */
export function useCircularFocus(options) {
    const { total, currentIndex, loop = true, onChange } = options;
    /**
     * 移动焦点
     * @param offset 偏移量
     */
    function move(offset) {
        if (total === 0)
            return;
        let newIndex = currentIndex.value + offset;
        if (loop) {
            newIndex = (newIndex + total) % total;
        }
        else {
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
        setCurrent: (index) => {
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
export function useRefManager() {
    const refs = ref([]);
    /**
     * 设置引用
     * @param element 元素
     * @param index 索引
     */
    const setRef = (element, index) => {
        if (element) {
            refs.value[index] = element;
        }
        else {
            delete refs.value[index];
        }
    };
    /**
     * 聚焦指定元素
     * @param index 元素索引
     */
    const focus = (index) => {
        const element = refs.value[index];
        if (element instanceof HTMLElement) {
            element.focus();
            element.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
    };
    return { refs, setRef, focus };
}
/**
 * 使用焦点状态管理
 * @param initialState 初始状态
 * @returns 焦点状态和方法
 */
export function useFocusState(initialState) {
    const focusState = ref(initialState);
    const setFocus = (type, index = 0) => {
        focusState.value = { type, index };
    };
    return {
        focusState,
        setFocus,
        isType: (type) => focusState.value.type === type,
        getIndex: () => focusState.value.index
    };
}
