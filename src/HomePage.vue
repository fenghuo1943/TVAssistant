<template>
  <main class="home-shell" :class="{ 'is-browser-open': !!activeUrl }" tabindex="0" @keydown="handleKeydown" @keydown.capture="handleSettingsKeydown">
    <SettingsPanel
      v-if="showSettings"
      :active-menu="activeSettingsMenu"
      :settings="settings"
      @back="closeSettings"
      @select-menu="activeSettingsMenu = $event"
      @update-setting="saveSettings"
    />

    <HomeLanding
      v-else-if="!activeUrl"
      :current-time="currentTime"
      :current-date="currentDate"
      :shortcuts="shortcuts"
      :selected-index="selectedIndex"
      :set-card-ref="setCardRef"
      @open-settings="openSettings"
      @close-window="closeWindow"
      @open-site="openSite"
      @focus-card="selectedIndex = $event"
    />

    <HomeBrowser
      v-else
      :active-url="activeUrl"
      :set-back-button-ref="setBackButtonRef"
      :set-webview-ref="setWebviewRef"
      :show-live-menu="liveMenuVisible"
      :live-menu-groups="liveMenuGroups"
      :active-live-group-index="liveMenuGroupIndex"
      :active-live-column="liveMenuColumn"
      :active-live-item-index="currentLiveItemIndex"
      :live-menu-heading="liveMenuHeading"
      @browser-ready="handleBrowserReady"
      @go-home="goHome"
      @select-live-channel="selectLiveChannel"
    />
  </main>
</template>

<script lang="ts" setup>
import { computed, nextTick, onBeforeUnmount, onMounted, ref, type ComponentPublicInstance } from 'vue';
import HomeBrowser from './components/HomeBrowser.vue';
import HomeLanding from './components/HomeLanding.vue';
import SettingsPanel from './components/SettingsPanel.vue';
import { defaultShortcuts, type Shortcut } from './settings.ts';
import { findBrowserPlugin } from './plugins/browserPlugins.ts';
import { defaultSettings, type AppSettings } from './settings.ts';

type IpcRendererLike = {
  on: (channel: string, listener: (_event: unknown, payload: { key: string }) => void) => void;
  removeListener: (channel: string, listener: (_event: unknown, payload: { key: string }) => void) => void;
  invoke: (channel: string, ...args: unknown[]) => Promise<unknown>;
};

type SettingsMenuKey = 'general' | 'site-management' | 'add-site' | 'add-local-app' | 'wallpaper';

const ipcRenderer = ((window as typeof window & { require?: (moduleName: string) => { ipcRenderer?: IpcRendererLike } })
  .require?.('electron')?.ipcRenderer ?? null) as IpcRendererLike | null;

const shortcuts = computed(() => {
  return defaultShortcuts.filter(shortcut => 
    settings.value.enabledShortcuts.includes(shortcut.url)
  );
});
const now = ref(new Date());
const selectedIndex = ref(0);
const activeUrl = ref('');
const activeTitle = ref('');
const showSettings = ref(false);
const activeSettingsMenu = ref<SettingsMenuKey>('general');
const settings = ref<AppSettings>({ ...defaultSettings });
const cardRefs = ref<HTMLButtonElement[]>([]);
const backButtonRef = ref<HTMLButtonElement | null>(null);
const webviewRef = ref<Electron.WebviewTag | null>(null);
const liveMenuVisible = ref(false);
const liveMenuGroupIndex = ref(0);
const liveMenuColumn = ref<'group' | 'item'>('group');
const liveMenuItemIndices = ref([0, 0]);
const currentLiveChannel = ref('');
const currentPluginId = ref('');
const currentPluginConfig = ref<Record<string, unknown>>({});
const liveMenuGroups = ref([
  {
    label: '央视频道',
    items: ['内容稍后添加']
  },
  {
    label: '卫视频道',
    items: ['内容稍后添加']
  }
]);
let timer: number | undefined;
let liveMenuFetchToken = 0;

const formatter = new Intl.DateTimeFormat('zh-CN', {
  month: 'long',
  day: 'numeric',
  weekday: 'long'
});

const currentTime = computed(() =>
  now.value.toLocaleTimeString('zh-CN', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  })
);

