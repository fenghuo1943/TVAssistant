<template>
  <main class="home-shell" :class="{ 'is-browser-open': !!appState.activeUrl }" tabindex="0" @keydown="handleKeydown"
    @keydown.capture="handleSettingsKeydown">
    <SettingsPanel v-if="appState.showSettings" :active-menu="appState.activeSettingsMenu" :settings="appState.settings"
      @back="closeSettings" @select-menu="appState.activeSettingsMenu = $event" @update-setting="saveSettings" />

    <HomeLanding ref="homeLandingRef" v-else-if="!appState.activeUrl" :current-time="currentTime"
      :current-date="currentDate" :shortcuts="shortcuts" :selected-index="appState.selectedIndex"
      :set-card-ref="setCardRef" @open-settings="openSettings" @close-window="closeWindow" @open-site="openSite"
      @focus-card="appState.selectedIndex = $event"
      @toolbar-focus-change="currentFocusZone = $event ? FocusZone.TOOLBAR : FocusZone.CARDS" />

    <HomeBrowser v-else :active-url="appState.activeUrl" :set-back-button-ref="setBackButtonRef"
      :set-webview-ref="setWebviewRef" :show-live-menu="liveMenu.state.visible"
      :live-menu-groups="liveMenu.state.groups" :active-live-group-index="liveMenu.state.groupIndex"
      :active-live-column="liveMenu.state.column" :active-live-item-index="liveMenu.currentItemIndex.value"
      :live-menu-heading="liveMenu.heading.value" @browser-ready="handleBrowserReady" @go-home="goHome"
      @select-live-channel="selectLiveChannel" />
  </main>
</template>

<script lang="ts" setup>
import { computed, nextTick, onBeforeUnmount, onMounted, reactive, ref } from 'vue';
import type { ComponentPublicInstance, Ref } from 'vue';
import HomeBrowser from './components/HomeBrowser.vue';
import HomeLanding from './components/HomeLanding.vue';
import SettingsPanel from './components/SettingsPanel.vue';
import { findBrowserPlugin } from './plugins/browserPlugins.ts';
import type { IpcRenderer, PluginConfig, BrowserPlugin } from './plugins/types.ts';
import { withRetry, showError, debounce, throttle } from './utils/errorHandler.ts';
import { SETTINGS_MENU_KEYS, type SettingsMenuKey } from './constants/index.ts';
import { createRefManager, createSingleRefManager } from './utils/refManager.ts';
import { defaultSettings, type AppSettings, type Shortcut } from './settings.ts';
import { DEFAULT_SHORTCUTS } from './constants/index.ts';
import { StandardKey, isVolumeKey } from './types/keyMap.js';
import { useAutoHideMouse } from './composables/useAutoHideMouse.ts';

const ipcRenderer = ((window as typeof window & { require?: (moduleName: string) => { ipcRenderer?: IpcRenderer } })
  .require?.('electron')?.ipcRenderer ?? null) as IpcRenderer | null;

// 使用 useLiveMenu composable 管理直播菜单状态
import { useLiveMenu } from './composables/useLiveMenu.ts';
const liveMenu = useLiveMenu();

const {
  enable: enableAutoHide,
  disable: disableAutoHide,
  attachWebview,
  markWebviewReady
} = useAutoHideMouse({
  hideDelay: 3000,
  immediate: false
});

// 使用引用管理器
const cardRefManager = createRefManager<HTMLButtonElement>();
const backButtonRefManager = createSingleRefManager<HTMLButtonElement>();
const webviewRefManager = createSingleRefManager<Electron.WebviewTag>();

// 工具栏引用
const homeLandingRef = ref<ComponentPublicInstance | null>(null);

// 焦点状态管理
enum FocusZone {
  TOOLBAR = 'toolbar',
  CARDS = 'cards'
}

