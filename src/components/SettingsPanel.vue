<template>
  <section class="settings-shell" ref="settingsShellRef" tabindex="0" @keydown.capture="handleKeydown" role="application" aria-label="设置面板">
    <header class="settings-header">
      <button type="button" class="back-button" ref="backButtonRef" @click="$emit('back')" aria-label="返回上一页">
        ← 返回
      </button>
      <h1 class="settings-title" id="settings-title">设置</h1>
    </header>

    <div class="settings-body">
      <SettingsSidebar
        :active-menu="activeMenu"
        :focused-index="focusedSidebarIndex"
        @select-menu="$emit('select-menu', $event)"
        @set-ref="setSidebarItemRef"
      />

      <div class="settings-content" role="presentation">
        <GeneralSettings
          v-if="activeMenu === 'general'"
          :settings="settings"
          :is-secondary-focused="isSecondaryFocused"
          @update-setting="$emit('update-setting', $event)"
        />
        
        <SiteManagement
          v-else-if="activeMenu === 'site-management'"
          :settings="settings"
          :focused-index="focusedSiteIndex"
          :is-secondary-focused="isSecondaryFocused"
          @update-setting="$emit('update-setting', $event)"
          @set-ref="setSiteItemRef"
          @item-removed="handleSiteRemoved"
          @open-edit-dialog="handleOpenEditDialog"
          @close-edit-dialog="handleCloseEditDialog"
          @edit-dialog-state-change="handleEditDialogStateChange"
        />
        
        <AddSiteForm
          v-else-if="activeMenu === 'add-site'"
          ref="addSiteFormRef"
          :settings="settings"
          :is-secondary-focused="isSecondaryFocused"
          @update-setting="$emit('update-setting', $event)"
        />
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { computed, nextTick, onMounted, onUnmounted, ref } from 'vue';
import { useSettingsFocus } from './Settings/composables/useSettingsFocus.js';
import SettingsSidebar from './Settings/SettingsSidebar.vue';
import GeneralSettings from './Settings/GeneralSettings.vue';
import SiteManagement from './Settings/SiteManagement.vue';
import AddSiteForm from './Settings/AddSiteForm.vue';
import type { AppSettings } from '../settings.ts';
import type { IpcRenderer } from '../plugins/types.ts';

const ipcRenderer = ((window as typeof window & { require?: (moduleName: string) => { ipcRenderer?: IpcRenderer } })
  .require?.('electron')?.ipcRenderer ?? null) as IpcRenderer | null;

type SettingsMenuKey = 'general' | 'site-management' | 'add-site' | 'add-local-app' | 'wallpaper';

const props = defineProps<{
  activeMenu: SettingsMenuKey;
  settings: AppSettings;
}>();

const emit = defineEmits<{
  back: [];
  'select-menu': [menu: SettingsMenuKey];
  'update-setting': [value: Partial<AppSettings>];
}>();

// 使用焦点管理 composable
const {
  focusedSidebarIndex,
  focusedContentIndex,
  modeFocusedIndex,
  focusedSiteIndex,
  focusedButtonIndex,
  focusedInputIndex,
  sidebarItemRefs,
  siteItemRefs,
  focusSidebar,
  focusContent,
  focusSite,
  resetFocus
} = useSettingsFocus();

// 引用元素
const settingsShellRef = ref<HTMLElement | null>(null);
const backButtonRef = ref<HTMLButtonElement | null>(null);
const addSiteFormRef = ref<InstanceType<typeof AddSiteForm> | null>(null);

// 编辑弹窗状态
const isEditDialogOpen = ref(false);
const editDialogFocusedIndex = ref(0); // 0: 名称输入框，1: URL 输入框，2: 图标输入框，3: 确认按钮，4: 取消按钮

const menuItems: Array<{ key: SettingsMenuKey; label: string }> = [
  { key: 'general', label: '常规' },
  { key: 'site-management', label: '网址管理' },
  { key: 'add-site', label: '添加新网址' },
  { key: 'add-local-app', label: '添加本地应用' },
  { key: 'wallpaper', label: '壁纸设置' }
];

