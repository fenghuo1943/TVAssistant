<template>
  <aside 
    class="settings-sidebar" 
    aria-label="设置分类" 
    role="tablist"
  >
    <button
      v-for="(item, index) in menuItems"
      :key="item.key"
      type="button"
      class="sidebar-item"
      :class="{ 
        'is-active': activeMenu === item.key, 
        'is-focused': focusedIndex === index 
      }"
      :tabindex="focusedIndex === index ? 0 : -1"
      :ref="(el) => setItemRef(el as HTMLButtonElement, index)"
      @click="$emit('select-menu', item.key)"
      role="tab"
      :aria-selected="activeMenu === item.key"
      :aria-label="`打开${item.label}设置`"
    >
      {{ item.label }}
    </button>
  </aside>
</template>

<script lang="ts" setup>
type SettingsMenuKey = 'general' | 'site-management' | 'add-site' | 'add-local-app' | 'wallpaper';

const props = defineProps<{
  activeMenu: SettingsMenuKey;
  focusedIndex: number;
}>();

const emit = defineEmits<{
  'select-menu': [menu: SettingsMenuKey];
  'set-ref': [el: HTMLButtonElement, index: number];
}>();

const menuItems: Array<{ key: SettingsMenuKey; label: string }> = [
  { key: 'general', label: '常规' },
  { key: 'site-management', label: '网址管理' },
  { key: 'add-site', label: '添加新网址' },
  { key: 'add-local-app', label: '添加本地应用' },
  { key: 'wallpaper', label: '壁纸设置' }
];

function setItemRef(el: HTMLButtonElement, index: number) {
  emit('set-ref', el, index);
}
</script>

<style scoped>
.settings-sidebar {
  padding: 18px;
  background: rgba(29, 28, 27, 0.96);
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.sidebar-item {
  padding: 14px 16px;
  border-radius: 10px;
  background: transparent;
  text-align: left;
  font-size: 16px;
  color: rgba(223, 230, 236, 0.82);
  transition: background 0.2s ease, color 0.2s ease, transform 0.2s ease;
  border: none;
  cursor: pointer;
}

.sidebar-item:hover,
.sidebar-item:focus-visible,
.sidebar-item.is-active {
  background: linear-gradient(135deg, #2a95e8, #1882d8);
  color: #ffffff;
  transform: translateX(2px);
  outline: none;
}

.sidebar-item.is-focused {
  box-shadow: 0 0 0 3px rgba(42, 149, 232, 0.5);
}
</style>
