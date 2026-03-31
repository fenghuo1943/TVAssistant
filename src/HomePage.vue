<template>
  <main class="home-shell" :class="{ 'is-browser-open': !!appState.activeUrl }" tabindex="0" @keydown="handleKeydown" @keydown.capture="handleSettingsKeydown">
    <SettingsPanel
      v-if="appState.showSettings"
      :active-menu="appState.activeSettingsMenu"
      :settings="appState.settings"
      @back="closeSettings"
      @select-menu="appState.activeSettingsMenu = $event"
      @update-setting="saveSettings"
    />

    <HomeLanding
      v-else-if="!appState.activeUrl"
      :current-time="currentTime"
      :current-date="currentDate"
      :shortcuts="shortcuts"
      :selected-index="appState.selectedIndex"
      :set-card-ref="setCardRef"
      @open-settings="openSettings"
      @close-window="closeWindow"
      @open-site="openSite"
      @focus-card="appState.selectedIndex = $event"
    />

    <HomeBrowser
      v-else
      :active-url="appState.activeUrl"
      :set-back-button-ref="setBackButtonRef"
      :set-webview-ref="setWebviewRef"
      :show-live-menu="liveMenu.state.visible"
      :live-menu-groups="liveMenu.state.groups"
      :active-live-group-index="liveMenu.state.groupIndex"
      :active-live-column="liveMenu.state.column"
      :active-live-item-index="liveMenu.currentItemIndex.value"
      :live-menu-heading="liveMenu.heading.value"
      @browser-ready="handleBrowserReady"
      @go-home="goHome"
      @select-live-channel="selectLiveChannel"
    />
  </main>
</template>

<script lang="ts" setup>
import { computed, nextTick, onBeforeUnmount, onMounted, reactive } from 'vue';
import type { ComponentPublicInstance } from 'vue';
import HomeBrowser from './components/HomeBrowser.vue';
import HomeLanding from './components/HomeLanding.vue';
import SettingsPanel from './components/SettingsPanel.vue';
import { findBrowserPlugin } from './plugins/browserPlugins.ts';
import type { IpcRenderer, PluginConfig, BrowserPlugin } from './plugins/types.ts';
import { withRetry, showError, debounce, throttle } from './utils/errorHandler.ts';
import { 
  SETTINGS_MENU_KEYS, 
  DEFAULT_SHORTCUTS,
  type SettingsMenuKey 
} from './constants/index.ts';
import { 
  createRefManager, 
  createSingleRefManager
} from './utils/refManager.ts';
import { defaultSettings, type AppSettings, type Shortcut } from './settings.ts';

const ipcRenderer = ((window as typeof window & { require?: (moduleName: string) => { ipcRenderer?: IpcRenderer } })
  .require?.('electron')?.ipcRenderer ?? null) as IpcRenderer | null;

// 使用 useLiveMenu composable 管理直播菜单状态
import { useLiveMenu } from './composables/useLiveMenu.ts';
const liveMenu = useLiveMenu();

// 使用引用管理器
const cardRefManager = createRefManager<HTMLButtonElement>();
const backButtonRefManager = createSingleRefManager<HTMLButtonElement>();
const webviewRefManager = createSingleRefManager<Electron.WebviewTag>();

// 应用状态
const appState = reactive({
  now: new Date(),
  selectedIndex: 0,
  activeUrl: '',
  activeTitle: '',
  showSettings: false,
  activeSettingsMenu: SETTINGS_MENU_KEYS.GENERAL as SettingsMenuKey,
  settings: { ...defaultSettings } as AppSettings
});

// 插件相关状态（与 liveMenu 分离）
const pluginState = reactive({
  currentPluginId: '',
  currentPluginConfig: {} as PluginConfig
});

// 计时器和令牌
let timer: number | undefined;
let liveMenuFetchToken = 0;

const formatter = new Intl.DateTimeFormat('zh-CN', {
  month: 'long',
  day: 'numeric',
  weekday: 'long'
});

const shortcuts = computed(() => {
  return DEFAULT_SHORTCUTS.filter((shortcut: Shortcut) => 
    appState.settings.enabledShortcuts.includes(shortcut.url)
  );
});

const currentTime = computed(() =>
  appState.now.toLocaleTimeString('zh-CN', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  })
);