// 判断是否聚焦在第二级选项上（内容区）
const isSecondaryFocused = computed(() => {
  if (focusedSidebarIndex.value >= 0) {
    return false;
  }
  
  // 如果编辑弹窗打开，不算二级焦点
  if (isEditDialogOpen.value) {
    return false;
  }
  
  switch (props.activeMenu) {
    case 'general':
      return focusedContentIndex.value >= 0;
    case 'site-management':
      return focusedSiteIndex.value >= 0 || focusedButtonIndex.value >= 0;
    case 'add-site':
      return focusedInputIndex.value >= 0 || focusedButtonIndex.value >= 0;
    default:
      return false;
  }
});

function setSidebarItemRef(el: HTMLButtonElement, index: number) {
  if (el) {
    sidebarItemRefs.value[index] = el;
  }
}

function setSiteItemRef(el: HTMLDivElement, index: number) {
  if (el) {
    siteItemRefs.value[index] = el;
  }
}

// 键盘导航处理
function handleKeydown(event: KeyboardEvent) {
  const { key } = event;
  
  console.log('[handleKeydown] 捕获到按键:', key);
  console.log('[handleKeydown] isEditDialogOpen:', isEditDialogOpen.value);
  
  // 如果编辑弹窗打开，不处理（由 SiteManagement 组件自行处理）
  if (isEditDialogOpen.value) {
    console.log('[handleKeydown] 弹窗打开，由 SiteManagement 处理');
    return;
  }
  
  // 如果在侧边栏
  if (focusedSidebarIndex.value >= 0) {
    handleSidebarKeydown(event);
    return;
  }
  
  // 如果在网址管理页面
  if (props.activeMenu === 'site-management' && focusedSiteIndex.value >= 0) {
    handleSiteManagementKeydown(event);
    return;
  }
  
  // 如果在添加新网址页面
  if (props.activeMenu === 'add-site') {
    handleAddSiteKeydown(event);
    return;
  }
  
  // 如果在内容区（常规设置）
  if (focusedContentIndex.value >= 0) {
    handleGeneralSettingsKeydown(event);
    return;
  }
}

function handleSidebarKeydown(event: KeyboardEvent) {
  const { key } = event;
  
  // 在侧边栏按 Backspace 或 Escape：关闭设置页面
  if (key === 'Escape') {
    event.preventDefault();
    emit('back');
    return;
  }
  
  if (key === 'ArrowUp') {
    event.preventDefault();
    const newIndex = (focusedSidebarIndex.value - 1 + menuItems.length) % menuItems.length;
    focusedSidebarIndex.value = newIndex;
    sidebarItemRefs.value[newIndex]?.focus();
    // 触发菜单切换
    emit('select-menu', menuItems[newIndex].key);
    return;
  }
  
  if (key === 'ArrowDown') {
    event.preventDefault();
    const newIndex = (focusedSidebarIndex.value + 1) % menuItems.length;
    focusedSidebarIndex.value = newIndex;
    sidebarItemRefs.value[newIndex]?.focus();
    // 触发菜单切换
    emit('select-menu', menuItems[newIndex].key);
    return;
  }
  
  if (key === 'ArrowRight' || key === 'Enter') {
    event.preventDefault();
    const currentMenuKey = menuItems[focusedSidebarIndex.value].key;
    
    // 离开侧边栏，进入内容区
    focusedSidebarIndex.value = -1;
    
    if (currentMenuKey === 'general') {
      focusedContentIndex.value = 0;
      modeFocusedIndex.value = 0;
      nextTick(() => {
        // 手动触发 GeneralSettings 组件的聚焦
        const firstElement = document.querySelector('#panel-general .setting-select') as HTMLElement | null;
        firstElement?.focus();
      });
    } else if (currentMenuKey === 'site-management') {
      focusedSiteIndex.value = 0;
      focusedButtonIndex.value = -1;
      nextTick(() => {
        siteItemRefs.value[0]?.focus();
      });
    } else if (currentMenuKey === 'add-site') {
      focusedInputIndex.value = 0;
      focusedButtonIndex.value = -1;
      nextTick(() => {
        addSiteFormRef.value?.siteNameInputRef?.focus();
      });
    }
    return;
  }
}

