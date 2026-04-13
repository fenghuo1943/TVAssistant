<template>
  <div class="background-image" />
  <div class="background-overlay" />

  <header class="top-bar">
    <!-- 顶部工具栏容器 -->
    <div 
      ref="toolbarRef"
      class="toolbar-container"
      :class="{ 'is-focused': isToolbarFocused }"
      tabindex="-1"
      @focus.capture="handleToolbarFocus"
      @blur.capture="handleToolbarBlur"
    >
      <div class="toolbar-content">
        <button
          :ref="(el) => setToolbarButtonRef(el as HTMLButtonElement, 0)"
          type="button"
          class="toolbar-button"
          aria-label="打开设置"
          :tabindex="isToolbarFocused && currentToolbarIndex === 0 ? 0 : -1"
          @click="$emit('open-settings')"
        >
          <svg class="button-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="3"/>
            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>
          </svg>
        </button>
        <button
          :ref="(el) => setToolbarButtonRef(el as HTMLButtonElement, 1)"
          type="button"
          class="toolbar-button"
          aria-label="退出应用"
          :tabindex="isToolbarFocused && currentToolbarIndex === 1 ? 0 : -1"
          @click="$emit('close-window')"
        >
          <svg class="button-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M18 6L6 18M6 6l12 12"/>
          </svg>
        </button>
      </div>
    </div>
  </header>

  <section class="hero-panel">
    <span class="hero-line hero-line-top" />
    <div class="time-block">
      <div class="time-value">{{ currentTime }}</div>
      <div class="time-date">{{ currentDate }}</div>
    </div>
    <span class="hero-line hero-line-bottom" />
  </section>

  <section class="card-grid" aria-label="快捷入口" role="list">
    <button
      v-for="(item, index) in shortcuts"
      :key="item.name"
      type="button"
      class="site-card"
      :class="[item.theme, { 'is-selected': selectedIndex === index && !isToolbarFocused }]"
      :tabindex="selectedIndex === index && !isToolbarFocused ? 0 : -1"
      :ref="(element) => setCardRef(element as HTMLButtonElement, index)"
      :aria-label="`打开${item.name}`"
      :aria-current="selectedIndex === index && !isToolbarFocused ? 'true' : undefined"
      role="listitem"
      @click="$emit('open-site', item)"
      @focus="$emit('focus-card', index)"
    >

      
      <div class="card-art">
        <div class="card-icon">
          <img
            v-if="hasIcon(item)"
            :src="getIconSrc(item)"
            :alt="item.name"
            class="icon-image"
            @error="handleIconError($event, item)"
          />
          <span v-else class="icon-fallback">{{ getFallbackIcon(item) }}</span>
        </div>
      </div>
      <div class="card-label">{{ item.name }}</div>
    </button>
  </section>
</template>

<script lang="ts" setup>
import { ref, nextTick, onMounted } from 'vue';
import type { Ref } from 'vue';
import type { Shortcut } from '../homePageShared.ts';
import type { IpcRenderer } from '../plugins/types.ts';

// 获取 ipcRenderer - 添加详细调试
const requireFunc = (window as typeof window & { require?: (moduleName: string) => any }).require;
console.log('[HomeLanding] require 是否存在:', typeof requireFunc);

let ipcRenderer: IpcRenderer | null = null;
if (requireFunc) {
  try {
    const electron = requireFunc('electron');
    console.log('[HomeLanding] electron 模块:', electron ? '已加载' : '未加载');
    ipcRenderer = electron?.ipcRenderer ?? null;
    console.log('[HomeLanding] ipcRenderer:', ipcRenderer ? '已获取' : '未获取');
    
    // 测试 IPC 调用
    if (ipcRenderer) {
      ipcRenderer.invoke('settings:get').then((settings) => {
        console.log('[HomeLanding] IPC 测试成功，获取到设置:', settings);
      }).catch((error) => {
        console.error('[HomeLanding] IPC 测试失败:', error);
      });
    }
  } catch (error) {
    console.error('[HomeLanding] 加载 electron 模块失败:', error);
  }
} else {
  console.warn('[HomeLanding] require 函数不存在');
}

