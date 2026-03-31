<template>
  <section class="browser-shell">
    <div class="browser-frame">
      <webview
        :ref="setWebviewRef"
        class="browser-view"
        :src="activeUrl"
        allowpopups="false"
        @dom-ready="$emit('browser-ready')"
      />
      <div
        v-if="showLiveMenu"
        class="live-menu-overlay"
        aria-label="直播频道菜单"
        role="dialog"
        aria-modal="true"
      >
        <div class="live-menu-panel" role="region" aria-label="频道列表">
          <div class="live-menu-heading" aria-live="polite">{{ liveMenuHeading }}</div>

          <div class="live-menu-columns" role="group">
            <div class="live-menu-column live-menu-column-left" role="tablist" aria-label="频道分组">
              <button
                v-for="(group, index) in liveMenuGroups"
                :key="group.label"
                type="button"
                class="live-menu-item live-menu-group-item"
                :class="{
                  'is-selected': index === activeLiveGroupIndex,
                  'is-active': activeLiveColumn === 'group' && index === activeLiveGroupIndex
                }"
                :aria-label="`选择${group.label}`"
                :aria-current="index === activeLiveGroupIndex ? 'true' : undefined"
                role="tab"
                :tabindex="activeLiveColumn === 'group' && index === activeLiveGroupIndex ? 0 : -1"
              >
                {{ group.label }}
              </button>
            </div>

            <div class="live-menu-column live-menu-column-right" role="grid" aria-label="频道项目">
              <button
                v-for="(item, index) in liveMenuGroups[activeLiveGroupIndex]?.items ?? []"
                :key="`${liveMenuGroups[activeLiveGroupIndex]?.label}-${item}-${index}`"
                type="button"
                class="live-menu-item live-menu-channel-item"
                :class="{
                  'is-selected': index === activeLiveItemIndex,
                  'is-active': activeLiveColumn === 'item' && index === activeLiveItemIndex
                }"
                :aria-label="`选择${item}频道`"
                :aria-current="index === activeLiveItemIndex ? 'true' : undefined"
                :tabindex="activeLiveColumn === 'item' && index === activeLiveItemIndex ? 0 : -1"
                @click="$emit('select-live-channel', item)"
              >
                {{ item }}
              </button>
            </div>
          </div>
        </div>
      </div>

      <button
        :ref="setBackButtonRef"
        type="button"
        class="back-home-button"
        aria-label="返回主页"
        @click="$emit('go-home')"
      >
        返回主页
      </button>
    </div>
  </section>
</template>

<script lang="ts" setup>
import type { ComponentPublicInstance } from 'vue';

defineProps<{
  activeUrl: string;
  setBackButtonRef: (element: Element | ComponentPublicInstance | null) => void;
  setWebviewRef: (element: Element | ComponentPublicInstance | null) => void;
  showLiveMenu: boolean;
  liveMenuGroups: readonly {
    label: string;
    items: readonly string[];
  }[];
  activeLiveGroupIndex: number;
  activeLiveColumn: 'group' | 'item';
  activeLiveItemIndex: number;
  liveMenuHeading: string;
}>();

defineEmits<{
  'browser-ready': [];
  'go-home': [];
  'select-live-channel': [channelName: string];
}>();
</script>

<style scoped>
.browser-shell {
  position: relative;
  z-index: 1;
  min-height: 100vh;
}

.browser-frame {
  position: relative;
  min-height: inherit;
  width: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  border: none;
  border-radius: 0;
  background: transparent;
  box-shadow: none;
}

.browser-view {
  flex: 1;
  width: 100%;
  min-height: 100vh;
  border: none;
  background: #ffffff;
}

.live-menu-overlay {
  position: absolute;
  inset: 0;
  z-index: 3;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 34px 42px;
  pointer-events: none;
  background:
    linear-gradient(180deg, rgba(0, 0, 0, 0.58) 0%, rgba(0, 0, 0, 0.28) 34%, rgba(0, 0, 0, 0.1) 100%);
}

.live-menu-panel {
  min-width: min(820px, calc(100vw - 140px));
  max-width: 960px;
  padding: 22px 24px 26px;
  border: 1px solid rgba(98, 238, 177, 0.22);
  border-radius: 32px;
  background: linear-gradient(180deg, rgba(5, 15, 15, 0.86), rgba(4, 10, 11, 0.72));
  box-shadow:
    0 28px 60px rgba(0, 0, 0, 0.42),
    0 0 0 1px rgba(98, 238, 177, 0.08) inset;
  backdrop-filter: blur(12px);
  pointer-events: auto;
}

