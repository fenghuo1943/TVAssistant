<template>
  <section class="settings-shell" ref="settingsShellRef" tabindex="0" @keydown="handleKeydown" role="application" aria-label="设置面板">
    <header class="settings-header">
      <button type="button" class="back-button" ref="backButtonRef" @click="$emit('back')" aria-label="返回上一页">
        ← 返回
      </button>
      <h1 class="settings-title" id="settings-title">设置</h1>
    </header>

    <div class="settings-body">
      <aside class="settings-sidebar" aria-label="设置分类" role="tablist" aria-labelledby="settings-title">
        <button
          v-for="(item, index) in menuItems"
          :key="item.key"
          type="button"
          class="sidebar-item"
          :class="{ 'is-active': activeMenu === item.key, 'is-focused': focusedSidebarIndex === index }"
          :tabindex="focusedSidebarIndex === index ? 0 : -1"
          :ref="(el) => setSidebarItemRef(el as HTMLButtonElement, index)"
          @click="$emit('select-menu', item.key)"
          role="tab"
          :aria-selected="activeMenu === item.key"
          :aria-label="`打开${item.label}设置`"
          :aria-controls="`panel-${item.key}`"
        >
          {{ item.label }}
        </button>
      </aside>

      <div class="settings-content" role="presentation">
        <section v-if="activeMenu === 'general'" class="settings-card" :class="{ 'is-secondary-focused': isSecondaryFocused }" role="tabpanel" id="panel-general" aria-labelledby="settings-title">
          <div class="setting-row">
            <div class="setting-copy">
              <div class="setting-label" id="launch-module-label">打开应用后直接启动</div>
              <div class="setting-desc">选择后可在启动应用时直接进入对应模块。</div>
            </div>
            <select
              class="setting-select"
              :value="settings.launchModuleId"
              @change="handleLaunchModuleChange"
              ref="launchModuleSelectRef"
              :class="{ 'is-focused': focusedContentIndex === 0 }"
              :tabindex="focusedContentIndex === 0 ? 0 : -1"
              aria-labelledby="launch-module-label"
            >
              <option v-for="option in launchModuleOptions" :key="option.id || 'none'" :value="option.id">
                {{ option.name }}
              </option>
            </select>
          </div>

          <div class="setting-row">
            <div class="setting-copy">
              <div class="setting-label" id="start-at-login-label">应用开机自启动</div>
              <div class="setting-desc">开启后会在系统登录时自动启动应用。</div>
            </div>
            <button
              type="button"
              class="switch-button"
              :class="{ 'is-on': settings.startAtLogin, 'is-focused': focusedContentIndex === 1 }"
              :aria-pressed="settings.startAtLogin"
              :tabindex="focusedContentIndex === 1 ? 0 : -1"
              ref="startAtLoginSwitchRef"
              @click="$emit('update-setting', { startAtLogin: !settings.startAtLogin })"
              aria-labelledby="start-at-login-label"
            >
              <span class="switch-knob" />
            </button>
          </div>

          <div class="setting-row">
            <div class="setting-copy">
              <div class="setting-label">主页模式</div>
              <div class="setting-desc">当前可切换电视模式和游戏模式，游戏模式页面后续补充。</div>
            </div>
            <div class="mode-toggle" role="tablist" aria-label="主页模式">
              <button
                type="button"
                class="mode-option"
                :class="{ 'is-active': settings.homeMode === 'game', 'is-focused': focusedContentIndex === 2 && modeFocusedIndex === 0 }"
                :tabindex="focusedContentIndex === 2 && modeFocusedIndex === 0 ? 0 : -1"
                ref="gameModeOptionRef"
                @click="$emit('update-setting', { homeMode: 'game' })"
              >
                游戏模式
              </button>
              <button
                type="button"
                class="mode-option"
                :class="{ 'is-active': settings.homeMode === 'tv', 'is-focused': focusedContentIndex === 2 && modeFocusedIndex === 1 }"
                :tabindex="focusedContentIndex === 2 && modeFocusedIndex === 1 ? 0 : -1"
                ref="tvModeOptionRef"
                @click="$emit('update-setting', { homeMode: 'tv' })"
              >
                电视模式
              </button>
            </div>
          </div>
        </section>

        <section v-else-if="activeMenu === 'site-management'" class="settings-card" :class="{ 'is-secondary-focused': isSecondaryFocused }" role="tabpanel" id="panel-site-management" aria-labelledby="settings-title">
          <div class="site-list">
            <div
              v-for="(site, index) in availableShortcuts"
              :key="site.url"
              class="site-item"
              :class="{ 'is-focused': focusedSiteIndex === index }"
              :ref="(el) => setSiteItemRef(el as HTMLDivElement, index)"
              :tabindex="focusedSiteIndex === index ? 0 : -1"
            >
              <div class="site-info">
                <span class="site-icon">{{ getSiteIcon(site.name) }}</span>
                <span class="site-name">{{ site.name }}</span>
              </div>
              <div class="site-status">
                <span class="status-text" :class="site.isEnabled ? 'is-enabled' : 'is-disabled'">
                  {{ site.isEnabled ? '已添加' : '未添加' }}
                </span>
                <button
                  type="button"
                  class="action-button"
                  :class="[site.isEnabled ? 'remove' : 'add', { 'is-focused': focusedButtonIndex === index }]"
                  :tabindex="focusedButtonIndex === index ? 0 : -1"
                  @click.stop="toggleSite(site)"
                >
                  {{ site.isEnabled ? '移除' : '添加' }}
                </button>
              </div>
            </div>
          </div>
        </section>

        <section v-else-if="activeMenu === 'add-site'" class="settings-card" :class="{ 'is-secondary-focused': isSecondaryFocused }" role="tabpanel" id="panel-add-site" aria-labelledby="settings-title">
          <div class="add-site-form">
            <div class="form-header">
              <h2 class="form-title">添加新网址</h2>
              <span class="form-hint">需要用鼠标键盘</span>
            </div>

            <div class="form-row">
              <label class="form-label" for="site-name-input" id="site-name-label">网站名称</label>
              <input
                id="site-name-input"
                ref="siteNameInputRef"
                type="text"
                class="form-input"
                :class="{ 'is-focused': focusedInputIndex === 0, 'is-error': errors.name }"
                placeholder="例如：优酷"
                v-model="formData.name"
                :tabindex="focusedInputIndex === 0 ? 0 : -1"
                aria-labelledby="site-name-label"
                :aria-invalid="errors.name ? 'true' : 'false'"
                @focus="focusedInputIndex = 0"
                @blur="validateName"
              />
              <div v-if="errors.name" class="form-error" role="alert">
                {{ errors.name }}
              </div>
            </div>

            <div class="form-row">
              <label class="form-label" for="site-url-input" id="site-url-label">网址</label>
              <input
                id="site-url-input"
                ref="siteUrlInputRef"
                type="text"
                class="form-input"
                :class="{ 'is-focused': focusedInputIndex === 1, 'is-error': errors.url }"
                placeholder="https:// 开头"
                v-model="formData.url"
                :tabindex="focusedInputIndex === 1 ? 0 : -1"
                aria-labelledby="site-url-label"
                :aria-invalid="errors.url ? 'true' : 'false'"
                @focus="focusedInputIndex = 1"
                @blur="validateUrl"
              />
              <div v-if="errors.url" class="form-error" role="alert">
                {{ errors.url }}
              </div>
            </div>

            <div class="form-actions">
              <button
                type="button"
                class="action-btn confirm-btn"
                :class="{ 'is-focused': focusedButtonIndex === 0 }"
                :tabindex="focusedButtonIndex === 0 ? 0 : -1"
                ref="confirmBtnRef"
                @click="handleSubmit"
                @focus="focusedButtonIndex = 0"
              >
                确认添加
              </button>
              <button
                type="button"
                class="action-btn cancel-btn"
                :class="{ 'is-focused': focusedButtonIndex === 1 }"
                :tabindex="focusedButtonIndex === 1 ? 0 : -1"
                ref="cancelBtnRef"
                @click="handleCancel"
                @focus="focusedButtonIndex = 1"
              >
                取消
              </button>
            </div>

            <div v-if="submitMessage" class="form-message" :class="submitMessageType" role="status">
              {{ submitMessage }}
            </div>
          </div>
        </section>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { computed, nextTick, onMounted, onUnmounted, ref } from 'vue';