const props = defineProps<{
  currentTime: string;
  currentDate: string;
  shortcuts: Shortcut[];
  selectedIndex: number;
  setCardRef: (element: Element | null, index: number) => void;
}>();

const emit = defineEmits<{
  'open-settings': [];
  'close-window': [];
  'open-site': [item: Shortcut];
  'focus-card': [index: number];
  'toolbar-focus-change': [isFocused: boolean];
}>();

// 图标缓存映射
const iconCacheMap = ref<Map<string, string>>(new Map());

// 工具栏引用和状态
const toolbarRef = ref<HTMLDivElement | null>(null);
const toolbarButtonRefs = ref<HTMLButtonElement[]>([]);
const isToolbarFocused = ref(false);
const currentToolbarIndex = ref(0);
const isInternalNavigation = ref(false); // 标记是否正在内部导航

// 设置工具栏按钮引用
function setToolbarButtonRef(element: HTMLButtonElement | null, index: number) {
  if (element) {
    toolbarButtonRefs.value[index] = element;
  }
}

function hasIcon(item: Shortcut): boolean {
  
  // 如果有自定义 icon，或者是有 url 的网站类型，都尝试显示图标
  if (item.icon) {
    return true;
  }
  if (item.type === 'website' && item.url) {
    return true;
  }
  return false;
}

// 获取图标源，优先使用本地缓存
async function loadIconToCache(item: Shortcut): Promise<string | null> {
  const cacheKey = item.icon || item.url || '';
  if (!cacheKey) return null;
  
  // 如果已经缓存，直接返回
  if (iconCacheMap.value.has(cacheKey)) {
    return iconCacheMap.value.get(cacheKey) || null;
  }
  
  let iconUrl = '';
  
  // 优先使用自定义 icon
  if (item.icon) {
    iconUrl = item.icon;
    console.log(`[图标缓存] 使用自定义图标: ${item.name}`);
  } else if (item.type === 'website' && item.url) {
    // 网站类型自动获取 favicon
    try {
      const url = new URL(item.url);
      console.log(`[图标缓存] 解析 URL: ${item.url}`);
      //iconUrl = `https://www.google.com/s2/favicons?domain=${url.hostname}&sz=128`;
      iconUrl = `https://favicon.im/${url.hostname}`;
    } catch (error) {
      console.error(`解析 URL 失败：${item.url}`, error);
      return null;
    }
  }
  console.log(`[图标缓存] iconUrl:`, iconUrl);
  if (!iconUrl) return null;
  
  // 如果是本地文件路径，直接使用
  if (iconUrl.startsWith('file://')) {
    iconCacheMap.value.set(cacheKey, iconUrl);
    return iconUrl;
  }
  
  // 尝试从缓存获取
  try {
    console.log(`[图标缓存] 开始处理: ${item.name}`);
    console.log(`[图标缓存] ipcRenderer 状态:`, ipcRenderer ? '可用' : '不可用');
    console.log(`[图标缓存] iconUrl:`, iconUrl);
    
    if (!ipcRenderer) {
      console.error('[图标缓存] ipcRenderer 为空，无法调用后端接口');
      iconCacheMap.value.set(cacheKey, iconUrl);
      return iconUrl;
    }
    
    console.log(`[图标缓存] 检查是否已缓存...`);
    const cachedPath = await ipcRenderer.invoke<string>('icon:get-cached', iconUrl);
    console.log(`[图标缓存] 检查结果:`, cachedPath || '未找到缓存');
    
    if (cachedPath) {
      console.log(`使用缓存图标: ${item.name}`);
      iconCacheMap.value.set(cacheKey, cachedPath);
      return cachedPath;
    }
    
    // 如果缓存不存在，下载并缓存
    console.log(`正在缓存图标: ${item.name}`);
    console.log(`[图标缓存] 调用后端 icon:cache 接口...`);
    
    const result = await ipcRenderer.invoke<string>('icon:cache', iconUrl);
    console.log(`[图标缓存] 后端返回结果:`, result || 'null/undefined');
    
    if (result) {
      console.log(`图标已缓存: ${item.name}`);
      console.log(`[图标缓存] 缓存路径:`, result);
      iconCacheMap.value.set(cacheKey, result);
      return result;
    } else {
      console.warn(`[图标缓存] 后端返回空结果，可能下载失败`);
    }
  } catch (error) {
    console.error(`获取图标失败: ${item.name}`, error);
    console.error(`[图标缓存] 错误详情:`, error instanceof Error ? error.message : error);
  }
  
  // 如果缓存失败，返回原始 URL
  console.log(`[图标缓存] 使用原始 URL: ${iconUrl}`);
  iconCacheMap.value.set(cacheKey, iconUrl);
  return iconUrl;
}