.live-menu-heading {
  margin-bottom: 18px;
  color: #d8f8c8;
  font-size: clamp(34px, 3vw, 50px);
  line-height: 1.1;
  letter-spacing: 0.06em;
  text-shadow: 0 0 24px rgba(141, 255, 168, 0.18);
}

.live-menu-columns {
  display: grid;
  grid-template-columns: 220px minmax(260px, 1fr);
  gap: 24px;
  align-items: start;
}

.live-menu-column {
  display: flex;
  flex-direction: column;
  gap: 14px;
  min-height: 240px;
  max-height: min(480px, 60vh);
  overflow-y: auto;
  padding-right: 4px;
}

.live-menu-column::-webkit-scrollbar {
  width: 6px;
}

.live-menu-column::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.03);
  border-radius: 3px;
}

.live-menu-column::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.12);
  border-radius: 3px;
}

.live-menu-column:hover::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.2);
}

.live-menu-column-left {
  padding-right: 10px;
  border-right: 1px solid rgba(255, 255, 255, 0.1);
}

.live-menu-item {
  min-height: 68px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 18px;
  background: rgba(255, 255, 255, 0.08);
  color: rgba(246, 249, 250, 0.9);
  font-size: 28px;
  text-align: left;
  cursor: pointer;
  pointer-events: auto;
  transition:
    border-color 0.18s ease,
    box-shadow 0.18s ease,
    background-color 0.18s ease,
    color 0.18s ease,
    transform 0.18s ease;
}

.live-menu-group-item {
  padding: 0 22px;
}

.live-menu-channel-item {
  width: min(320px, 100%);
  padding: 0 24px;
}

.live-menu-item.is-selected {
  background: rgba(255, 255, 255, 0.16);
}

.live-menu-item.is-active {
  border-color: rgba(103, 255, 158, 0.92);
  color: #ffffff;
  background: rgba(255, 255, 255, 0.18);
  box-shadow:
    0 0 18px rgba(103, 255, 158, 0.4),
    0 0 0 1px rgba(103, 255, 158, 0.2) inset;
  transform: translateX(2px);
}

.back-home-button {
  position: absolute;
  top: 50%;
  right: 18px;
  transform: translateY(-50%);
  width: 64px;
  min-height: 180px;
  border: 1px solid rgba(132, 244, 255, 0.26);
  border-radius: 22px;
  background: linear-gradient(180deg, rgba(16, 45, 55, 0.95), rgba(8, 24, 31, 0.94));
  color: #f4fbff;
  font-size: 24px;
  letter-spacing: 0.2em;
  writing-mode: vertical-rl;
  text-orientation: upright;
  cursor: pointer;
  box-shadow:
    0 18px 36px rgba(0, 0, 0, 0.28),
    0 0 0 1px rgba(124, 245, 255, 0.1) inset;
  transition: transform 0.2s ease, filter 0.2s ease, border-color 0.2s ease;
  z-index: 2;
}

.back-home-button:hover,
.back-home-button:focus-visible {
  transform: translate(-2px, -50%);
  filter: brightness(1.08);
  border-color: rgba(132, 244, 255, 0.56);
  outline: none;
}

@media (max-width: 640px) {
  .live-menu-overlay {
    padding: 16px;
  }

  .live-menu-panel {
    min-width: 100%;
    padding: 18px;
    border-radius: 24px;
  }

  .live-menu-heading {
    font-size: 30px;
  }

  .live-menu-columns {
    grid-template-columns: 1fr;
    gap: 16px;
  }

  .live-menu-column {
    min-height: auto;
  }

  .live-menu-column-left {
    padding-right: 0;
    padding-bottom: 10px;
    border-right: none;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  }

  .live-menu-item {
    min-height: 58px;
    font-size: 22px;
  }

  .live-menu-channel-item {
    width: 100%;
  }

  .back-home-button {
    top: auto;
    right: 14px;
    bottom: 14px;
    transform: none;
    width: calc(100% - 28px);
    min-height: 58px;
    writing-mode: horizontal-tb;
    text-orientation: mixed;
    letter-spacing: 0.12em;
  }

  .back-home-button:hover,
  .back-home-button:focus-visible {
    transform: translateY(-2px);
  }
}
</style>