import { defaultShortcuts, launchModuleOptions, type AppSettings, type Shortcut } from '../settings.ts';
import type { IpcRenderer } from '../plugins/types.ts';
import { showError } from '../utils/errorHandler.ts';

const ipcRenderer = ((window as typeof window & { require?: (moduleName: string) => { ipcRenderer?: IpcRenderer } })
  .require?.('electron')?.ipcRenderer ?? null) as IpcRenderer | null;

type SettingsMenuKey = 'general' | 'site-management' | 'add-site' | 'add-local-app' | 'wallpaper';

type SiteItem = {
  name: string;
  url: string;
  isEnabled: boolean;
};

const props = defineProps<{
  activeMenu: SettingsMenuKey;
  settings: AppSettings;
}>();

const emit = defineEmits<{
  back: [];
  'select-menu': [menu: SettingsMenuKey];
  'update-setting': [value: Partial<AppSettings>];
}>();

// 计算可用的快捷方式列表
const availableShortcuts = computed<SiteItem[]>(() => {
  return defaultShortcuts.map(shortcut => ({
    name: shortcut.name,
    url: shortcut.url,
    isEnabled: props.settings.enabledShortcuts.includes(shortcut.url)
  }));
});

const menuItems: Array<{ key: SettingsMenuKey; label: string }> = [
  { key: 'general', label: '常规' },
  { key: 'site-management', label: '网址管理' },
  { key: 'add-site', label: '添加新网址' },
  { key: 'add-local-app', label: '添加本地应用' },
  { key: 'wallpaper', label: '壁纸设置' }
];

const currentMenuLabel = computed(() => {
  return menuItems.find((item) => item.key === props.activeMenu)?.label ?? '';
});