const activePlugin = computed(() => findBrowserPlugin(appState.activeUrl));
const currentDate = computed(() => formatter.format(appState.now));
const isLiveMenuAvailable = computed(() => activePlugin.value?.manifest.capabilities.liveMenu ?? false);
const currentLiveItems = computed(() => liveMenu.currentItems);
const currentLiveItemIndex = computed(() => liveMenu.currentItemIndex);
const liveMenuHeading = computed(() => liveMenu.heading);

function updateTime() {
  appState.now = new Date();
}

function openSettings() {
  appState.showSettings = true;
}

function closeSettings() {
  appState.showSettings = false;

  nextTick(() => {
    focusSelectedCard();
  });
}

function openSite(item: Shortcut) {
  appState.activeUrl = item.url;
  appState.activeTitle = item.name;
  appState.showSettings = false;
  liveMenu.close();
  liveMenu.currentChannel.value = '';
  pluginState.currentPluginId = '';
  pluginState.currentPluginConfig = {};

  nextTick(() => {
    backButtonRefManager.ref.value?.focus();
  });
}

function openConfiguredModule() {
  if (!appState.settings.openModuleOnLaunch || !appState.settings.launchModuleId) {
    return;
  }

  const targetShortcut = DEFAULT_SHORTCUTS.find((item: Shortcut) => item.url === appState.settings.launchModuleId);
  if (!targetShortcut) {
    return;
  }

  openSite(targetShortcut);
}

function goHome() {
  appState.activeUrl = '';
  appState.activeTitle = '';
  liveMenu.close();
  liveMenu.currentChannel.value = '';
  pluginState.currentPluginId = '';
  pluginState.currentPluginConfig = {};

  nextTick(() => {
    focusSelectedCard();
  });
}

function setCardRef(element: Element | null, index: number) {
  cardRefManager.setRef(element as HTMLButtonElement, index);
}

function setBackButtonRef(element: Element | ComponentPublicInstance | null) {
  backButtonRefManager.setRef(element as HTMLButtonElement | ComponentPublicInstance);
}

function setWebviewRef(element: Element | ComponentPublicInstance | null) {
  webviewRefManager.setRef(element as Electron.WebviewTag | ComponentPublicInstance);
}

function focusSelectedCard() {
  const card = cardRefManager.getRef(appState.selectedIndex);
  card?.focus();
}

function moveSelection(offset: number) {
  const total = shortcuts.value.length;
  if (total === 0) return;
  appState.selectedIndex = (appState.selectedIndex + offset + total) % total;
  focusSelectedCard();
}

function toggleLiveMenu() {
  if (!isLiveMenuAvailable.value) {
    return;
  }

  liveMenu.toggle();
}

function closeLiveMenu() {
  liveMenu.close();
}

function moveLiveMenuGroup(offset: number) {
  liveMenu.moveGroup(offset);
}

function moveLiveMenuItem(offset: number) {
  liveMenu.moveItem(offset);
}

function syncLiveChannelSelection(channelName: string) {
  liveMenu.syncChannel(channelName);
}

function applyLiveMenuGroups(data: { currentChannel?: string; 央视频道?: string[]; 卫视频道?: string[] }) {
  liveMenu.applyGroups(data);
}

async function loadPluginConfig(pluginId: string): Promise<PluginConfig> {
  try {
    return await withRetry(
      async () => {
        const response = await ipcRenderer?.invoke<PluginConfig>('plugin-config:get', pluginId);
        return response ?? {};
      },
      {
        message: `加载插件 ${pluginId} 配置失败`,
        retryable: true,
        maxRetries: 3
      }
    );
  } catch {
    showError(`无法加载插件配置，请检查网络连接`);
    return {};
  }
}

async function savePluginConfig(pluginId: string, config: PluginConfig): Promise<void> {
  try {
    pluginState.currentPluginConfig = config;
    await withRetry(
      async () => {
        await ipcRenderer?.invoke('plugin-config:set', pluginId, config);
      },
      {
        message: `保存插件 ${pluginId} 配置失败`,
        retryable: true,
        maxRetries: 3
      }
    );
  } catch (error) {
    showError(`保存插件配置失败，请稍后重试`);
    throw error;
  }
}

async function loadSettings(): Promise<void> {
  try {
    const response = await withRetry(
      async () => {
        return await ipcRenderer?.invoke<Partial<AppSettings>>('settings:get');
      },
      {
        message: '加载设置失败',
        retryable: true,
        maxRetries: 3
      }
    );
    appState.settings = {
      ...defaultSettings,
      ...response
    };
  } catch (error) {
    showError('无法加载设置，将使用默认配置');
    appState.settings = { ...defaultSettings };
  }
}

