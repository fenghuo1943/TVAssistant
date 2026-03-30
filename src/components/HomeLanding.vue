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

  <section class="card-grid" aria-label="快捷入口">
    <button
      v-for="(item, index) in shortcuts"
      :key="item.name"
      type="button"
      class="site-card"
      :class="[item.theme, { 'is-selected': selectedIndex === index }]"
      :tabindex="selectedIndex === index ? 0 : -1"
      :ref="(element) => setCardRef(element, index)"
      @click="$emit('open-site', item)"
      @focus="$emit('focus-card', index)"
    >
      <div class="card-art">
        <div class="card-badge">{{ item.badge }}</div>
        <div class="card-title">{{ item.name }}</div>
      </div>
      <div class="card-label">{{ item.name }}</div>
    </button>
  </section>
</template>

<script lang="ts" setup>
import type { Shortcut } from '../homePageShared';

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
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 24px;
  align-items: end;
}

.site-card {
  border: none;
  background: transparent;
  padding: 0;
  color: inherit;
  cursor: pointer;
  text-align: center;
  transition: transform 0.24s ease, filter 0.24s ease;
  outline: none;
}

.site-card:hover {
  transform: translateY(-6px);
  filter: brightness(1.05);
}

.site-card.is-selected {
  transform: translateY(-6px);
  filter: brightness(1.08);
}

.site-card.is-selected .card-art {
  border-color: rgba(133, 247, 255, 0.72);
  box-shadow:
    0 24px 44px rgba(0, 0, 0, 0.34),
    0 0 0 2px rgba(122, 245, 255, 0.28),
    inset 0 1px 0 rgba(255, 255, 255, 0.18);
}

.site-card.is-selected .card-label {
  color: #ffffff;
}

.card-art {
  position: relative;
  overflow: hidden;
  min-height: 148px;
  border-radius: 18px;
  border: 1px solid rgba(255, 255, 255, 0.12);
  box-shadow:
    0 18px 36px rgba(0, 0, 0, 0.28),
    inset 0 1px 0 rgba(255, 255, 255, 0.12);
}

.card-art::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.06), rgba(0, 0, 0, 0.24));
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

@media (max-width: 1100px) {
  .hero-panel {
    width: min(66vw, 520px);
    margin-top: 24px;
    margin-left: 0;
  }

  .card-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 18px;
  }

  .card-art {
    min-height: 132px;
  }

  .card-label {
    font-size: 22px;
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
    grid-template-columns: 1fr;
  }
}
</style>