const activePlugin = computed(() => findBrowserPlugin(activeUrl.value));
const currentDate = computed(() => formatter.format(now.value));
const isLiveMenuAvailable = computed(() => activePlugin.value?.manifest.capabilities.liveMenu ?? false);
const currentLiveItems = computed(() => liveMenuGroups.value[liveMenuGroupIndex.value]?.items ?? []);
const currentLiveItemIndex = computed(() => liveMenuItemIndices.value[liveMenuGroupIndex.value] ?? 0);
const liveMenuHeading = computed(() => currentLiveChannel.value || liveMenuGroups.value[liveMenuGroupIndex.value]?.label || '');

function updateTime() {
  now.value = new Date();
}

function openSettings() {
  showSettings.value = true;
}

function closeSettings() {
  showSettings.value = false;

  nextTick(() => {
    focusSelectedCard();
  });
}

function openSite(item: Shortcut) {
  activeUrl.value = item.url;
  activeTitle.value = item.name;
  showSettings.value = false;
  closeLiveMenu();
  currentLiveChannel.value = '';
  currentPluginId.value = '';
  currentPluginConfig.value = {};

  nextTick(() => {
    backButtonRef.value?.focus();
  });
}

function openConfiguredModule() {
  if (!settings.value.openModuleOnLaunch || !settings.value.launchModuleId) {
    return;
  }

  const targetShortcut = defaultShortcuts.find((item) => item.url === settings.value.launchModuleId);
  if (!targetShortcut) {
    return;
  }

  openSite(targetShortcut);
}

function goHome() {
  activeUrl.value = '';
  activeTitle.value = '';
  closeLiveMenu();
  currentLiveChannel.value = '';
  currentPluginId.value = '';
  currentPluginConfig.value = {};

  nextTick(() => {
    focusSelectedCard();
  });
}

function setCardRef(element: Element | null, index: number) {
  if (element instanceof HTMLButtonElement) {
    cardRefs.value[index] = element;
    return;
  }

  delete cardRefs.value[index];
}

function setBackButtonRef(element: Element | ComponentPublicInstance | null) {
  backButtonRef.value = element instanceof HTMLButtonElement ? element : null;
}

function setWebviewRef(element: Element | ComponentPublicInstance | null) {
  webviewRef.value = element as Electron.WebviewTag | null;
}

function focusSelectedCard() {
  const card = cardRefs.value[selectedIndex.value];
  card?.focus();
}

function moveSelection(offset: number) {
  const total = shortcuts.value.length;
  if (total === 0) return;
  selectedIndex.value = (selectedIndex.value + offset + total) % total;
  focusSelectedCard();
}

function toggleLiveMenu() {
  if (!isLiveMenuAvailable.value) {
    return;
  }

  liveMenuVisible.value = !liveMenuVisible.value;

  if (!liveMenuVisible.value) {
    liveMenuColumn.value = 'group';
  }
}

function closeLiveMenu() {
  liveMenuVisible.value = false;
  liveMenuColumn.value = 'group';
}

function moveLiveMenuGroup(offset: number) {
  const total = liveMenuGroups.value.length;
  liveMenuGroupIndex.value = (liveMenuGroupIndex.value + offset + total) % total;
}

function moveLiveMenuItem(offset: number) {
  const items = currentLiveItems.value;
  const total = items.length;
  const nextIndex = (currentLiveItemIndex.value + offset + total) % total;

  liveMenuItemIndices.value[liveMenuGroupIndex.value] = nextIndex;
}

function syncLiveChannelSelection(channelName: string) {
  if (!channelName) {
    return;
  }

  const normalizedName = channelName.trim();
  currentLiveChannel.value = normalizedName;

  const groupIndex = liveMenuGroups.value.findIndex((group) => group.items.includes(normalizedName));
  if (groupIndex === -1) {
    return;
  }

  const itemIndex = liveMenuGroups.value[groupIndex].items.indexOf(normalizedName);
  liveMenuGroupIndex.value = groupIndex;
  liveMenuItemIndices.value[groupIndex] = itemIndex;
}

