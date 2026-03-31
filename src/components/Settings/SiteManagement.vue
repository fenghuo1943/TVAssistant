<template>
  <section class="settings-card" :class="{ 'is-secondary-focused': props.isSecondaryFocused }" role="tabpanel" id="panel-site-management">
    <div class="site-list">
      <div
        v-for="(site, index) in availableShortcuts"
        :key="site.url"
        class="site-item"
        :class="{ 'is-focused': focusedIndex === index }"
        :ref="(el) => setSiteItemRef(el as HTMLDivElement, index)"
        :tabindex="focusedIndex === index ? 0 : -1"
      >
        <div class="site-info">
          <span class="site-icon">{{ getSiteIcon(site.name) }}</span>
          <span class="site-name">{{ site.name }}</span>
        </div>
        <div class="site-status">
          <span class="status-text" :class="site.isEnabled ? 'is-enabled' : 'is-disabled'">
            {{ site.isEnabled ? '已添加' : '未添加' }}
          </span>
          <button
            type="button"
            class="action-button"
            :class="[site.isEnabled ? 'remove' : 'add']"
            @click.stop="toggleSite(site)"
          >
            {{ site.isEnabled ? '移除' : '添加' }}
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { defaultShortcuts, type AppSettings } from '../../settings.ts';

type SiteItem = {
  name: string;
  url: string;
  isEnabled: boolean;
};

const props = defineProps<{
  settings: AppSettings;
  focusedIndex: number;
  isSecondaryFocused?: boolean;
}>();

const emit = defineEmits<{
  'update-setting': [value: Partial<AppSettings>];
  'set-ref': [el: HTMLDivElement, index: number];
}>();

const availableShortcuts = computed<SiteItem[]>(() => {
  return defaultShortcuts.map(shortcut => ({
    name: shortcut.name,
    url: shortcut.url,
    isEnabled: props.settings.enabledShortcuts.includes(shortcut.url)
  }));
});

function getSiteIcon(name: string): string {
  const iconMap: Record<string, string> = {
    'TV 直播': '📺',
    '央视片库': '🎬',
    '抖音': '🎵',
    '腾讯视频': '🎞️'
  };
  return iconMap[name] || '🌐';
}

function toggleSite(site: SiteItem) {
  const currentUrls = props.settings.enabledShortcuts;
  let newUrls: string[];
  
  if (site.isEnabled) {
    // 移除
    newUrls = currentUrls.filter(url => url !== site.url);
  } else {
    // 添加
    newUrls = [...currentUrls, site.url];
  }
  
  emit('update-setting', { enabledShortcuts: newUrls });
}

function setSiteItemRef(el: HTMLDivElement, index: number) {
  emit('set-ref', el, index);
}
</script>

<style scoped>
.site-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.site-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 20px;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.06);
  transition: background 0.2s ease, border-color 0.2s ease, transform 0.2s ease;
  outline: none;
}

.site-item:hover,
.site-item:focus-visible,
.site-item.is-focused {
  background: rgba(255, 255, 255, 0.06);
  border-color: rgba(42, 149, 232, 0.5);
  transform: translateX(2px);
}

.site-item.is-focused {
  box-shadow: 0 0 0 3px rgba(42, 149, 232, 0.3);
}

.site-info {
  display: flex;
  align-items: center;
  gap: 14px;
}

.site-icon {
  font-size: 24px;
  line-height: 1;
}

.site-name {
  font-size: 17px;
  font-weight: 600;
  color: rgba(247, 251, 255, 0.94);
}

.site-status {
  display: flex;
  align-items: center;
  gap: 12px;
}

.status-text {
  font-size: 14px;
  font-weight: 500;
}

.status-text.is-enabled {
  color: rgba(99, 194, 111, 0.92);
}

.status-text.is-disabled {
  color: rgba(210, 220, 230, 0.68);
}

.action-button {
  padding: 8px 18px;
  border: none;
  border-radius: 10px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease;
  outline: none;
}

.action-button.add {
  background: linear-gradient(135deg, #2a95e8, #1882d8);
  color: #ffffff;
}

.action-button.remove {
  background: rgba(255, 255, 255, 0.08);
  color: rgba(241, 245, 248, 0.92);
}

.action-button:hover,
.action-button:focus-visible,
.action-button.is-focused {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.action-button.add:hover,
.action-button.add:focus-visible,
.action-button.add.is-focused {
  background: linear-gradient(135deg, #3aa3f0, #1c90e8);
}

.action-button.remove:hover,
.action-button.remove:focus-visible,
.action-button.remove.is-focused {
  background: rgba(255, 255, 255, 0.12);
}
</style>