// 获取显示的图标源（同步版本，用于模板）
function getIconSrc(item: Shortcut): string {
  const cacheKey = item.icon || item.url || '';
  if (iconCacheMap.value.has(cacheKey)) {
    return iconCacheMap.value.get(cacheKey) || '';
  }
  
  // 如果还没加载，返回原始 URL（会触发异步加载）
  if (item.icon) {
    return item.icon;
  }
  
  if (item.type === 'website' && item.url) {
    try {
      const url = new URL(item.url);
      //return `=${url.hostname}&sz=128`;
      return `https://favicon.im/${url.hostname}`;
    } catch (error) {
      return '';
    }
  }
  
  return '';
}

function handleIconError(event: Event, item: Shortcut) {
  const img = event.target as HTMLImageElement;
  console.log(`图标加载失败：${item.name}, URL: ${img.src}`);
  // 隐藏失败的图片
  img.style.display = 'none';
  // 显示备用图标
  const parent = img.parentElement;
  if (parent) {
    const fallback = parent.querySelector('.icon-fallback') as HTMLElement;
    if (fallback) {
      fallback.style.display = 'flex';
    }
  }
}

// 在组件挂载时预加载所有图标
onMounted(async () => {
  // 异步加载所有图标到缓存
  const loadPromises = props.shortcuts.map(async (item) => {
    // 只处理网站类型的快捷方式
    console.log(`[图标缓存] 处理快捷方式: ${item.name}`);
    if (item.type === 'website' && item.url) {
      try {
        await loadIconToCache(item);
        // 触发重新渲染
        iconCacheMap.value = new Map(iconCacheMap.value);
      } catch (err) {
        console.error(`预加载图标失败: ${item.name}`, err);
      }
    }
  });
  
  // 不等待所有完成，让它们在后台加载
  Promise.allSettled(loadPromises).catch(err => {
    console.error('批量加载图标失败:', err);
  });
});

function getFallbackIcon(item: Shortcut): string {
  if (item.icon) {
    return item.name.charAt(0).toUpperCase();
  }
  return item.name.charAt(0).toUpperCase();
}

// 工具栏焦点管理
function handleToolbarFocus() {
  isToolbarFocused.value = true;
  emit('toolbar-focus-change', true);
  
  // 如果是内部导航（通过左右键切换），不要重置索引
  if (isInternalNavigation.value) {
    isInternalNavigation.value = false; // 重置标志
    return;
  }
  
  // 首次进入工具栏，重置为第一个按钮
  currentToolbarIndex.value = 0;
  nextTick(() => {
    focusToolbarButton(0);
  });
}

function handleToolbarBlur(event: FocusEvent) {
  // 检查新获得焦点的元素是否仍在工具栏内
  const relatedTarget = event.relatedTarget as HTMLElement | null;
  const toolbarElement = toolbarRef.value;
  if (relatedTarget && toolbarElement && toolbarElement.contains(relatedTarget)) {
    // 焦点仍在工具栏内部（比如从一个按钮移到另一个按钮），不处理
    return;
  }
  isToolbarFocused.value = false;
  emit('toolbar-focus-change', false);
}