function applyLiveMenuGroups(data: { currentChannel?: string; 央视频道?: string[]; 卫视频道?: string[] }) {
  const cctvChannels = data.央视频道?.length ? data.央视频道 : ['内容稍后添加'];
  const satelliteChannels = data.卫视频道?.length ? data.卫视频道 : ['内容稍后添加'];

  liveMenuGroups.value = [
    {
      label: '央视频道',
      items: cctvChannels
    },
    {
      label: '卫视频道',
      items: satelliteChannels
    }
  ];

  liveMenuItemIndices.value = liveMenuGroups.value.map(() => 0);
  liveMenuGroupIndex.value = 0;
  syncLiveChannelSelection(data.currentChannel ?? '');
}

async function loadPluginConfig(pluginId: string) {
  const config = await ipcRenderer?.invoke('plugin-config:get', pluginId);
  return (config as Record<string, unknown> | undefined) ?? {};
}

async function savePluginConfig(pluginId: string, config: Record<string, unknown>) {
  currentPluginConfig.value = config;
  await ipcRenderer?.invoke('plugin-config:set', pluginId, config);
}

async function loadSettings() {
  const response = await ipcRenderer?.invoke('settings:get');
  settings.value = {
    ...defaultSettings,
    ...((response as Partial<AppSettings> | undefined) ?? {})
  };
}

async function saveSettings(value: Partial<AppSettings>) {
  const response = await ipcRenderer?.invoke('settings:set', value);
  settings.value = {
    ...settings.value,
    ...value,
    ...((response as Partial<AppSettings> | undefined) ?? {})
  };
}

async function ensureActivePluginReady() {
  const webview = webviewRef.value;
  const plugin = activePlugin.value;
  if (!webview || !plugin) {
    return null;
  }

  if (currentPluginId.value !== plugin.manifest.id) {
    currentPluginConfig.value = {
      ...plugin.manifest.defaultConfig,
      ...(await loadPluginConfig(plugin.manifest.id))
    };
    currentPluginId.value = plugin.manifest.id;
  }

  try {
    await webview.executeJavaScript(plugin.buildInitScript(currentPluginConfig.value), true);
  } catch (error) {
    console.error(`初始化插件 ${plugin.manifest.id} 失败:`, error);
    return null;
  }

  return plugin;
}

async function fetchLiveMenuData() {
  const webview = webviewRef.value;
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

async function selectLiveChannel(channelName: string) {
  const webview = webviewRef.value;
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

async function adjustActivePluginVolume(delta: number) {
  const webview = webviewRef.value;
  const plugin = activePlugin.value;
  if (!webview || !plugin?.manifest.capabilities.volumeControl) {
    return;
  }

  try {
    await ensureActivePluginReady();
    const volume = await webview.executeJavaScript(plugin.buildAdjustVolumeScript(delta), true);

    if (typeof volume === 'number') {
      await savePluginConfig(plugin.manifest.id, {
        ...currentPluginConfig.value,
        volume
      });
    }
  } catch (error) {
    console.error(`插件 ${plugin.manifest.id} 调整音量失败:`, error);
  }
}

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
  if (showSettings.value && !activeUrl.value) {
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
  if (showSettings.value && !activeUrl.value) {
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

  if (activeUrl.value) {
    if (liveMenuVisible.value) {
      if (event.key === 'Escape' || event.key === 'Backspace') {
        event.preventDefault();
        closeLiveMenu();
        return;
      }

      if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
        event.preventDefault();
        liveMenuColumn.value = liveMenuColumn.value === 'group' ? 'item' : 'group';
        return;
      }

      if (event.key === 'ArrowUp') {
        event.preventDefault();

        if (liveMenuColumn.value === 'group') {
          moveLiveMenuGroup(-1);
          return;
        }

        moveLiveMenuItem(-1);
        return;
      }

      if (event.key === 'ArrowDown') {
        event.preventDefault();

        if (liveMenuColumn.value === 'group') {
          moveLiveMenuGroup(1);
          return;
        }

        moveLiveMenuItem(1);
        return;
      }

      if (event.key === 'Enter' && liveMenuColumn.value === 'item') {
        event.preventDefault();
        void selectLiveChannel(currentLiveItems.value[currentLiveItemIndex.value]);
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
      openSite(shortcuts.value[selectedIndex.value]);
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