function handleGeneralSettingsKeydown(event: KeyboardEvent) {
  const { key } = event;
  
  // 在常规设置页面按 Backspace 或 Escape：返回侧边栏
  if (key === 'Escape') {
    event.preventDefault();
    // 回到侧边栏，保持当前选中的菜单项
    const currentMenuIndex = menuItems.findIndex(item => item.key === props.activeMenu);
    focusedSidebarIndex.value = currentMenuIndex >= 0 ? currentMenuIndex : 0;
    focusedContentIndex.value = -1;
    nextTick(() => {
      sidebarItemRefs.value[focusedSidebarIndex.value]?.focus();
    });
    return;
  }
  
  if (key === 'ArrowUp') {
    event.preventDefault();
    if (focusedContentIndex.value > 0) {
      focusedContentIndex.value--;
      nextTick(() => {
        focusGeneralSettingElement(focusedContentIndex.value);
      });
    } else {
      // 回到侧边栏
      //focusedSidebarIndex.value = 0;
      focusedContentIndex.value = 2;
      nextTick(() => {
        //sidebarItemRefs.value[0]?.focus();
        focusGeneralSettingElement(focusedContentIndex.value);
      });
    }
    return;
  }
  
  if (key === 'ArrowDown') {
    event.preventDefault();
    if (focusedContentIndex.value < 2) {
      focusedContentIndex.value++;
      nextTick(() => {
        focusGeneralSettingElement(focusedContentIndex.value);
      });
    } else {
      // 循环到第一个
      focusedContentIndex.value = 0;
      nextTick(() => {
        focusGeneralSettingElement(focusedContentIndex.value);
      });
    }
    return;
  }
  
  if (key === 'ArrowLeft') {
    event.preventDefault();
    // 回到侧边栏，保持当前选中的菜单项
    const currentMenuIndex = menuItems.findIndex(item => item.key === props.activeMenu);
    focusedSidebarIndex.value = currentMenuIndex >= 0 ? currentMenuIndex : 0;
    focusedContentIndex.value = -1;
    nextTick(() => {
      sidebarItemRefs.value[focusedSidebarIndex.value]?.focus();
    });
    return;
  }
  
  if (key === 'ArrowRight' && focusedContentIndex.value === 2) {
    event.preventDefault();
    modeFocusedIndex.value = modeFocusedIndex.value === 0 ? 1 : 0;
    nextTick(() => {
      focusGeneralSettingElement(focusedContentIndex.value);
    });
    return;
  }
  
  if (key === 'Enter') {
    event.preventDefault();
    if(focusedContentIndex.value === 0){
      // 打开 select 下拉框
      const selectElement = document.querySelector('#panel-general .setting-select') as HTMLSelectElement | null;
      selectElement?.showPicker?.();
    }
    else if (focusedContentIndex.value === 1) {
      emit('update-setting', { startAtLogin: !props.settings.startAtLogin });
    } else if (focusedContentIndex.value === 2) {
      modeFocusedIndex.value = modeFocusedIndex.value === 0 ? 1 : 0;
      emit('update-setting', { homeMode: modeFocusedIndex.value === 0 ? 'game' : 'tv' });
      nextTick(() => {
        focusGeneralSettingElement(focusedContentIndex.value);
      });
    }
    return;
  }
}

/**
 * 聚焦常规设置页面的指定元素
 * 0: select, 1: switch, 2: mode toggle
 */
function focusGeneralSettingElement(index: number) {
  if (index === 0) {
    const selectElement = document.querySelector('#panel-general .setting-select') as HTMLElement | null;
    selectElement?.focus();
  } else if (index === 1) {
    const switchElement = document.querySelector('#panel-general .switch-button') as HTMLElement | null;
    switchElement?.focus();
  } else if (index === 2) {
    // 根据 modeFocusedIndex 选择对应的按钮，而不是依赖 .is-active
    const modeElements = document.querySelectorAll('#panel-general .mode-option') as NodeListOf<HTMLElement>;
    const targetIndex = modeFocusedIndex.value; // 0 或 1
    if (targetIndex >= 0 && targetIndex < modeElements.length) {
      modeElements[targetIndex]?.focus();
    }
  }
}