async function saveSettings(value: Partial<AppSettings>): Promise<void> {
  try {
    await withRetry(
      async () => {
        const response = await ipcRenderer?.invoke<Partial<AppSettings>>('settings:set', value);
        return response;
      },
      {
        message: '保存设置失败',
        retryable: true,
        maxRetries: 3
      }
    );
    
    // 更新本地状态
    appState.settings = {
      ...appState.settings,
      ...value
    };
    
    showError('设置已保存', { level: 'info' });
  } catch (error) {
    showError('保存设置失败，请稍后重试');
    throw error;
  }
}

async function ensureActivePluginReady(): Promise<BrowserPlugin | null> {
  const webview = webviewRefManager.ref.value;
  const plugin = activePlugin.value;
  if (!webview || !plugin) {
    return null;
  }

  if (pluginState.currentPluginId !== plugin.manifest.id) {
    pluginState.currentPluginConfig = {
      ...plugin.manifest.defaultConfig,
      ...(await loadPluginConfig(plugin.manifest.id))
    };
    pluginState.currentPluginId = plugin.manifest.id;
  }

  try {
    await webview.executeJavaScript(plugin.buildInitScript(pluginState.currentPluginConfig), true);
  } catch (error) {
    console.error(`初始化插件 ${plugin.manifest.id} 失败:`, error);
    return null;
  }

  return plugin;
}

async function fetchLiveMenuData(): Promise<void> {
  const webview = webviewRefManager.ref.value;
  const plugin = activePlugin.value;
  if (!webview || !plugin?.manifest.capabilities.liveMenu) {
    return;
  }

  const token = ++liveMenuFetchToken;

  try {
    await ensureActivePluginReady();
    const result = await webview.executeJavaScript(plugin.buildMenuDataScript(), true);

    if (token !== liveMenuFetchToken || !result) {
      return;
    }

    applyLiveMenuGroups(result as { currentChannel?: string; 央视频道?: string[]; 卫视频道?: string[] });
  } catch (error) {
    console.error(`获取插件 ${plugin.manifest.id} 菜单数据失败:`, error);
    applyLiveMenuGroups({});
  }
}

async function selectLiveChannel(channelName: string): Promise<void> {
  const webview = webviewRefManager.ref.value;
  const plugin = activePlugin.value;
  if (!webview || !plugin?.manifest.capabilities.liveMenu) {
    return;
  }

  try {
    syncLiveChannelSelection(channelName);
    await ensureActivePluginReady();

    const success = await webview.executeJavaScript(plugin.buildSelectChannelScript(channelName), true);

    if (success) {
      closeLiveMenu();
      window.setTimeout(() => {
        void fetchLiveMenuData();
      }, 1200);
    }
  } catch (error) {
    console.error(`插件 ${plugin.manifest.id} 切换频道失败:`, error);
  }
}

async function adjustActivePluginVolume(delta: number): Promise<void> {
  const webview = webviewRefManager.ref.value;
  const plugin = activePlugin.value;
  if (!webview || !plugin?.manifest.capabilities.volumeControl) {
    return;
  }

  try {
    await ensureActivePluginReady();
    const volume = await webview.executeJavaScript(plugin.buildAdjustVolumeScript(delta), true);

    if (typeof volume === 'number') {
      await savePluginConfig(plugin.manifest.id, {
        ...pluginState.currentPluginConfig,
        volume
      });
    }
  } catch (error) {
    console.error(`插件 ${plugin.manifest.id} 调整音量失败:`, error);
  }
}

// ==================== 性能优化 ====================

// 使用防抖优化直播菜单数据获取，避免频繁请求
const debouncedFetchLiveMenu = debounce(fetchLiveMenuData, 500);

// 使用节流优化键盘事件处理，防止过快重复触发
const throttledHandleKeydown = throttle(handleKeydown, 100);

function handleBrowserReady() {
  const plugin = activePlugin.value;
  if (!plugin) {
    return;
  }

  void ensureActivePluginReady();
  if (plugin.manifest.capabilities.liveMenu) {
    void fetchLiveMenuData();
  }
}