function focusToolbarButton(index: number) {
  const buttons = toolbarButtonRefs.value;
  
  if (buttons.length === 0) {
    return;
  }
  
  // 确保索引在有效范围内
  const safeIndex = Math.max(0, Math.min(index, buttons.length - 1));
  currentToolbarIndex.value = safeIndex;
  
  const button = buttons[safeIndex];
  
  if (button) {
    nextTick(() => {
      button.focus();
    });
  } else {
    console.error('[Toolbar] 按钮不存在');
  }
}

function moveToolbarFocus(direction: 'left' | 'right') {
  const buttons = toolbarButtonRefs.value;
  
  if (buttons.length === 0) return;
  
  // 设置内部导航标志
  isInternalNavigation.value = true;
  
  if (direction === 'left') {
    currentToolbarIndex.value = currentToolbarIndex.value === 0 ? buttons.length - 1 : currentToolbarIndex.value - 1;
  } else {
    currentToolbarIndex.value = currentToolbarIndex.value === buttons.length - 1 ? 0 : currentToolbarIndex.value + 1;
  }
  focusToolbarButton(currentToolbarIndex.value);
}

// 暴露方法和属性给父组件
defineExpose({
  focusToolbar,
  focusFirstToolbarButton,
  moveToolbarFocus,
  // 暴露内部状态供父组件访问
  toolbarButtonRefs,
  currentToolbarIndex
});

function focusToolbar() {
  isToolbarFocused.value = true;
  currentToolbarIndex.value = 0;
  nextTick(() => {
    focusToolbarButton(0);
  });
}

function focusFirstToolbarButton() {
  currentToolbarIndex.value = 0;
  focusToolbarButton(0);
}
</script>

<style scoped>
.background-image,
.background-overlay {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.background-image {
  background-image: url('../assets/tv-home-bg.svg');
  background-size: cover;
  background-position: center;
  transform: scale(1.03);
}

.background-overlay {
  background:
    radial-gradient(circle at center, rgba(0, 0, 0, 0.08), rgba(0, 0, 0, 0.32) 62%, rgba(0, 0, 0, 0.56)),
    linear-gradient(180deg, rgba(4, 16, 23, 0.2), rgba(4, 16, 23, 0.44));
}

.top-bar,
.hero-panel,
.card-grid {
  position: relative;
  z-index: 1;
}

.top-bar {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  z-index: 10;
}

.toolbar-container {
  width: 100%;
  padding: 12px 24px;
  background: transparent;
  border-bottom: 1px solid transparent;
  transition: all 0.3s ease;
  outline: none;
  position: relative;
}

.toolbar-container::before {
  content: '';
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  opacity: 0;
  transition: opacity 0.3s ease;
  pointer-events: none;
  z-index: 0;
}

.toolbar-container.is-focused::before {
  opacity: 1;
}

.toolbar-content {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 16px;
  position: relative;
  z-index: 1;
}

.toolbar-button {
  width: 40px;
  height: 40px;
  border: none;
  border-radius: 8px;
  background: transparent;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  outline: none;
  padding: 0;
  position: relative;
  z-index: 1;
}

.toolbar-button::before {
  content: '';
  position: absolute;
  inset: 0;
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(8px);
  border-radius: 8px;
  opacity: 0;
  transition: opacity 0.2s ease;
  z-index: -1;
}

.toolbar-button:hover::before {
  opacity: 1;
}

.toolbar-button:focus-visible::before {
  opacity: 1;
  background: rgba(255, 255, 255, 0.15);
}

.button-icon {
  width: 20px;
  height: 20px;
  color: rgba(255, 255, 255, 0.85);
  stroke: currentColor;
}

.toolbar-button:hover .button-icon {
  color: rgba(255, 255, 255, 1);
}

.top-left,
.top-actions {
  display: none;
}

.status-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: rgba(234, 244, 247, 0.72);
  box-shadow: 0 0 8px rgba(180, 240, 246, 0.35);
}

.icon-button {
  width: 34px;
  height: 34px;
  border: none;
  border-radius: 50%;
  color: rgba(250, 253, 255, 0.88);
  background: rgba(10, 26, 33, 0.38);
  backdrop-filter: blur(10px);
  cursor: pointer;
  font-size: 18px;
  transition: transform 0.2s ease, background 0.2s ease;
}

