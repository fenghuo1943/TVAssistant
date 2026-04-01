<template>
  <div class="background-image" />
  <div class="background-overlay" />

  <header class="top-bar">
    <div class="top-left">
      <span class="status-dot" />
      <span class="status-dot" />
    </div>
    <div class="top-actions">
      <button
        type="button"
        class="icon-button"
        aria-label="打开设置"
        @click="$emit('open-settings')"
      >
        ⚙
      </button>
      <button
        type="button"
        class="icon-button"
        aria-label="退出应用"
        @click="$emit('close-window')"
      >
        ✕
      </button>
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
      :class="[item.theme, { 'is-selected': selectedIndex === index }]"
      :tabindex="selectedIndex === index ? 0 : -1"
      :ref="(element) => setCardRef(element as HTMLButtonElement, index)"
      :aria-label="`打开${item.name}`"
      :aria-current="selectedIndex === index ? 'true' : undefined"
      role="listitem"
      @click="$emit('open-site', item)"
      @focus="$emit('focus-card', index)"
    >
      <!-- 调试：显示原始数据 -->
      <div style="display: none;">
        <!-- {{ console.log('渲染 item:', item.name, item) }} -->
      </div>
      
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
import type { Shortcut } from '../homePageShared.ts';

defineProps<{
  currentTime: string;
  currentDate: string;
  shortcuts: Shortcut[];
  selectedIndex: number;
  setCardRef: (element: Element | null, index: number) => void;
}>();

defineEmits<{
  'open-settings': [];
  'close-window': [];
  'open-site': [item: Shortcut];
  'focus-card': [index: number];
}>();

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

function getIconSrc(item: Shortcut): string {
  // 优先使用自定义 icon
  if (item.icon) {
    return item.icon;
  }
  
  // 网站类型自动获取 favicon（使用 Google Favicon 服务，避免跨域问题）
  if (item.type === 'website' && item.url) {
    try {
      const url = new URL(item.url);
      // 使用 Google Favicon 服务，提供更稳定的图标获取
      const faviconUrl = `https://www.google.com/s2/favicons?domain=${url.hostname}&sz=128`;
      return faviconUrl;
    } catch (error) {
      console.error(`解析 URL 失败：${item.url}`, error);
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

function getFallbackIcon(item: Shortcut): string {
  if (item.icon) {
    return item.name.charAt(0).toUpperCase();
  }
  return item.name.charAt(0).toUpperCase();
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
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.top-left,
.top-actions {
  display: flex;
  gap: 14px;
  align-items: center;
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
