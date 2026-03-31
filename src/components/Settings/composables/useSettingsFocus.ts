import { ref, nextTick, type Ref } from 'vue';

/**
 * 设置面板焦点管理 Composable
 * 统一管理侧边栏、内容区、网址列表、表单等焦点状态
 */
export function useSettingsFocus() {
  // 焦点状态管理
  const focusedSidebarIndex = ref(0); // 侧边栏焦点索引
  const focusedContentIndex = ref(-1); // 内容区焦点索引（-1 表示未聚焦）
  const modeFocusedIndex = ref(0); // 模式选择焦点（游戏/电视）
  const focusedSiteIndex = ref(0); // 网址列表焦点索引
  const focusedButtonIndex = ref(-1); // 按钮焦点索引（用于网址操作或表单按钮）
  const focusedInputIndex = ref(-1); // 输入框焦点索引（-1 表示未聚焦，0 名称，1URL）

  // 引用元素
  const sidebarItemRefs: Ref<HTMLButtonElement[]> = ref([]);
  const siteItemRefs: Ref<HTMLDivElement[]> = ref([]);

  /**
   * 设置侧边栏焦点
   */
  function focusSidebar(index: number, menuItems: Array<{ key: string }>) {
    const total = menuItems.length;
    focusedSidebarIndex.value = (index + total) % total;
    focusedContentIndex.value = -1;
    focusedButtonIndex.value = -1;
    
    nextTick(() => {
      sidebarItemRefs.value[focusedSidebarIndex.value]?.focus();
    });
  }

  /**
   * 设置内容区焦点
   */
  function focusContent(index: number) {
    focusedContentIndex.value = index;
    focusedSidebarIndex.value = -1;
  }

  /**
   * 设置网址项焦点
   */
  function focusSite(index: number, shortcuts: any[]) {
    const total = shortcuts.length;
    focusedSiteIndex.value = (index + total) % total;
    focusedContentIndex.value = -1;
    focusedButtonIndex.value = -1;
    
    nextTick(() => {
      const element = siteItemRefs.value[focusedSiteIndex.value];
      if (element) {
        element.focus();
        element.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    });
  }

  /**
   * 重置所有焦点状态
   */
  function resetFocus() {
    focusedSidebarIndex.value = 0;
    focusedContentIndex.value = -1;
    modeFocusedIndex.value = 0;
    focusedSiteIndex.value = 0;
    focusedButtonIndex.value = -1;
    focusedInputIndex.value = -1;
  }

  return {
    // 状态
    focusedSidebarIndex,
    focusedContentIndex,
    modeFocusedIndex,
    focusedSiteIndex,
    focusedButtonIndex,
    focusedInputIndex,
    // 引用
    sidebarItemRefs,
    siteItemRefs,
    // 方法
    focusSidebar,
    focusContent,
    focusSite,
    resetFocus
  };
}