const currentFocusZone = ref<FocusZone>(FocusZone.CARDS);

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
  // 合并默认快捷方式和用户自定义快捷方式
  const allShortcuts = [
    ...DEFAULT_SHORTCUTS,
    ...appState.settings.customShortcuts
  ];

  // 过滤出已启用的快捷方式
  return allShortcuts.filter((shortcut: Shortcut) =>
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
  disableAutoHide();
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

  enableAutoHide();

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

  disableAutoHide();

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
  attachWebview((element as Electron.WebviewTag | null) ?? null);
}

function focusSelectedCard() {
  const card = cardRefManager.getRef(appState.selectedIndex);
  card?.focus();
  currentFocusZone.value = FocusZone.CARDS;
}

function focusToolbar() {
  console.log('[HomePage] focusToolbar 被调用');
  console.log('[HomePage] homeLandingRef:', homeLandingRef.value);
  if (homeLandingRef.value) {
    (homeLandingRef.value as any).focusToolbar();
    currentFocusZone.value = FocusZone.TOOLBAR;
    console.log('[HomePage] 焦点区域已设置为 TOOLBAR');
  }
}

function moveFocusToCards(fromToolbar: boolean = false) {
  if (fromToolbar) {
    // 从工具栏下来，聚焦到第一个图标
    appState.selectedIndex = 0;
  }
  focusSelectedCard();
}

function moveSelection(offset: number) {
  const total = shortcuts.value.length;
  if (total === 0) return;
  appState.selectedIndex = (appState.selectedIndex + offset + total) % total;
  focusSelectedCard();
}

/**
 * 获取当前列数（基于 CSS Grid 配置）
 * 根据屏幕宽度动态计算列数
 */
function getColumnCount(): number {
  const width = window.innerWidth;
  if (width <= 640) {
    return 3; // 小屏幕 3 列
  } else if (width <= 1100) {
    return 4; // 中等屏幕 4 列
  } else {
    return 5; // 大屏幕 5 列
  }
}

/**
 * 在网格中移动焦点（支持上下行切换）
 * @param direction 移动方向：'left' | 'right' | 'up' | 'down'
 */
function moveInGrid(direction: 'left' | 'right' | 'up' | 'down') {
  const total = shortcuts.value.length;
  if (total === 0) return;

  const columns = getColumnCount();
  let newIndex = appState.selectedIndex;

  switch (direction) {
    case 'left':
      // 向左移动：索引减 1，如果已经在最左边，循环到上一行的最右边
      if (newIndex % columns === 0) {
        // 当前行的最左边，移动到上一行的最右边
        const currentRow = Math.floor(newIndex / columns);
        const prevRow = currentRow === 0 ? Math.ceil(total / columns) - 1 : currentRow - 1;
        const prevRowLastColumn = Math.min(columns - 1, total - 1 - prevRow * columns);
        newIndex = prevRow * columns + prevRowLastColumn;
      } else {
        newIndex -= 1;
      }
      break;

    case 'right':
      // 向右移动：索引加 1，如果已经在最右边，循环到下一行的最左边
      if ((newIndex + 1) % columns === 0 || newIndex === total - 1) {
        // 当前行的最右边，移动到下一行的最左边
        const currentRow = Math.floor(newIndex / columns);
        const nextRow = (currentRow + 1) % Math.ceil(total / columns);
        newIndex = nextRow * columns;
      } else {
        newIndex += 1;
      }
      break;

    case 'up':
      // 向上移动：减去一行，如果已经在第一行，循环到最后一行
      {
        const currentRow = Math.floor(newIndex / columns);
        const currentCol = newIndex % columns;
        const totalRows = Math.ceil(total / columns);

        if (currentRow === 0) {
          // 第一行，循环到最后一行
          const lastRow = totalRows - 1;
          const lastRowStart = lastRow * columns;
          const lastRowEnd = Math.min(total - 1, lastRowStart + columns - 1);
          // 如果最后一行的列数不足，取最后一个元素
          newIndex = lastRowStart + Math.min(currentCol, lastRowEnd - lastRowStart);
        } else {
          // 移动到上一行的同列位置
          newIndex = (currentRow - 1) * columns + currentCol;
        }
      }
      break;

    case 'down':
      // 向下移动：加上一行，如果已经在最后一行，循环到第一行
      {
        const currentRow = Math.floor(newIndex / columns);
        const currentCol = newIndex % columns;
        const totalRows = Math.ceil(total / columns);

        if (currentRow === totalRows - 1) {
          // 最后一行，循环到第一行
          newIndex = currentCol;
          // 确保不超过总数
          if (newIndex >= total) {
            newIndex = total - 1;
          }
        } else {
          // 移动到下一行的同列位置
          newIndex = (currentRow + 1) * columns + currentCol;
          // 确保不超过总数
          if (newIndex >= total) {
            newIndex = total - 1;
          }
        }
      }
      break;
  }

  // 确保索引在有效范围内
  newIndex = Math.max(0, Math.min(total - 1, newIndex));

  appState.selectedIndex = newIndex;
  focusSelectedCard();
}

