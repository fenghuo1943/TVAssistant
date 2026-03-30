<template>
  <main class="home-shell" :class="{ 'is-browser-open': !!activeUrl }" tabindex="0" @keydown="handleKeydown">
    <HomeLanding
      v-if="!activeUrl"
      :current-time="currentTime"
      :current-date="currentDate"
      :shortcuts="shortcuts"
      :selected-index="selectedIndex"
      :set-card-ref="setCardRef"
      @refresh-time="updateTime"
      @close-window="closeWindow"
      @open-site="openSite"
      @focus-card="selectedIndex = $event"
    />

    <HomeBrowser
      v-else
      :active-url="activeUrl"
      :set-back-button-ref="setBackButtonRef"
      @go-home="goHome"
    />
  </main>
</template>

<script lang="ts" setup>
import { computed, nextTick, onBeforeUnmount, onMounted, ref, type ComponentPublicInstance } from 'vue';
import HomeBrowser from './components/HomeBrowser.vue';
import HomeLanding from './components/HomeLanding.vue';
import { shortcuts, type Shortcut } from './homePageShared.ts';

const now = ref(new Date());
const selectedIndex = ref(0);
const activeUrl = ref('');
const activeTitle = ref('');
const cardRefs = ref<HTMLButtonElement[]>([]);
const backButtonRef = ref<HTMLButtonElement | null>(null);
let timer: number | undefined;

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

const currentDate = computed(() => formatter.format(now.value));

function updateTime() {
  now.value = new Date();
}

function openSite(item: Shortcut) {
  activeUrl.value = item.url;
  activeTitle.value = item.name;

  nextTick(() => {
    backButtonRef.value?.focus();
  });
}

function goHome() {
  activeUrl.value = '';
  activeTitle.value = '';

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

function focusSelectedCard() {
  const card = cardRefs.value[selectedIndex.value];
  card?.focus();
}

function moveSelection(offset: number) {
  const total = shortcuts.length;
  selectedIndex.value = (selectedIndex.value + offset + total) % total;
  focusSelectedCard();
}

function handleKeydown(event: KeyboardEvent) {
  if (activeUrl.value) {
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
    openSite(shortcuts[selectedIndex.value]);
  }
}

function closeWindow() {
  window.close();
}

onMounted(() => {
  updateTime();
  timer = window.setInterval(updateTime, 1000);

  nextTick(() => {
    focusSelectedCard();
  });
});

onBeforeUnmount(() => {
  if (timer) {
    window.clearInterval(timer);
  }
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