// 判断是否聚焦在第二级选项上（内容区）
const isSecondaryFocused = computed(() => {
  // 如果焦点在侧边栏，不显示高亮
  if (focusedSidebarIndex.value >= 0) {
    return false;
  }
  
  // 检查各个页面的焦点状态
  switch (props.activeMenu) {
    case 'general':
      // 常规设置页面：焦点在内容区控件上
      return focusedContentIndex.value >= 0;
    case 'site-management':
      // 网址管理页面：焦点在网址项或按钮上
      return focusedSiteIndex.value >= 0 || focusedButtonIndex.value >= 0;
    case 'add-site':
      // 添加新网址页面：焦点在输入框或按钮上
      return focusedInputIndex.value >= 0 || focusedButtonIndex.value >= 0;
    default:
      return false;
  }
});

// 焦点状态管理
const focusedSidebarIndex = ref(0);
const focusedContentIndex = ref(-1); // -1 表示未聚焦内容区，0 表示聚焦到按钮
const modeFocusedIndex = ref(0);
const focusedSiteIndex = ref(0); // 网址管理页面的焦点索引
const focusedButtonIndex = ref(-1); // -1 表示未聚焦按钮，>=0 表示聚焦到具体网址项的按钮
const focusedInputIndex = ref(-1); // -1 表示未聚焦输入框，0 表示名称输入框，1 表示 URL 输入框

// 引用元素
const settingsShellRef = ref<HTMLElement | null>(null);
const sidebarItemRefs = ref<HTMLButtonElement[]>([]);
const backButtonRef = ref<HTMLButtonElement | null>(null);
const launchModuleSelectRef = ref<HTMLSelectElement | null>(null);
const startAtLoginSwitchRef = ref<HTMLButtonElement | null>(null);
const gameModeOptionRef = ref<HTMLButtonElement | null>(null);
const tvModeOptionRef = ref<HTMLButtonElement | null>(null);
const siteItemRefs = ref<HTMLDivElement[]>([]);
const siteNameInputRef = ref<HTMLInputElement | null>(null);
const siteUrlInputRef = ref<HTMLInputElement | null>(null);
const confirmBtnRef = ref<HTMLButtonElement | null>(null);
const cancelBtnRef = ref<HTMLButtonElement | null>(null);

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

function focusSidebar(index: number) {
  const total = menuItems.length;
  focusedSidebarIndex.value = (index + total) % total;
  focusedContentIndex.value = -1;
  focusedButtonIndex.value = -1; // 重置按钮焦点
  
  const selectedMenuKey = menuItems[focusedSidebarIndex.value].key;
  
  // 自动切换到选中的菜单
  emit('select-menu', selectedMenuKey);
  
  // 重置网址管理页面的焦点索引，但不立即聚焦
  if (selectedMenuKey === 'site-management') {
    focusedSiteIndex.value = 0;
  }
  
  nextTick(() => {
    sidebarItemRefs.value[focusedSidebarIndex.value]?.focus();
  });
}

function focusContent(index: number) {
  focusedContentIndex.value = index;
  focusedSidebarIndex.value = -1;
  
  nextTick(() => {
    if (index === 0) {
      launchModuleSelectRef.value?.focus();
    } else if (index === 1) {
      startAtLoginSwitchRef.value?.focus();
    } else if (index === 2) {
      if (modeFocusedIndex.value === 0) {
        gameModeOptionRef.value?.focus();
      } else {
        tvModeOptionRef.value?.focus();
      }
    }
  });
}