/**
 * 处理工具栏内的左右导航
 */
function handleToolbarNavigation(direction: 'left' | 'right') {
  console.log('[HomePage] handleToolbarNavigation 被调用，direction:', direction);
  if (homeLandingRef.value) {
    console.log('[HomePage] 调用子组件的 moveToolbarFocus');
    (homeLandingRef.value as any).moveToolbarFocus(direction);
  } else {
    console.warn('[HomePage] homeLandingRef 为空');
  }
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
  const oldGroupIndex = liveMenu.state.groupIndex;
  liveMenu.moveGroup(offset);

  // 只有在分组真正改变时才需要滚动
  if (oldGroupIndex !== liveMenu.state.groupIndex) {
    void nextTick(() => {
      setTimeout(() => {
        // 查找当前选中的频道项（可能在不同的列焦点状态下）
        const activeItem = document.querySelector('.live-menu-channel-item.is-active') ||
          document.querySelector('.live-menu-channel-item.is-selected');
        if (activeItem) {
          activeItem.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
      }, 80);
    });
  }
}

function moveLiveMenuItem(offset: number) {
  liveMenu.moveItem(offset);
  void nextTick(() => {
    setTimeout(() => {
      const activeItem = document.querySelector('.live-menu-channel-item.is-active') ||
        document.querySelector('.live-menu-channel-item.is-selected');
      if (activeItem) {
        activeItem.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    }, 50);
  });
}

function scrollToActiveElement(selector: string) {
  setTimeout(() => {
    const element = document.querySelector(selector) ||
      document.querySelector('.live-menu-channel-item.is-selected');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }, 50);
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
    // 创建纯 JSON 拷贝，避免 IPC 序列化问题
    const serializedValue = JSON.parse(JSON.stringify(value));

    await withRetry(
      async () => {
        const response = await ipcRenderer?.invoke<Partial<AppSettings>>('settings:set', serializedValue);
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
    console.error('保存设置失败:', error);
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
  markWebviewReady();
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
    // 其他按键不拦截，让它们自然传递给 SettingsPanel
  }
}

function handleKeydown(event: KeyboardEvent) {
  console.log('[HomePage] 按键事件:', event.key);
  if (appState.showSettings && !appState.activeUrl) {
    // 其他按键事件不拦截，让它们自然传递给 SettingsPanel
    return;
  }

  if (appState.activeUrl) {
    console.log('[HomePage] 当前活动 URL:', appState.activeUrl);
    if (liveMenu.state.visible) {
      if (event.key === StandardKey.BACK) {
        event.preventDefault();
        closeLiveMenu();
        return;
      }
      if (event.key === StandardKey.LEFT || event.key === StandardKey.RIGHT) {
        event.preventDefault();
        liveMenu.switchColumn();
        return;
      }
      if (event.key === StandardKey.UP) {
        event.preventDefault();
        if (liveMenu.state.column === 'group') {
          moveLiveMenuGroup(-1);
          return;
        }
        moveLiveMenuItem(-1);
        return;
      }

      if (event.key === StandardKey.DOWN) {
        event.preventDefault();

        if (liveMenu.state.column === 'group') {
          moveLiveMenuGroup(1);
          return;
        }

        moveLiveMenuItem(1);
        return;
      }

      if (event.key === StandardKey.CONFIRM && liveMenu.state.column === 'item') {
        event.preventDefault();
        void selectLiveChannel(liveMenu.currentItems.value[liveMenu.currentItemIndex.value]);
        return;
      }

      return;
    }

    if (isLiveMenuAvailable.value && event.key === StandardKey.MENU) {
      event.preventDefault();
      console.log('[HomePage] 菜单键，切换直播菜单');
      toggleLiveMenu();
      return;
    }

    if (isVolumeKey(event.key)) {
      event.preventDefault();
      const delta = (event.key === StandardKey.MINUS || event.key === StandardKey.UNDERSCORE) ? -0.05 : 0.05;
      void adjustActivePluginVolume(delta);
      return;
    }

    if (event.key === StandardKey.BACK) {
      event.preventDefault();
      goHome();
    }

    return;
  }

  // 主页网格导航
  if (currentFocusZone.value === FocusZone.TOOLBAR) {
    //console.log('[HomePage] 当前焦点区域：TOOLBAR, 按键:', event.key);
    // 在工具栏区域内
    if (event.key === StandardKey.LEFT || event.key === StandardKey.RIGHT) {
      event.preventDefault();
      handleToolbarNavigation(event.key === StandardKey.LEFT ? 'left' : 'right');
      return;
    }

    if (event.key === StandardKey.DOWN) {
      event.preventDefault();
      moveFocusToCards(true);
      return;
    }

    // 在工具栏时，上箭头不处理（或者可以循环到底部）
    /* if (event.key === StandardKey.UP) {
      event.preventDefault();
      moveFocusToCards(true);
      return;
    } */

    // 在工具栏时，空格键触发当前聚焦按钮的点击事件
    if (event.key === StandardKey.CONFIRM) {
      event.preventDefault();
      console.log('[HomePage] 工具栏确认键，触发按钮点击');
      // 触发当前工具栏按钮的点击
      if (homeLandingRef.value) {
        const landingInstance = homeLandingRef.value as any;
        // 访问暴露的 ref 属性（需要 .value 解包）
        console.log('[HomePage] landingInstance:', landingInstance.currentToolbarIndex);
        const buttons = landingInstance.toolbarButtonRefs;
        const currentIndex = landingInstance.currentToolbarIndex;
        console.log('[HomePage] buttons:', buttons, 'currentIndex:', currentIndex);

        if (buttons && buttons.length > 0 && typeof currentIndex === 'number') {
          const button = buttons[currentIndex];
          console.log('[HomePage] 准备点击的按钮:', button);
          if (button) {
            button.click();
            console.log('[HomePage] 按钮已点击');
          }
        } else {
          console.log('[HomePage] buttons:', buttons, 'currentIndex:', currentIndex);
          console.warn('[HomePage] 按钮数组为空或 currentIndex 不是数字');
          console.warn('[HomePage] landingInstance:', landingInstance);
        }
      } else {
        console.warn('[HomePage] homeLandingRef 为空');
      }
      return;
    }
  } else {
    // 在卡片区域
    //console.log('[HomePage] 当前焦点区域：CARDS, 按键:', event.key);
    if (event.key === StandardKey.UP) {
      event.preventDefault();
      // 如果在第一行，聚焦到工具栏
      const columns = getColumnCount();
      const currentRow = Math.floor(appState.selectedIndex / columns);
      if (currentRow === 0) {

        focusToolbar();
        return;
      }
      moveInGrid('up');
      return;
    }

    if (event.key === StandardKey.DOWN) {
      event.preventDefault();
      moveInGrid('down');
      return;
    }

    if (event.key === StandardKey.LEFT) {
      event.preventDefault();
      moveInGrid('left');
      return;
    }

    if (event.key === StandardKey.RIGHT) {
      event.preventDefault();
      moveInGrid('right');
      return;
    }

    if (event.key === StandardKey.CONFIRM) {
      //console.log('[HomePage] 确认键，打开站点',event.key);
      event.preventDefault();
      if (shortcuts.value.length > 0) {
        openSite(shortcuts.value[appState.selectedIndex]);
      }
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

  disableAutoHide();
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