function handleSiteManagementKeydown(event: KeyboardEvent) {
  const { key } = event;
  
  // 在网址管理页面按 Backspace 或 Escape：返回侧边栏
  if (key === 'Escape') {
    event.preventDefault();
    // 回到侧边栏，保持当前选中的菜单项
    const currentMenuIndex = menuItems.findIndex(item => item.key === props.activeMenu);
    focusedSidebarIndex.value = currentMenuIndex >= 0 ? currentMenuIndex : 0;
    focusedSiteIndex.value = 0;
    focusedButtonIndex.value = -1;
    nextTick(() => {
      sidebarItemRefs.value[focusedSidebarIndex.value]?.focus();
    });
    return;
  }
  
  // 如果焦点在按钮上
  if (focusedButtonIndex.value >= 0) {
    if (key === 'ArrowLeft') {
      event.preventDefault();
      focusedButtonIndex.value = -1;
      nextTick(() => {
        siteItemRefs.value[focusedSiteIndex.value]?.focus();
      });
      return;
    }
    
    if (key === 'ArrowUp') {
      event.preventDefault();
      if (focusedButtonIndex.value > 0) {
        focusedButtonIndex.value--;
      } else {
        focusedButtonIndex.value = -1;
        focusedSiteIndex.value = 0;
        nextTick(() => {
          siteItemRefs.value[focusedSiteIndex.value]?.focus();
        });
      }
      return;
    }
    
    if (key === 'ArrowDown') {
      event.preventDefault();
      if (focusedButtonIndex.value < siteItemRefs.value.length - 1) {
        focusedButtonIndex.value++;
      } else {
        focusedButtonIndex.value = -1;
        focusedSiteIndex.value = siteItemRefs.value.length - 1;
        nextTick(() => {
          siteItemRefs.value[focusedSiteIndex.value]?.focus();
        });
      }
      return;
    }
    
    if (key === 'Enter') {
      event.preventDefault();
      // 触发按钮点击（通过查找 DOM 元素模拟点击）
      const button = siteItemRefs.value[focusedButtonIndex.value]?.querySelector('.action-button') as HTMLButtonElement | null;
      button?.click();
      return;
    }
    
    return;
  }
  
  // 如果焦点在网址项上
  if (key === 'ArrowUp') {
    event.preventDefault();
    const newIndex = (focusedSiteIndex.value - 1 + siteItemRefs.value.length) % siteItemRefs.value.length;
    focusedSiteIndex.value = newIndex;
    nextTick(() => {
      siteItemRefs.value[newIndex]?.focus();
    });
    return;
  }
  
  if (key === 'ArrowDown') {
    event.preventDefault();
    const newIndex = (focusedSiteIndex.value + 1) % siteItemRefs.value.length;
    focusedSiteIndex.value = newIndex;
    nextTick(() => {
      siteItemRefs.value[newIndex]?.focus();
    });
    return;
  }
  
  if (key === 'ArrowRight') {
    event.preventDefault();
    focusedButtonIndex.value = focusedSiteIndex.value;
    nextTick(() => {
      const button = siteItemRefs.value[focusedButtonIndex.value]?.querySelector('.action-button') as HTMLButtonElement | null;
      button?.focus();
    });
    return;
  }
  
  if (key === 'Enter') {
    event.preventDefault();
    // 触发现有网站的切换
    const button = siteItemRefs.value[focusedSiteIndex.value]?.querySelector('.action-button') as HTMLButtonElement | null;
    button?.click();
    return;
  }
}

// 处理网址删除后的焦点调整
function handleSiteRemoved(removedIndex: number) {
  // 删除后，将焦点移动到上一个元素（如果存在）
  const newIndex = Math.max(0, removedIndex - 1);
  
  // 检查新索引是否在有效范围内
  if (newIndex < siteItemRefs.value.length) {
    focusedSiteIndex.value = newIndex;
    focusedButtonIndex.value = -1;
    nextTick(() => {
      siteItemRefs.value[newIndex]?.focus();
    });
  } else if (siteItemRefs.value.length === 0) {
    // 如果没有网址了，返回侧边栏
    const currentMenuIndex = menuItems.findIndex(item => item.key === props.activeMenu);
    focusedSidebarIndex.value = currentMenuIndex >= 0 ? currentMenuIndex : 0;
    focusedSiteIndex.value = 0;
    focusedButtonIndex.value = -1;
    nextTick(() => {
      sidebarItemRefs.value[focusedSidebarIndex.value]?.focus();
    });
  }
}

// 处理编辑弹窗打开
function handleOpenEditDialog() {
  console.log('[SettingsPanel] handleOpenEditDialog called');
  isEditDialogOpen.value = true;
  editDialogFocusedIndex.value = 0; // 重置焦点到第一个输入框
}

// 处理编辑弹窗关闭
function handleCloseEditDialog() {
  console.log('[SettingsPanel] handleCloseEditDialog called');
  isEditDialogOpen.value = false;
  editDialogFocusedIndex.value = 0;
}

