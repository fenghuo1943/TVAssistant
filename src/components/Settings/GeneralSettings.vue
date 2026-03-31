<template>
  <section class="settings-card" :class="{ 'is-secondary-focused': props.isSecondaryFocused }" role="tabpanel" id="panel-general">
    <div class="setting-row">
      <div class="setting-copy">
        <div class="setting-label" id="launch-module-label">打开应用后直接启动</div>
        <div class="setting-desc">选择后可在启动应用时直接进入对应模块。</div>
      </div>
      <select
        class="setting-select"
        :value="settings.launchModuleId"
        @change="handleLaunchModuleChange"
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
        :class="{ 'is-on': settings.startAtLogin }"
        :aria-pressed="settings.startAtLogin"
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
          :class="{ 'is-active': settings.homeMode === 'game' }"
          @click="$emit('update-setting', { homeMode: 'game' })"
        >
          游戏模式
        </button>
        <button
          type="button"
          class="mode-option"
          :class="{ 'is-active': settings.homeMode === 'tv' }"
          @click="$emit('update-setting', { homeMode: 'tv' })"
        >
          电视模式
        </button>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { launchModuleOptions, type AppSettings } from '../../settings.ts';

const props = defineProps<{
  settings: AppSettings;
  isSecondaryFocused?: boolean;
}>();

const emit = defineEmits<{
  'update-setting': [value: Partial<AppSettings>];
}>();

function handleLaunchModuleChange(event: Event) {
  const nextValue = (event.target as HTMLSelectElement).value;

  emit('update-setting', {
    launchModuleId: nextValue,
    openModuleOnLaunch: nextValue !== ''
  });
}
</script>

<style scoped>
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

.setting-select:focus-visible,
.setting-select:focus {
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

.switch-button:focus-visible,
.switch-button:focus {
  box-shadow: 0 0 0 3px rgba(42, 149, 232, 0.5);
  outline: none;
}

.switch-button.is-on {
  background: linear-gradient(135deg, #31a4f5, #1fb7cb);
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
  border: none;
  cursor: pointer;
}

.mode-option:focus-visible,
.mode-option:focus {
  box-shadow: 0 0 0 3px rgba(42, 149, 232, 0.5);
  outline: none;
}

.mode-option.is-active {
  background: linear-gradient(135deg, #63c26f, #2aa95d);
  color: #ffffff;
}
</style>