function handleSettingsKeydown(event: KeyboardEvent) {
  // 在捕获阶段处理设置页面的键盘事件
  if (appState.showSettings && !appState.activeUrl) {
    // 只拦截 Esc 和 Backspace，其他事件让它继续传播到 SettingsPanel
    if (event.key === 'Escape' || event.key === 'Backspace') {
      event.preventDefault();
      event.stopPropagation();
      closeSettings();
      return;
    }
    // 其他按键不拦截，让它们自然传递给 SettingsPanel
  }
}

function handleKeydown(event: KeyboardEvent) {
  if (appState.showSettings && !appState.activeUrl) {
    // 设置页面的键盘事件由 SettingsPanel 自己处理
    // 只拦截 Esc 和 Backspace 返回主页
    console.log(event.key)
    if (event.key === 'Escape' || event.key === 'Backspace') {
      event.preventDefault();
      closeSettings();
    }
    // 其他按键事件不拦截，让它们自然传递给 SettingsPanel
    return;
  }

  if (appState.activeUrl) {
    if (liveMenu.state.visible) {
      if (event.key === 'Escape' || event.key === 'Backspace') {
        event.preventDefault();
        closeLiveMenu();
        return;
      }

      if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
        event.preventDefault();
        liveMenu.switchColumn();
        return;
      }

      if (event.key === 'ArrowUp') {
        event.preventDefault();

        if (liveMenu.state.column === 'group') {
          moveLiveMenuGroup(-1);
          return;
        }

        moveLiveMenuItem(-1);
        return;
      }

      if (event.key === 'ArrowDown') {
        event.preventDefault();

        if (liveMenu.state.column === 'group') {
          moveLiveMenuGroup(1);
          return;
        }

        moveLiveMenuItem(1);
        return;
      }

      if (event.key === 'Enter' && liveMenu.state.column === 'item') {
        event.preventDefault();
        void selectLiveChannel(liveMenu.currentItems.value[liveMenu.currentItemIndex.value]);
        return;
      }

      return;
    }

    if (isLiveMenuAvailable.value && event.key === 'Enter') {
      event.preventDefault();
      toggleLiveMenu();
      return;
    }

    if (event.key === '-' || event.key === '_') {
      event.preventDefault();
      void adjustActivePluginVolume(-0.05);
      return;
    }

    if (event.key === '=' || event.key === '+') {
      event.preventDefault();
      void adjustActivePluginVolume(0.05);
      return;
    }

    if (event.key === 'Escape' || event.key === 'Backspace') {
      event.preventDefault();
      goHome();
    }

    return;
  }

  if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
    event.preventDefault();
    moveSelection(-1);
    return;
  }

  if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
    event.preventDefault();
    moveSelection(1);
    return;
  }

  if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault();
    if (shortcuts.value.length > 0) {
      openSite(shortcuts.value[appState.selectedIndex]);
    }
  }
}

function handleForwardedKeydown(_event: unknown, payload: { key: string }) {
  handleKeydown(new KeyboardEvent('keydown', { key: payload.key }));
}

function closeWindow() {
  window.close();
}

onMounted(async () => {
  updateTime();
  timer = window.setInterval(updateTime, 1000);
  ipcRenderer?.on('app-keydown', handleForwardedKeydown);

  await loadSettings();
  openConfiguredModule();

  nextTick(() => {
    focusSelectedCard();
  });
});

onBeforeUnmount(() => {
  if (timer) {
    window.clearInterval(timer);
  }

  ipcRenderer?.removeListener('app-keydown', handleForwardedKeydown);
});
</script>

<style scoped>
:global(body) {
  margin: 0;
  min-width: 100vw;
  min-height: 100vh;
  overflow: hidden;
  background: #06161b;
  color: #f4f7f8;
  font-family: "Segoe UI", "PingFang SC", "Microsoft YaHei", sans-serif;
}

:global(#app) {
  min-height: 100vh;
}

.home-shell {
  --line-color: rgba(120, 247, 255, 0.85);
  --text-soft: rgba(236, 245, 248, 0.82);
  position: relative;
  min-height: 100vh;
  padding: 26px 42px 40px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  isolation: isolate;
}

.home-shell.is-browser-open {
  padding: 0;
}

@media (max-width: 1100px) {
  .home-shell {
    padding: 22px 20px 28px;
  }

  .home-shell.is-browser-open {
    padding: 0;
  }
}
</style>
