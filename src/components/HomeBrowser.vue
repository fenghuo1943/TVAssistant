<template>
  <section class="browser-shell">
    <div class="browser-frame">
      <webview
        class="browser-view"
        :src="activeUrl"
        allowpopups="false"
      />

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
}>();

defineEmits<{
  'go-home': [];
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