function focusSite(index: number) {
  const total = availableShortcuts.value.length;
  focusedSiteIndex.value = (index + total) % total;
  focusedContentIndex.value = -1;
  focusedButtonIndex.value = -1; // 重置按钮焦点
  focusedSidebarIndex.value = -1; // 离开侧边栏，进入内容区
  
  nextTick(() => {
    const element = siteItemRefs.value[focusedSiteIndex.value];
    if (element) {
      element.focus();
      // 滚动到可视区域
      element.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  });
}

function getSiteIcon(name: string): string {
  const iconMap: Record<string, string> = {
    'TV 直播': '📺',
    '央视片库': '🎬',
    '抖音': '🎵',
    '腾讯视频': '🎞️'
  };
  return iconMap[name] || '🌐';
}

function toggleSite(site: SiteItem) {
  const currentUrls = props.settings.enabledShortcuts;
  let newUrls: string[];
  
  if (site.isEnabled) {
    // 移除
    newUrls = currentUrls.filter(url => url !== site.url);
  } else {
    // 添加
    newUrls = [...currentUrls, site.url];
  }
  
  emit('update-setting', { enabledShortcuts: newUrls });
}

// 添加新网址表单数据
const formData = ref({
  name: '',
  url: ''
});

const errors = ref({
  name: '',
  url: ''
});

const submitMessage = ref('');
const submitMessageType = ref<'success' | 'error'>('success');

function validateName(): boolean {
  const name = formData.value.name.trim();
  
  if (!name) {
    errors.value.name = '请输入网站名称';
    return false;
  }
  
  if (name.length > 20) {
    errors.value.name = '网站名称不能超过 20 个字符';
    return false;
  }
  
  // 检查是否已存在同名网站
  const existingShortcut = defaultShortcuts.find(s => s.name === name);
  if (existingShortcut) {
    errors.value.name = '该网站名称已存在';
    return false;
  }
  
  errors.value.name = '';
  return true;
}

function validateUrl(): boolean {
  const url = formData.value.url.trim();
  
  if (!url) {
    errors.value.url = '请输入网址';
    return false;
  }
  
  if (!url.startsWith('https://')) {
    errors.value.url = '网址必须以 https:// 开头';
    return false;
  }
  
  try {
    new URL(url);
  } catch {
    errors.value.url = '请输入有效的网址格式';
    return false;
  }
  
  // 检查是否已存在相同网址
  const existingShortcut = defaultShortcuts.find(s => s.url === url);
  if (existingShortcut) {
    errors.value.url = '该网址已存在';
    return false;
  }
  
  errors.value.url = '';
  return true;
}

function validateForm(): boolean {
  const isNameValid = validateName();
  const isUrlValid = validateUrl();
  
  return isNameValid && isUrlValid;
}

function handleSubmit() {
  submitMessage.value = '';
  
  if (!validateForm()) {
    submitMessageType.value = 'error';
    submitMessage.value = '请修正表单中的错误';
    return;
  }
  
  // 添加到默认快捷方式列表
  const newShortcut: Shortcut = {
    name: formData.value.name.trim(),
    badge: formData.value.name.trim().toUpperCase().slice(0, 4),
    url: formData.value.url.trim(),
    theme: 'theme-custom'
  };
  
  defaultShortcuts.push(newShortcut);
  
  // 自动启用该快捷方式
  const newUrls = [...props.settings.enabledShortcuts, newShortcut.url];
  emit('update-setting', { enabledShortcuts: newUrls });
  
  // 显示成功消息
  submitMessageType.value = 'success';
  submitMessage.value = `已成功添加 ${newShortcut.name}`;
  
  // 清空表单
  formData.value = {
    name: '',
    url: ''
  };
  errors.value = {
    name: '',
    url: ''
  };
  
  // 重置焦点到第一个输入框
  nextTick(() => {
    siteNameInputRef.value?.focus();
    focusedInputIndex.value = 0;
    focusedButtonIndex.value = -1;
  });
}

function handleCancel() {
  formData.value = {
    name: '',
    url: ''
  };
  errors.value = {
    name: '',
    url: ''
  };
  submitMessage.value = '';
  
  nextTick(() => {
    siteNameInputRef.value?.focus();
    focusedInputIndex.value = 0;
    focusedButtonIndex.value = -1;
  });
}

function handleKeydown(event: KeyboardEvent) {
  const { key } = event;
  
  // 如果在侧边栏
  if (focusedSidebarIndex.value >= 0) {
    if (key === 'ArrowUp') {
      event.preventDefault();
      focusSidebar(focusedSidebarIndex.value - 1);
      return;
    }
    
    if (key === 'ArrowDown') {
      event.preventDefault();
      focusSidebar(focusedSidebarIndex.value + 1);
      return;
    }
    
    if (key === 'ArrowRight') {
      event.preventDefault();
      // 切换到内容区的第一个选项
      const currentMenuKey = menuItems[focusedSidebarIndex.value].key;
      if (currentMenuKey === 'general') {
        focusContent(0);
      } else if (currentMenuKey === 'site-management') {
        focusSite(0);
      } else if (currentMenuKey === 'add-site') {
        // 添加新网址页面，聚焦到第一个输入框
        focusedSidebarIndex.value = -1;
        focusedInputIndex.value = 0;
        nextTick(() => {
          siteNameInputRef.value?.focus();
        });
      }
      return;
    }
    
    if (key === 'Enter') {
      event.preventDefault();
      // 按回车时切换到内容区的第一个选项
      const currentMenuKey = menuItems[focusedSidebarIndex.value].key;
      if (currentMenuKey === 'general') {
        focusContent(0);
      } else if (currentMenuKey === 'site-management') {
        focusSite(0);
      } else if (currentMenuKey === 'add-site') {
        // 添加新网址页面，聚焦到第一个输入框
        focusedSidebarIndex.value = -1;
        focusedInputIndex.value = 0;
        nextTick(() => {
          siteNameInputRef.value?.focus();
        });
      }
      return;
    }
    
    return;
  }
  
  // 如果在网址管理页面
  if (props.activeMenu === 'site-management' && focusedSiteIndex.value >= 0) {
    // 如果焦点在按钮上
    if (focusedButtonIndex.value >= 0) {
      if (key === 'ArrowLeft') {
        event.preventDefault();
        // 回到网址项
        focusedButtonIndex.value = -1;
        nextTick(() => {
          siteItemRefs.value[focusedSiteIndex.value]?.focus();
        });
        return;
      }
      
      if (key === 'ArrowUp') {
        event.preventDefault();
        // 在按钮之间向上移动
        if (focusedButtonIndex.value > 0) {
          // 移动到上一个按钮
          focusedButtonIndex.value = focusedButtonIndex.value - 1;
          nextTick(() => {
            const button = siteItemRefs.value[focusedButtonIndex.value]?.querySelector('.action-button') as HTMLButtonElement | null;
            button?.focus();
          });
        } else {
          // 从第一个按钮移动到上一个网址项
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
        // 在按钮之间向下移动
        if (focusedButtonIndex.value < availableShortcuts.value.length - 1) {
          // 移动到下一个按钮
          focusedButtonIndex.value = focusedButtonIndex.value + 1;
          nextTick(() => {
            const button = siteItemRefs.value[focusedButtonIndex.value]?.querySelector('.action-button') as HTMLButtonElement | null;
            button?.focus();
          });
        } else {
          // 从最后一个按钮移动到下一个网址项
          focusedButtonIndex.value = -1;
          focusedSiteIndex.value = availableShortcuts.value.length - 1;
          nextTick(() => {
            siteItemRefs.value[focusedSiteIndex.value]?.focus();
          });
        }
        return;
      }
      
      if (key === 'Enter') {
        event.preventDefault();
        // 触发当前聚焦按钮的点击
        const currentSite = availableShortcuts.value[focusedButtonIndex.value];
        toggleSite(currentSite);
        return;
      }
      
      return;
    }
    
    // 焦点在网址项上
    if (key === 'ArrowUp') {
      event.preventDefault();
      // 在网址项之间向上循环移动
      if (focusedSiteIndex.value > 0) {
        // 移动到上一个网址项
        focusedSiteIndex.value = focusedSiteIndex.value - 1;
        nextTick(() => {
          siteItemRefs.value[focusedSiteIndex.value]?.focus();
        });
      } else if (availableShortcuts.value.length > 1) {
        // 从第一个网址项循环到最后一个网址项
        focusedSiteIndex.value = availableShortcuts.value.length - 1;
        nextTick(() => {
          siteItemRefs.value[focusedSiteIndex.value]?.focus();
        });
      }
      return;
    }
    
    if (key === 'ArrowDown') {
      event.preventDefault();
      // 在网址项之间向下循环移动
      if (focusedSiteIndex.value < availableShortcuts.value.length - 1) {
        // 移动到下一个网址项
        focusedSiteIndex.value = focusedSiteIndex.value + 1;
        nextTick(() => {
          siteItemRefs.value[focusedSiteIndex.value]?.focus();
        });
      } else if (availableShortcuts.value.length > 1) {
        // 从最后一个网址项循环到第一个网址项
        focusedSiteIndex.value = 0;
        nextTick(() => {
          siteItemRefs.value[focusedSiteIndex.value]?.focus();
        });
      }
      return;
    }
    
    if (key === 'ArrowLeft') {
      event.preventDefault();
      // 回到侧边栏，保持当前选中的菜单项
      const currentMenuIndex = menuItems.findIndex(item => item.key === props.activeMenu);
      focusSidebar(currentMenuIndex >= 0 ? currentMenuIndex : 0);
      return;
    }
    
    if (key === 'ArrowRight') {
      event.preventDefault();
      // 聚焦到当前项的添加/移除按钮
      focusedButtonIndex.value = focusedSiteIndex.value;
      nextTick(() => {
        const button = siteItemRefs.value[focusedButtonIndex.value]?.querySelector('.action-button') as HTMLButtonElement | null;
        button?.focus();
      });
      return;
    }
    
    if (key === 'Enter') {
      event.preventDefault();
      // 触发当前聚焦项的按钮点击
      const currentSite = availableShortcuts.value[focusedSiteIndex.value];
      toggleSite(currentSite);
      return;
    }
    
    return;
  }
  
  // 如果在添加新网址页面
  if (props.activeMenu === 'add-site') {
    // 如果焦点在输入框上
    if (focusedInputIndex.value >= 0) {
      if (key === 'ArrowUp') {
        event.preventDefault();
        // 在输入框之间向上移动
        if (focusedInputIndex.value > 0) {
          // 从 URL 输入框移动到名称输入框
          focusedInputIndex.value = focusedInputIndex.value - 1;
          nextTick(() => {
            if (focusedInputIndex.value === 0) {
              siteNameInputRef.value?.focus();
            }
          });
        }
        // 在名称输入框时按↑键，不执行任何操作（仅阻止默认行为）
        return;
      }
      
      if (key === 'ArrowDown') {
        event.preventDefault();
        if (focusedInputIndex.value < 1) {
          // 移动到下一个输入框
          focusedInputIndex.value = focusedInputIndex.value + 1;
          nextTick(() => {
            if (focusedInputIndex.value === 1) {
              siteUrlInputRef.value?.focus();
            }
          });
        } else {
          // 移动到按钮
          focusedInputIndex.value = -1;
          focusedButtonIndex.value = 0;
          nextTick(() => {
            confirmBtnRef.value?.focus();
          });
        }
        return;
      }
      
      if (key === 'ArrowLeft') {
        event.preventDefault();
        // 回到侧边栏
        const currentMenuIndex = menuItems.findIndex(item => item.key === props.activeMenu);
        focusSidebar(currentMenuIndex >= 0 ? currentMenuIndex : 0);
        return;
      }
      
      if (key === 'Tab') {
        event.preventDefault();
        // Tab 键切换焦点
        if (focusedInputIndex.value === 0) {
          focusedInputIndex.value = 1;
          nextTick(() => {
            siteUrlInputRef.value?.focus();
          });
        } else if (focusedInputIndex.value === 1) {
          focusedInputIndex.value = -1;
          focusedButtonIndex.value = 0;
          nextTick(() => {
            confirmBtnRef.value?.focus();
          });
        } else {
          focusedButtonIndex.value = focusedButtonIndex.value === 0 ? 1 : 0;
          nextTick(() => {
            if (focusedButtonIndex.value === 0) {
              confirmBtnRef.value?.focus();
            } else {
              cancelBtnRef.value?.focus();
            }
          });
        }
        return;
      }
      
      if (key === 'Enter') {
        event.preventDefault();
        // 在输入框按回车，移动到下一个输入框或提交
        if (focusedInputIndex.value === 0) {
          focusedInputIndex.value = 1;
          nextTick(() => {
            siteUrlInputRef.value?.focus();
          });
        } else if (focusedInputIndex.value === 1) {
          handleSubmit();
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
          focusedButtonIndex.value = focusedButtonIndex.value - 1;
          nextTick(() => {
            if (focusedButtonIndex.value === 0) {
              confirmBtnRef.value?.focus();
            }
          });
        } else {
          // 回到输入框
          focusedButtonIndex.value = -1;
          focusedInputIndex.value = 1;
          nextTick(() => {
            siteUrlInputRef.value?.focus();
          });
        }
        return;
      }
      
      if (key === 'ArrowRight') {
        event.preventDefault();
        if (focusedButtonIndex.value < 1) {
          focusedButtonIndex.value = focusedButtonIndex.value + 1;
          nextTick(() => {
            if (focusedButtonIndex.value === 1) {
              cancelBtnRef.value?.focus();
            }
          });
        } else {
          // 回到输入框
          focusedButtonIndex.value = -1;
          focusedInputIndex.value = 1;
          nextTick(() => {
            siteUrlInputRef.value?.focus();
          });
        }
        return;
      }
      
      if (key === 'ArrowUp') {
        event.preventDefault();
        // 在按钮之间向上移动或回到输入框
        if (focusedButtonIndex.value > 0) {
          // 从取消按钮移动到确认按钮
          focusedButtonIndex.value = focusedButtonIndex.value - 1;
          nextTick(() => {
            if (focusedButtonIndex.value === 0) {
              confirmBtnRef.value?.focus();
            }
          });
        } else {
          // 从确认按钮回到输入框
          focusedButtonIndex.value = -1;
          focusedInputIndex.value = 1;
          nextTick(() => {
            siteUrlInputRef.value?.focus();
          });
        }
        return;
      }
      
      if (key === 'ArrowDown') {
        event.preventDefault();
        // 在按钮之间向下移动
        if (focusedButtonIndex.value < 1) {
          // 从确认按钮移动到取消按钮
          focusedButtonIndex.value = focusedButtonIndex.value + 1;
          nextTick(() => {
            if (focusedButtonIndex.value === 1) {
              cancelBtnRef.value?.focus();
            }
          });
        }
        // 在取消按钮时按↓键，不执行任何操作（仅阻止默认行为）
        return;
      }
      
      if (key === 'Enter') {
        event.preventDefault();
        if (focusedButtonIndex.value === 0) {
          handleSubmit();
        } else if (focusedButtonIndex.value === 1) {
          handleCancel();
        }
        return;
      }
      
      return;
    }
    
    // 默认回到侧边栏
    if (key === 'ArrowLeft') {
      event.preventDefault();
      const currentMenuIndex = menuItems.findIndex(item => item.key === props.activeMenu);
      focusSidebar(currentMenuIndex >= 0 ? currentMenuIndex : 0);
      return;
    }
  }
  
  // 如果在内容区（常规设置）
  if (focusedContentIndex.value >= 0) {
    if (key === 'ArrowUp') {
      event.preventDefault();
      if (focusedContentIndex.value > 0) {
        focusContent(focusedContentIndex.value - 1);
      } else {
        // 回到侧边栏
        focusSidebar(0);
      }
      return;
    }
    
    if (key === 'ArrowDown') {
      event.preventDefault();
      if (props.activeMenu === 'general') {
        if (focusedContentIndex.value < 2) {
          focusContent(focusedContentIndex.value + 1);
        } else {
          // 循环到第一个
          focusContent(0);
        }
      } else {
        // 其他页面只有一个占位符，回到侧边栏
        focusSidebar(0);
      }
      return;
    }
    
    if (key === 'ArrowLeft') {
      event.preventDefault();
      // 回到侧边栏
      focusSidebar(0);
      return;
    }
    
    if (key === 'ArrowRight') {
      event.preventDefault();
      // 如果在模式选择上，切换左右
      if (focusedContentIndex.value === 2) {
        modeFocusedIndex.value = modeFocusedIndex.value === 0 ? 1 : 0;
        nextTick(() => {
          if (modeFocusedIndex.value === 0) {
            gameModeOptionRef.value?.focus();
          } else {
            tvModeOptionRef.value?.focus();
          }
        });
      }
      return;
    }
    
    if (key === 'Enter') {
      event.preventDefault();
      // 触发当前聚焦元素的点击
      if (focusedContentIndex.value === 0) {
        launchModuleSelectRef.value?.showPicker?.();
      } else if (focusedContentIndex.value === 1) {
        emit('update-setting', { startAtLogin: !props.settings.startAtLogin });
      } else if (focusedContentIndex.value === 2) {
        if (modeFocusedIndex.value === 0) {
          emit('update-setting', { homeMode: 'game' });
        } else {
          emit('update-setting', { homeMode: 'tv' });
        }
      }
      return;
    }
    
    // 在模式选择内部左右切换
    if (focusedContentIndex.value === 2 && (key === 'ArrowLeft' || key === 'ArrowRight')) {
      event.preventDefault();
      modeFocusedIndex.value = key === 'ArrowLeft' ? 0 : 1;
      nextTick(() => {
        if (modeFocusedIndex.value === 0) {
          gameModeOptionRef.value?.focus();
        } else {
          tvModeOptionRef.value?.focus();
        }
      });
      return;
    }
  }
  
  // 默认行为：Backspace 返回
  if (key === 'Backspace' || key === 'Escape') {
    event.preventDefault();
    emit('back');
  }
}

function handleLaunchModuleChange(event: Event) {
  const nextValue = (event.target as HTMLSelectElement).value;

  emit('update-setting', {
    launchModuleId: nextValue,
    openModuleOnLaunch: nextValue !== ''
  });
}

onMounted(() => {
  // 通知主进程设置面板获得焦点
  ipcRenderer?.send('settings-panel:focus-changed', true);
  
  // 初始聚焦到整个设置面板容器
  nextTick(() => {
    settingsShellRef.value?.focus();
    // 然后聚焦到第一个侧边栏项
    setTimeout(() => {
      sidebarItemRefs.value[0]?.focus();
    }, 50);
  });
});

onUnmounted(() => {
  // 通知主进程设置面板失去焦点
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

.settings-sidebar {
  padding: 18px;
  background: rgba(29, 28, 27, 0.96);
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.sidebar-item {
  padding: 14px 16px;
  border-radius: 10px;
  background: transparent;
  text-align: left;
  font-size: 16px;
  color: rgba(223, 230, 236, 0.82);
  transition: background 0.2s ease, color 0.2s ease, transform 0.2s ease;
}

.sidebar-item:hover,
.sidebar-item:focus-visible,
.sidebar-item.is-active {
  background: linear-gradient(135deg, #2a95e8, #1882d8);
  color: #ffffff;
  transform: translateX(2px);
  outline: none;
}

.sidebar-item.is-focused {
  box-shadow: 0 0 0 3px rgba(42, 149, 232, 0.5);
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

.setting-row {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  gap: 24px;
  align-items: center;
  padding: 22px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

.setting-row:first-child {
  padding-top: 0;
}

.setting-row:last-child {
  border-bottom: none;
  padding-bottom: 0;
}

.setting-copy {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.setting-label {
  font-size: 18px;
  font-weight: 700;
  color: #f7fbff;
}

.setting-desc {
  font-size: 14px;
  color: rgba(210, 220, 230, 0.72);
}

.setting-select {
  min-width: 220px;
  padding: 12px 14px;
  border-radius: 12px;
  border: 1px solid rgba(79, 152, 209, 0.45);
  background: rgba(12, 20, 27, 0.9);
  color: #f4f8fb;
  font-size: 15px;
  outline: none;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

.setting-select.is-focused {
  border-color: rgba(42, 149, 232, 0.8);
  box-shadow: 0 0 0 3px rgba(42, 149, 232, 0.3);
}

.switch-button {
  position: relative;
  width: 66px;
  height: 36px;
  padding: 4px;
  border: none;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.24);
  cursor: pointer;
  transition: background 0.2s ease;
}

.switch-button.is-on {
  background: linear-gradient(135deg, #31a4f5, #1fb7cb);
}

.switch-button.is-focused {
  box-shadow: 0 0 0 3px rgba(42, 149, 232, 0.5);
}

.switch-knob {
  display: block;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: #ffffff;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.22);
  transition: transform 0.2s ease;
}

.switch-button.is-on .switch-knob {
  transform: translateX(30px);
}

.mode-toggle {
  display: inline-flex;
  padding: 4px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.08);
}

.mode-option {
  padding: 10px 18px;
  border-radius: 999px;
  background: transparent;
  color: rgba(220, 228, 235, 0.8);
  font-size: 14px;
}

.mode-option.is-active {
  background: linear-gradient(135deg, #63c26f, #2aa95d);
  color: #ffffff;
}

.mode-option.is-focused {
  box-shadow: 0 0 0 3px rgba(42, 149, 232, 0.5);
}

.settings-placeholder {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 12px;
  color: rgba(233, 239, 244, 0.82);
}

.site-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.site-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 20px;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.06);
  transition: background 0.2s ease, border-color 0.2s ease, transform 0.2s ease;
  outline: none;
}

.site-item:hover,
.site-item:focus-visible,
.site-item.is-focused {
  background: rgba(255, 255, 255, 0.06);
  border-color: rgba(42, 149, 232, 0.5);
  transform: translateX(2px);
}

.site-item.is-focused {
  box-shadow: 0 0 0 3px rgba(42, 149, 232, 0.3);
}

.site-info {
  display: flex;
  align-items: center;
  gap: 14px;
}

.site-icon {
  font-size: 24px;
  line-height: 1;
}

.site-name {
  font-size: 17px;
  font-weight: 600;
  color: rgba(247, 251, 255, 0.94);
}

.site-status {
  display: flex;
  align-items: center;
  gap: 12px;
}

.status-text {
  font-size: 14px;
  font-weight: 500;
}

.status-text.is-enabled {
  color: rgba(99, 194, 111, 0.92);
}

.status-text.is-disabled {
  color: rgba(210, 220, 230, 0.68);
}

.action-button {
  padding: 8px 18px;
  border: none;
  border-radius: 10px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease;
  outline: none;
}

.action-button.add {
  background: linear-gradient(135deg, #2a95e8, #1882d8);
  color: #ffffff;
}

.action-button.remove {
  background: rgba(255, 255, 255, 0.08);
  color: rgba(241, 245, 248, 0.92);
}

.action-button:hover,
.action-button:focus-visible,
.action-button.is-focused {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.action-button.add:hover,
.action-button.add:focus-visible,
.action-button.add.is-focused {
  background: linear-gradient(135deg, #3aa3f0, #1c90e8);
}

.action-button.remove:hover,
.action-button.remove:focus-visible,
.action-button.remove.is-focused {
  background: rgba(255, 255, 255, 0.12);
}

.placeholder-title {
  font-size: 24px;
  font-weight: 700;
}

.placeholder-desc {
  font-size: 15px;
  color: rgba(210, 220, 230, 0.68);
}

.add-site-form {
  display: flex;
  flex-direction: column;
  gap: 28px;
}

.form-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 8px;
}

.form-title {
  font-size: 20px;
  font-weight: 700;
  color: #f7fbff;
  margin: 0;
}

.form-hint {
  font-size: 13px;
  color: rgba(210, 220, 230, 0.68);
  font-weight: 500;
}

.form-row {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.form-label {
  font-size: 16px;
  font-weight: 600;
  color: rgba(247, 251, 255, 0.94);
}

.form-input {
  padding: 14px 18px;
  border-radius: 12px;
  border: 1px solid rgba(79, 152, 209, 0.45);
  background: rgba(12, 20, 27, 0.9);
  color: #f4f8fb;
  font-size: 15px;
  outline: none;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

.form-input::placeholder {
  color: rgba(210, 220, 230, 0.5);
}

.form-input.is-focused {
  border-color: rgba(42, 149, 232, 0.8);
  box-shadow: 0 0 0 3px rgba(42, 149, 232, 0.3);
}

.form-input.is-error {
  border-color: rgba(255, 59, 48, 0.8);
  box-shadow: 0 0 0 3px rgba(255, 59, 48, 0.2);
}

.form-error {
  font-size: 13px;
  color: rgba(255, 59, 48, 0.92);
  font-weight: 500;
  margin-top: -4px;
}

.form-actions {
  display: flex;
  gap: 14px;
  margin-top: 8px;
}

.action-btn {
  padding: 12px 28px;
  border: none;
  border-radius: 12px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  outline: none;
  position: relative;
}

.action-btn.confirm-btn {
  background: linear-gradient(135deg, rgba(99, 194, 111, 0.92), rgba(49, 164, 245, 0.92));
  color: #ffffff;
  box-shadow: 0 2px 8px rgba(49, 164, 245, 0.3);
}

.action-btn.cancel-btn {
  background: rgba(255, 59, 48, 0.9);
  color: #ffffff;
  box-shadow: 0 2px 8px rgba(255, 59, 48, 0.3);
}

.action-btn:hover,
.action-btn:focus-visible,
.action-btn.is-focused {
  transform: translateY(-2px) scale(1.02);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
}

.action-btn.confirm-btn:hover,
.action-btn.confirm-btn:focus-visible,
.action-btn.confirm-btn.is-focused {
  background: linear-gradient(135deg, rgba(79, 214, 91, 0.95), rgba(59, 174, 255, 0.95));
  box-shadow: 
    0 0 0 3px rgba(42, 149, 232, 0.4),
    0 8px 24px rgba(42, 149, 232, 0.4),
    0 0 40px rgba(42, 149, 232, 0.2);
}

.action-btn.cancel-btn:hover,
.action-btn.cancel-btn:focus-visible,
.action-btn.cancel-btn.is-focused {
  background: rgba(255, 79, 68, 0.95);
  box-shadow: 
    0 0 0 3px rgba(255, 59, 48, 0.4),
    0 8px 24px rgba(255, 59, 48, 0.4),
    0 0 40px rgba(255, 59, 48, 0.2);
}

.form-message {
  padding: 14px 18px;
  border-radius: 10px;
  font-size: 14px;
  font-weight: 600;
  text-align: center;
  margin-top: 8px;
}

.form-message.success {
  background: rgba(99, 194, 111, 0.15);
  color: rgba(99, 194, 111, 0.92);
  border: 1px solid rgba(99, 194, 111, 0.3);
}

.form-message.error {
  background: rgba(255, 59, 48, 0.15);
  color: rgba(255, 59, 48, 0.92);
  border: 1px solid rgba(255, 59, 48, 0.3);
}

@media (max-width: 980px) {
  .settings-shell {
    min-height: calc(100vh - 44px);
  }

  .settings-body {
    grid-template-columns: 1fr;
  }

  .settings-sidebar {
    flex-direction: row;
    flex-wrap: wrap;
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
