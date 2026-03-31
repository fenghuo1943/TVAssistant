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
        <section v-if="activeMenu === 'general'" class="settings-card" role="tabpanel" id="panel-general" aria-labelledby="settings-title">
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

        <section v-else-if="activeMenu === 'site-management'" class="settings-card" role="tabpanel" id="panel-site-management" aria-labelledby="settings-title">
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

        <section v-else class="settings-card settings-placeholder" role="tabpanel">
          <div class="placeholder-title">{{ currentMenuLabel }}</div>
          <div class="placeholder-desc">该页面内容稍后添加。</div>
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

// 焦点状态管理
const focusedSidebarIndex = ref(0);
const focusedContentIndex = ref(-1); // -1 表示未聚焦内容区，0 表示聚焦到按钮
const modeFocusedIndex = ref(0);
const focusedSiteIndex = ref(0); // 网址管理页面的焦点索引
const focusedButtonIndex = ref(-1); // -1 表示未聚焦按钮，>=0 表示聚焦到具体网址项的按钮

// 引用元素
const settingsShellRef = ref<HTMLElement | null>(null);
const sidebarItemRefs = ref<HTMLButtonElement[]>([]);
const backButtonRef = ref<HTMLButtonElement | null>(null);
const launchModuleSelectRef = ref<HTMLSelectElement | null>(null);
const startAtLoginSwitchRef = ref<HTMLButtonElement | null>(null);
const gameModeOptionRef = ref<HTMLButtonElement | null>(null);
const tvModeOptionRef = ref<HTMLButtonElement | null>(null);
const siteItemRefs = ref<HTMLDivElement[]>([]);

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
        // 移动到上一个按钮
        if (focusedButtonIndex.value > 0) {
          focusedButtonIndex.value = focusedButtonIndex.value - 1;
          nextTick(() => {
            const button = siteItemRefs.value[focusedButtonIndex.value]?.querySelector('.action-button') as HTMLButtonElement | null;
            button?.focus();
          });
        } else {
          // 回到侧边栏，保持当前选中的菜单项
          focusedButtonIndex.value = -1;
          const currentMenuIndex = menuItems.findIndex(item => item.key === props.activeMenu);
          focusSidebar(currentMenuIndex >= 0 ? currentMenuIndex : 0);
        }
        return;
      }
      
      if (key === 'ArrowDown') {
        event.preventDefault();
        // 移动到下一个按钮
        if (focusedButtonIndex.value < availableShortcuts.value.length - 1) {
          focusedButtonIndex.value = focusedButtonIndex.value + 1;
          nextTick(() => {
            const button = siteItemRefs.value[focusedButtonIndex.value]?.querySelector('.action-button') as HTMLButtonElement | null;
            button?.focus();
          });
        } else {
          // 回到侧边栏，保持当前选中的菜单项
          focusedButtonIndex.value = -1;
          const currentMenuIndex = menuItems.findIndex(item => item.key === props.activeMenu);
          focusSidebar(currentMenuIndex >= 0 ? currentMenuIndex : 0);
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
      if (focusedSiteIndex.value > 0) {
        focusSite(focusedSiteIndex.value - 1);
      } else {
        // 回到侧边栏，保持当前选中的菜单项
        const currentMenuIndex = menuItems.findIndex(item => item.key === props.activeMenu);
        focusSidebar(currentMenuIndex >= 0 ? currentMenuIndex : 0);
      }
      return;
    }
    
    if (key === 'ArrowDown') {
      event.preventDefault();
      if (focusedSiteIndex.value < availableShortcuts.value.length - 1) {
        focusSite(focusedSiteIndex.value + 1);
      } else {
        // 回到侧边栏，保持当前选中的菜单项
        const currentMenuIndex = menuItems.findIndex(item => item.key === props.activeMenu);
        focusSidebar(currentMenuIndex >= 0 ? currentMenuIndex : 0);
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