.icon-button:hover,
.icon-button:focus-visible {
  transform: translateY(-1px);
  background: rgba(12, 36, 45, 0.55);
  outline: none;
}

.hero-panel {
  width: min(42vw, 520px);
  margin-top: 70px;
  margin-left: 3vw;
}

.hero-line {
  display: block;
  height: 2px;
  border-radius: 999px;
  background: linear-gradient(90deg, rgba(255, 255, 255, 0.26), var(--line-color));
  box-shadow: 0 0 16px rgba(120, 247, 255, 0.28);
}

.hero-line-top {
  width: 100%;
}

.hero-line-bottom {
  width: 62%;
  margin-top: 16px;
}

.time-block {
  padding: 26px 0 8px;
  user-select: none;
  -webkit-user-select: none;
}

.time-value {
  font-size: clamp(72px, 8vw, 110px);
  line-height: 0.95;
  font-weight: 300;
  letter-spacing: 0.04em;
  text-shadow: 0 8px 30px rgba(0, 0, 0, 0.2);
}

.time-date {
  margin-top: 10px;
  color: var(--text-soft);
  font-size: clamp(16px, 2vw, 24px);
  letter-spacing: 0.18em;
}

.card-grid {
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  gap: 16px;
  align-items: end;
  padding: 20px;
}

.site-card {
  border: none;
  background: rgba(255, 255, 255, 0.06);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  padding: 16px 12px;
  border-radius: 14px;
  color: inherit;
  cursor: pointer;
  text-align: center;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  outline: none;
  border: 1px solid rgba(255, 255, 255, 0.08);
  position: relative;
}

.site-card:hover {
  transform: translateY(-4px);
  background: rgba(255, 255, 255, 0.1);
  border-color: rgba(255, 255, 255, 0.15);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.3);
}

.site-card.is-selected {
  transform: translateY(-4px);
  background: rgba(255, 255, 255, 0.12);
  border-color: rgba(34, 197, 94, 0);
  box-shadow: 
    0 0 0 2px rgba(34, 197, 94, 0.4),
    0 0 20px rgba(34, 197, 94, 0.3),
    0 12px 40px rgba(0, 0, 0, 0.4);
}

.site-card.is-selected .card-label {
  color: rgba(34, 197, 94, 1);
  font-weight: 600;
}

.card-art {
  position: relative;
  overflow: visible;
  min-height: 100px;
  border-radius: 10px;
  border: none;
  box-shadow: none;
  background: transparent;
  margin-bottom: 12px;
}

.card-art::after {
  content: none;
}

.card-icon {
  position: relative;
  top: 0;
  left: 0;
  transform: none;
  width: 100%;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
}

.icon-image {
  width: 64px;
  height: 64px;
  object-fit: contain;
  filter: drop-shadow(0 2px 8px rgba(0, 0, 0, 0.25));
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.site-card:hover .icon-image {
  transform: scale(1.05);
  filter: drop-shadow(0 4px 12px rgba(0, 0, 0, 0.3));
}

.icon-fallback {
  width: 64px;
  height: 64px;
  border-radius: 14px;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.15), rgba(255, 255, 255, 0.06));
  backdrop-filter: blur(10px);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 28px;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.9);
  box-shadow: 
    inset 0 1px 1px rgba(255, 255, 255, 0.2),
    0 4px 12px rgba(0, 0, 0, 0.2);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
}

.icon-fallback::before {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: linear-gradient(
    45deg,
    transparent 30%,
    rgba(255, 255, 255, 0.1) 50%,
    transparent 70%
  );
  animation: shimmer 3s infinite;
}

@keyframes shimmer {
  0% {
    transform: translateX(-100%) rotate(45deg);
  }
  100% {
    transform: translateX(100%) rotate(45deg);
  }
}

.site-card:hover .icon-fallback {
  transform: scale(1.05);
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.1));
  box-shadow: 
    inset 0 1px 1px rgba(255, 255, 255, 0.3),
    0 6px 16px rgba(0, 0, 0, 0.25);
}