// 处理编辑弹窗状态变化
function handleEditDialogStateChange(isOpen: boolean) {
  console.log('[SettingsPanel] handleEditDialogStateChange:', isOpen);
  isEditDialogOpen.value = isOpen;
  if (!isOpen) {
    editDialogFocusedIndex.value = 0;
  }
}

// 注意：编辑弹窗的键盘事件现在由 SiteManagement 组件自行处理

// 聚焦编辑弹窗中的指定元素
function focusEditDialogElement() {
  const elements = [
    document.querySelector('#edit-name-input') as HTMLElement,
    document.querySelector('#edit-url-input') as HTMLElement,
    document.querySelector('#edit-icon-input') as HTMLElement,
    document.querySelector('.dialog-content .confirm-btn') as HTMLElement,
    document.querySelector('.dialog-content .cancel-btn') as HTMLElement
  ];
  
  const targetElement = elements[editDialogFocusedIndex.value];
  if (targetElement) {
    targetElement.focus();
  }
}

function handleAddSiteKeydown(event: KeyboardEvent) {
  const { key } = event;
  
  // 在添加新网址页面按 Backspace 或 Escape：返回侧边栏
  if (key === 'Escape') {
    event.preventDefault();
    // 回到侧边栏，保持当前选中的菜单项
    const currentMenuIndex = menuItems.findIndex(item => item.key === props.activeMenu);
    focusedSidebarIndex.value = currentMenuIndex >= 0 ? currentMenuIndex : 0;
    focusedInputIndex.value = -1;
    focusedButtonIndex.value = -1;
    nextTick(() => {
      sidebarItemRefs.value[focusedSidebarIndex.value]?.focus();
    });
    return;
  }
  
  // 如果焦点在输入框上
  if (focusedInputIndex.value >= 0) {
    if (key === 'ArrowUp') {
      event.preventDefault();
      if (focusedInputIndex.value > 0) {
        focusedInputIndex.value--;
        nextTick(() => {
          if (focusedInputIndex.value === 0) {
            addSiteFormRef.value?.siteNameInputRef?.focus();
          }
        });
      }
      return;
    }
    
    if (key === 'ArrowDown') {
      event.preventDefault();
      if (focusedInputIndex.value < 1) {
        focusedInputIndex.value++;
        nextTick(() => {
          if (focusedInputIndex.value === 1) {
            addSiteFormRef.value?.siteUrlInputRef?.focus();
          }
        });
      } else {
        focusedInputIndex.value = -1;
        focusedButtonIndex.value = 0;
        nextTick(() => {
          addSiteFormRef.value?.confirmBtnRef?.focus();
        });
      }
      return;
    }
    
    if (key === 'ArrowLeft') {
      event.preventDefault();
      if (focusedButtonIndex.value > 0) {
        focusedButtonIndex.value--;
        nextTick(() => {
          addSiteFormRef.value?.confirmBtnRef?.focus();
        });
      } else {
        focusedButtonIndex.value = -1;
        focusedInputIndex.value = 1;
        nextTick(() => {
          addSiteFormRef.value?.siteUrlInputRef?.focus();
        });
      }
      return;
    }
    
    if (key === 'Enter') {
      event.preventDefault();
      if (focusedInputIndex.value === 0) {
        focusedInputIndex.value = 1;
        nextTick(() => {
          addSiteFormRef.value?.siteUrlInputRef?.focus();
        });
      } else if (focusedInputIndex.value === 1) {
        addSiteFormRef.value?.handleSubmit();
      }
      return;
    }
    
    return;
  }
  
  // 如果焦点在按钮上
  if (focusedButtonIndex.value >= 0) {
    if (key === 'ArrowLeft') {
      event.preventDefault();
      if (focusedButtonIndex.value > 0) {
        focusedButtonIndex.value--;
        nextTick(() => {
          addSiteFormRef.value?.confirmBtnRef?.focus();
        });
      } else {
        focusedButtonIndex.value = -1;
        focusedInputIndex.value = 1;
        nextTick(() => {
          addSiteFormRef.value?.siteUrlInputRef?.focus();
        });
      }
      return;
    }
    
    if (key === 'ArrowRight') {
      event.preventDefault();
      if (focusedButtonIndex.value < 1) {
        focusedButtonIndex.value++;
        nextTick(() => {
          addSiteFormRef.value?.cancelBtnRef?.focus();
        });
      } else {
        focusedButtonIndex.value = -1;
        focusedInputIndex.value = 1;
        nextTick(() => {
          addSiteFormRef.value?.siteUrlInputRef?.focus();
        });
      }
      return;
    }
    
    if (key === 'ArrowUp') {
      event.preventDefault();
      if (focusedButtonIndex.value > 0) {
        focusedButtonIndex.value--;
        nextTick(() => {
          addSiteFormRef.value?.confirmBtnRef?.focus();
        });
      } else {
        focusedButtonIndex.value = -1;
        focusedInputIndex.value = 1;
        nextTick(() => {
          addSiteFormRef.value?.siteUrlInputRef?.focus();
        });
      }
      return;
    }
    
    if (key === 'ArrowDown') {
      event.preventDefault();
      if (focusedButtonIndex.value < 1) {
        focusedButtonIndex.value++;
        nextTick(() => {
          addSiteFormRef.value?.cancelBtnRef?.focus();
        });
      }
      return;
    }
    
    if (key === 'Enter') {
      event.preventDefault();
      if (focusedButtonIndex.value === 0) {
        addSiteFormRef.value?.handleSubmit();
      } else if (focusedButtonIndex.value === 1) {
        addSiteFormRef.value?.handleCancel();
      }
      return;
    }
    
    return;
  }
  
  // 默认回到侧边栏
  if (key === 'ArrowLeft') {
    event.preventDefault();
    const currentMenuIndex = menuItems.findIndex(item => item.key === props.activeMenu);
    focusSidebar(currentMenuIndex >= 0 ? currentMenuIndex : 0, menuItems);
    return;
  }
}