.site-card .card-label {
  margin-top: 8px;
  color: rgba(255, 255, 255, 0.85);
  font-size: 13px;
  font-weight: 500;
  letter-spacing: 0.02em;
  text-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
  transition: color 0.3s ease;
  line-height: 1.4;
}

.card-badge,
.card-title {
  position: relative;
  z-index: 1;
}

.card-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 54px;
  padding: 9px 12px;
  margin: 16px 0 0 16px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.14);
  backdrop-filter: blur(8px);
  font-size: 12px;
  letter-spacing: 0.18em;
}

.card-title {
  position: absolute;
  left: 18px;
  right: 18px;
  bottom: 18px;
  font-size: clamp(26px, 2.4vw, 36px);
  font-weight: 700;
  text-align: left;
  text-shadow: 0 6px 22px rgba(0, 0, 0, 0.34);
}

.card-label {
  margin-top: 12px;
  color: rgba(246, 250, 252, 0.94);
  font-size: 26px;
  letter-spacing: 0.04em;
}

.theme-live .card-art {
  background:
    radial-gradient(circle at 72% 28%, rgba(255, 231, 199, 0.5), transparent 20%),
    radial-gradient(circle at 24% 30%, rgba(255, 122, 115, 0.28), transparent 23%),
    linear-gradient(135deg, rgba(255, 178, 184, 0.98), rgba(255, 214, 194, 0.92) 52%, rgba(255, 145, 120, 0.8));
}

.theme-cctv .card-art {
  background:
    linear-gradient(180deg, rgba(248, 215, 157, 0.1), rgba(11, 20, 26, 0.22)),
    linear-gradient(140deg, #d5bf95 2%, #7d6246 34%, #394d50 68%, #1f282f 100%);
}

.theme-douyin .card-art {
  background:
    radial-gradient(circle at 28% 32%, rgba(0, 255, 240, 0.22), transparent 18%),
    radial-gradient(circle at 65% 62%, rgba(255, 55, 110, 0.2), transparent 24%),
    linear-gradient(135deg, #18050c 10%, #271221 58%, #0b0c14 100%);
}

.theme-tencent .card-art {
  background:
    radial-gradient(circle at 66% 35%, rgba(73, 233, 255, 0.22), transparent 18%),
    linear-gradient(135deg, #040404 0%, #0f1014 45%, #171f2c 100%);
}

.theme-local .card-art {
  background:
    radial-gradient(circle at 60% 30%, rgba(120, 255, 180, 0.18), transparent 20%),
    linear-gradient(135deg, #0a1a12 0%, #12281a 45%, #1a3a2a 100%);
}

.theme-system .card-art {
  background:
    radial-gradient(circle at 60% 30%, rgba(180, 200, 255, 0.18), transparent 20%),
    linear-gradient(135deg, #121828 0%, #1a2338 45%, #283050 100%);
}

.theme-custom .card-art {
  background:
    radial-gradient(circle at 60% 30%, rgba(255, 200, 100, 0.18), transparent 20%),
    linear-gradient(135deg, #1a1a2e 0%, #16213e 45%, #0f3460 100%);
}

@media (max-width: 1100px) {
  .hero-panel {
    width: min(66vw, 520px);
    margin-top: 24px;
    margin-left: 0;
  }

  .card-grid {
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 14px;
  }

  .site-card {
    padding: 12px;
  }

  .card-art {
    min-height: 80px;
  }

  .card-icon {
    height: 80px;
  }

  .icon-image,
  .icon-fallback {
    width: 56px;
    height: 56px;
  }

  .card-label {
    font-size: 13px;
  }
}

@media (max-width: 640px) {
  .hero-panel {
    width: 100%;
  }

  .time-value {
    font-size: 64px;
  }

  .time-date {
    letter-spacing: 0.08em;
  }

  .card-grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 12px;
    padding: 14px;
  }

  .site-card {
    padding: 10px;
  }

  .card-art {
    min-height: 72px;
  }

  .card-icon {
    height: 72px;
  }

  .icon-image,
  .icon-fallback {
    width: 48px;
    height: 48px;
  }

  .card-label {
    font-size: 12px;
  }
}
</style>