onMounted(() => {
  ipcRenderer?.send('settings-panel:focus-changed', true);
  const currentMenuIndex = menuItems.findIndex(item => item.key === props.activeMenu);
    focusedSidebarIndex.value = currentMenuIndex >= 0 ? currentMenuIndex : 0;
  nextTick(() => {
    settingsShellRef.value?.focus();
    setTimeout(() => {
      sidebarItemRefs.value[0]?.focus();
    }, 50);
  });
});

onUnmounted(() => {
  ipcRenderer?.send('settings-panel:focus-changed', false);
});
</script>

<style scoped>
.settings-shell {
  position: relative;
  z-index: 1;
  min-height: calc(100vh - 66px);
  display: flex;
  flex-direction: column;
  margin-top: 8px;
  border-radius: 28px;
  overflow: hidden;
  background: rgba(15, 21, 28, 0.88);
  border: 1px solid rgba(125, 146, 168, 0.16);
  box-shadow: 0 30px 70px rgba(0, 0, 0, 0.36);
  backdrop-filter: blur(18px);
}

.settings-header {
  display: flex;
  align-items: center;
  gap: 18px;
  padding: 24px 28px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  background: rgba(29, 28, 27, 0.92);
}

.back-button,
.sidebar-item,
.mode-option {
  border: none;
  cursor: pointer;
  color: inherit;
}

.back-button {
  padding: 10px 16px;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.04);
  color: rgba(241, 245, 248, 0.92);
  font-size: 14px;
}

.settings-title {
  margin: 0;
  font-size: 22px;
  font-weight: 700;
  letter-spacing: 0.08em;
}

.settings-body {
  flex: 1;
  display: grid;
  grid-template-columns: 200px minmax(0, 1fr);
  min-height: 0;
}

.settings-content {
  padding: 20px;
  background: rgba(37, 45, 58, 0.92);
}

.settings-card {
  min-height: 100%;
  padding: 24px 28px;
  border-radius: 18px;
  background: rgba(28, 28, 28, 0.96);
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.04);
  transition: box-shadow 0.3s ease, border-color 0.3s ease;
}

.settings-card.is-secondary-focused {
  box-shadow: inset 0 0 0 2px rgba(42, 149, 232, 0.6), 0 0 20px rgba(42, 149, 232, 0.15);
}

@media (max-width: 980px) {
  .settings-shell {
    min-height: calc(100vh - 44px);
  }

  .settings-body {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 720px) {
  .settings-header,
  .settings-content,
  .settings-card {
    padding-left: 18px;
    padding-right: 18px;
  }

  .setting-row {
    grid-template-columns: 1fr;
  }

  .setting-select {
    width: 100%;
    min-width: 0;
  }

  .mode-toggle {
    width: 100%;
    justify-content: space-between;
  }
}
</style>
