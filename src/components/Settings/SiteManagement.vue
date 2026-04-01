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
          <span class="site-icon">{{ getSiteIcon(site) }}</span>
          <div class="site-details">
            <span class="site-name">{{ site.name }}</span>
            <span class="site-type">{{ getSiteTypeLabel(site.type) }}</span>
          </div>
        </div>
        <div class="site-status">
          <span class="status-text" :class="site.isEnabled ? 'is-enabled' : 'is-disabled'">
            {{ site.isEnabled ? '已添加' : '未添加' }}
          </span>
          <button
            type="button"
            class="action-button edit"
            v-if="site.isCustom"
            @click.stop="openEditDialog(site, index)"
          >
            编辑
          </button>
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

    <!-- 编辑网址弹窗 -->
    <div v-if="isEditDialogOpen" class="dialog-overlay" @click="closeEditDialog" @keydown.capture="handleEditDialogKeydown" tabindex="-1">
      <div class="dialog-content" @click.stop role="dialog" aria-modal="true" aria-labelledby="edit-dialog-title" tabindex="0">
        <h3 id="edit-dialog-title" class="dialog-title">编辑网址</h3>
        
        <div class="form-row">
          <label class="form-label" for="edit-name-input">网站名称</label>
          <input
            id="edit-name-input"
            ref="editNameInputRef"
            type="text"
            class="form-input"
            :class="{ 'is-error': editErrors.name }"
            placeholder="例如：优酷"
            v-model="editFormData.name"
          />
          <div v-if="editErrors.name" class="form-error" role="alert">
            {{ editErrors.name }}
          </div>
        </div>

        <div class="form-row">
          <label class="form-label" for="edit-url-input">网址</label>
          <input
            id="edit-url-input"
            ref="editUrlInputRef"
            type="text"
            class="form-input"
            :class="{ 'is-error': editErrors.url }"
            placeholder="https:// 开头"
            v-model="editFormData.url"
          />
          <div v-if="editErrors.url" class="form-error" role="alert">
            {{ editErrors.url }}
          </div>
        </div>

        <div class="form-row">
          <label class="form-label" for="edit-icon-input">图标 URL（可选）</label>
          <input
            id="edit-icon-input"
            ref="editIconInputRef"
            type="text"
            class="form-input"
            :class="{ 'is-error': editErrors.icon }"
            placeholder="https://example.com/icon.png"
            v-model="editFormData.icon"
          />
          <div v-if="editErrors.icon" class="form-error" role="alert">
            {{ editErrors.icon }}
          </div>
        </div>

        <div class="form-actions">
          <button
            type="button"
            class="action-btn confirm-btn"
            ref="editConfirmBtnRef"
            @click="handleEditConfirm"
          >
            确认修改
          </button>
          <button
            type="button"
            class="action-btn cancel-btn"
            ref="editCancelBtnRef"
            @click="closeEditDialog"
          >
            取消
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { computed, nextTick, ref } from 'vue';
import { defaultShortcuts, type AppSettings, type Shortcut, type ShortcutType } from '../../settings.ts';

type SiteItem = {
  name: string;
  url: string;
  type?: ShortcutType;
  isEnabled: boolean;
  isCustom: boolean;
};

const props = defineProps<{
  settings: AppSettings;
  focusedIndex: number;
  isSecondaryFocused?: boolean;
}>();

const emit = defineEmits<{
  'update-setting': [value: Partial<AppSettings>];
  'set-ref': [el: HTMLDivElement, index: number];
  'item-removed': [index: number];
  'open-edit-dialog': [];
  'close-edit-dialog': [];
  'edit-dialog-state-change': [isOpen: boolean];
}>();

const availableShortcuts = computed<SiteItem[]>(() => {
  const allShortcuts: SiteItem[] = [
    ...defaultShortcuts.map(shortcut => ({
      name: shortcut.name,
      url: shortcut.url,
      type: shortcut.type,
      isEnabled: props.settings.enabledShortcuts.includes(shortcut.url),
      isCustom: false
    })),
    ...props.settings.customShortcuts.map(shortcut => ({
      name: shortcut.name,
      url: shortcut.url,
      type: shortcut.type,
      isEnabled: props.settings.enabledShortcuts.includes(shortcut.url),
      isCustom: true
    }))
  ];
  
  return allShortcuts;
});

function getSiteTypeLabel(type?: ShortcutType): string {
  return type === 'application' ? '本地应用' : '网站';
}

function getSiteIcon(site: SiteItem): string {
  if (site.type === 'application') {
    return '💻';
  }
  
  const iconMap: Record<string, string> = {
    'TV 直播': '📺',
    '央视片库': '🎬',
    '抖音': '🎵',
    '腾讯视频': '🎞️'
  };
  return iconMap[site.name] || '🌐';
}

function toggleSite(site: SiteItem) {
  const currentUrls = props.settings.enabledShortcuts;
  const currentCustomShortcuts = props.settings.customShortcuts;
  const currentIndex = availableShortcuts.value.findIndex(s => s.url === site.url);
  
  if (site.isEnabled) {
    // 移除操作
    if (site.isCustom) {
      // 用户自定义网址：从 enabledShortcuts 和 customShortcuts 中都移除
      const newUrls = currentUrls.filter(url => url !== site.url);
      const newCustomShortcuts = currentCustomShortcuts.filter(sc => sc.url !== site.url);
      emit('update-setting', { 
        enabledShortcuts: newUrls,
        customShortcuts: newCustomShortcuts
      });
      
      // 通知父组件该项已被删除，需要调整焦点
      nextTick(() => {
        emit('item-removed', currentIndex);
      });
    } else {
      // 系统默认网址：仅从 enabledShortcuts 中移除，保留重新添加能力
      const newUrls = currentUrls.filter(url => url !== site.url);
      emit('update-setting', { enabledShortcuts: newUrls });
    }
  } else {
    // 添加操作
    const newUrls = [...currentUrls, site.url];
    emit('update-setting', { enabledShortcuts: newUrls });
  }
}

function setSiteItemRef(el: HTMLDivElement, index: number) {
  emit('set-ref', el, index);
  // 同时保存到本地引用数组
  if (el) {
    siteItemRefs.value[index] = el;
  }
}

// 编辑弹窗相关
const isEditDialogOpen = ref(false);
const editingSiteIndex = ref(-1);
const editingSiteUrl = ref(''); // 保存原始 URL
const editNameInputRef = ref<HTMLInputElement | null>(null);
const editUrlInputRef = ref<HTMLInputElement | null>(null);
const editIconInputRef = ref<HTMLInputElement | null>(null);
const editConfirmBtnRef = ref<HTMLButtonElement | null>(null);
const editCancelBtnRef = ref<HTMLButtonElement | null>(null);
const siteItemRefs = ref<HTMLDivElement[]>([]); // 网址列表项引用

const editFormData = ref({
  name: '',
  url: '',
  icon: ''
});

const editErrors = ref({
  name: '',
  url: '',
  icon: ''
});

function openEditDialog(site: SiteItem, index: number) {
  // 计算在 customShortcuts 中的实际索引
  const defaultCount = defaultShortcuts.length;
  const customIndex = index - defaultCount;
  
  if (!site.isCustom || customIndex < 0 || customIndex >= props.settings.customShortcuts.length) {
    console.error('Invalid edit attempt for non-custom shortcut');
    return;
  }
  
  editingSiteIndex.value = customIndex;
  editingSiteUrl.value = site.url; // 保存原始 URL
  editFormData.value = {
    name: site.name,
    url: site.url,
    icon: ''
  };
  editErrors.value = {
    name: '',
    url: '',
    icon: ''
  };
  isEditDialogOpen.value = true;
  emit('edit-dialog-state-change', true);
  
  nextTick(() => {
    editNameInputRef.value?.focus();
    emit('open-edit-dialog');
  });
}

function closeEditDialog() {
  console.log('[SiteManagement] closeEditDialog called');
  isEditDialogOpen.value = false;
  editingSiteIndex.value = -1;
  editingSiteUrl.value = '';
  editFormData.value = {
    name: '',
    url: '',
    icon: ''
  };
  editErrors.value = {
    name: '',
    url: '',
    icon: ''
  };
  emit('close-edit-dialog');
  emit('edit-dialog-state-change', false);
  console.log('[SiteManagement] closeEditDialog emitted event');
  
  // 关闭弹窗后，恢复焦点到网址列表
  nextTick(() => {
    if (siteItemRefs.value.length > 0) {
      siteItemRefs.value[0]?.focus();
    }
  });
}

function validateEditForm(): boolean {
  const name = editFormData.value.name.trim();
  const url = editFormData.value.url.trim();
  
  if (!name) {
    editErrors.value.name = '请输入网站名称';
    return false;
  }
  
  if (name.length > 20) {
    editErrors.value.name = '网站名称不能超过 20 个字符';
    return false;
  }
  
  if (!url) {
    editErrors.value.url = '请输入网址';
    return false;
  }
  
  try {
    new URL(url);
  } catch {
    editErrors.value.url = '请输入有效的网址（以 http:// 或 https:// 开头）';
    return false;
  }
  
  editErrors.value.name = '';
  editErrors.value.url = '';
  return true;
}

function handleEditConfirm() {
  if (!validateEditForm()) {
    return;
  }
  
  const index = editingSiteIndex.value;
  if (index < 0 || index >= props.settings.customShortcuts.length) {
    return;
  }
  
  const oldUrl = editingSiteUrl.value;
  const newUrl = editFormData.value.url.trim();
  const wasEnabled = props.settings.enabledShortcuts.includes(oldUrl);
  
  // 更新自定义快捷方式
  const updatedShortcut = {
    ...props.settings.customShortcuts[index],
    name: editFormData.value.name.trim(),
    url: newUrl,
    icon: editFormData.value.icon.trim() || undefined
  };
  
  const newCustomShortcuts = [...props.settings.customShortcuts];
  newCustomShortcuts[index] = updatedShortcut;
  
  // 如果原来是启用状态，需要更新 enabledShortcuts
  let newEnabledShortcuts = props.settings.enabledShortcuts;
  if (wasEnabled) {
    // 移除旧 URL，添加新 URL
    newEnabledShortcuts = [
      ...newEnabledShortcuts.filter(url => url !== oldUrl),
      newUrl
    ];
  }
  
  emit('update-setting', {
    customShortcuts: newCustomShortcuts,
    enabledShortcuts: newEnabledShortcuts
  });
  
  closeEditDialog();
}

// 处理编辑弹窗的键盘导航
function handleEditDialogKeydown(event: KeyboardEvent) {
  if (!isEditDialogOpen.value) {
    return;
  }
  
  const { key } = event;
  const focusedElement = document.activeElement as HTMLElement;
  
  // 检查是否在输入框内
  const isInputElement = focusedElement?.tagName === 'INPUT';
  
  // Escape 键：关闭弹窗
  if (key === 'Escape') {
    event.preventDefault();
    closeEditDialog();
    return;
  }
  
  // Tab 键：阻止默认行为
  if (key === 'Tab') {
    event.preventDefault();
    return;
  }
  
  // Enter 键：如果在按钮上，触发点击；如果在输入框上，移动到下一个
  if (key === 'Enter') {
    event.preventDefault();
    if (focusedElement?.classList.contains('confirm-btn')) {
      (document.querySelector('.dialog-content .confirm-btn') as HTMLButtonElement)?.click();
    } else if (focusedElement?.classList.contains('cancel-btn')) {
      (document.querySelector('.dialog-content .cancel-btn') as HTMLButtonElement)?.click();
    } else {
      // 在输入框上，移动到下一个元素
      const elements = [
        document.querySelector('#edit-name-input'),
        document.querySelector('#edit-url-input'),
        document.querySelector('#edit-icon-input'),
        document.querySelector('.dialog-content .confirm-btn'),
        document.querySelector('.dialog-content .cancel-btn')
      ];
      const currentIndex = elements.findIndex(el => el === focusedElement);
      const nextIndex = (currentIndex + 1) % elements.length;
      (elements[nextIndex] as HTMLElement)?.focus();
    }
    return;
  }
  
  // 方向键：在元素之间切换
  if (key === 'ArrowUp' || key === 'ArrowDown') {
    // 始终阻止默认行为，只切换焦点
    event.preventDefault();
    const elements = [
      document.querySelector('#edit-name-input'),
      document.querySelector('#edit-url-input'),
      document.querySelector('#edit-icon-input'),
      document.querySelector('.dialog-content .confirm-btn'),
      document.querySelector('.dialog-content .cancel-btn')
    ];
    const focusedElement = document.activeElement as HTMLElement;
    const currentIndex = elements.findIndex(el => el === focusedElement);
    const direction = key === 'ArrowUp' ? -1 : 1;
    const nextIndex = ((currentIndex + direction) % elements.length + elements.length) % elements.length;
    (elements[nextIndex] as HTMLElement)?.focus();
    return;
  }
  
  // 左右方向键：如果在输入框内，允许默认行为（移动光标）
  // 如果在按钮上，在两个按钮之间切换
  if (key === 'ArrowLeft' || key === 'ArrowRight') {
    const isButton = focusedElement?.classList.contains('confirm-btn') || focusedElement?.classList.contains('cancel-btn');
    
    if (isButton) {
      event.preventDefault();
      const confirmBtn = document.querySelector('.dialog-content .confirm-btn') as HTMLElement;
      const cancelBtn = document.querySelector('.dialog-content .cancel-btn') as HTMLElement;
      
      if (key === 'ArrowLeft') {
        confirmBtn?.focus();
      } else if (key === 'ArrowRight') {
        cancelBtn?.focus();
      }
    }
    // 如果在输入框内，不阻止默认行为，允许移动光标
    return;
  }
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

.site-details {
  display: flex;
  flex-direction: column;
  gap: 4px;
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

.site-type {
  font-size: 13px;
  color: rgba(200, 210, 220, 0.7);
  font-weight: 500;
}

.site-status {
  display: flex;
  align-items: center;
  gap: 12px;
}

.action-button.edit {
  background: rgba(42, 149, 232, 0.15);
  color: #2a95e8;
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

.action-button.edit:hover,
.action-button.edit:focus-visible,
.action-button.edit.is-focused {
  background: rgba(42, 149, 232, 0.25);
}

/* 编辑弹窗样式 */
.dialog-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.dialog-content {
  background: rgba(30, 30, 40, 0.98);
  border-radius: 16px;
  padding: 32px;
  width: 100%;
  max-width: 500px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
}

.dialog-title {
  font-size: 24px;
  font-weight: 700;
  color: rgba(247, 251, 255, 0.94);
  margin: 0 0 24px 0;
}

.form-row {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 20px;
}

.form-label {
  font-size: 14px;
  font-weight: 600;
  color: rgba(200, 210, 220, 0.9);
}

.form-input {
  padding: 12px 16px;
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(255, 255, 255, 0.05);
  color: rgba(247, 251, 255, 0.94);
  font-size: 15px;
  outline: none;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

.form-input:focus,
.form-input:focus-visible {
  border-color: rgba(42, 149, 232, 0.5);
  box-shadow: 0 0 0 3px rgba(42, 149, 232, 0.2);
}

.form-input.is-error {
  border-color: rgba(239, 68, 68, 0.5);
}

.form-error {
  font-size: 13px;
  color: rgba(239, 68, 68, 0.9);
  margin-top: 4px;
}

.form-actions {
  display: flex;
  gap: 12px;
  margin-top: 24px;
}

.action-btn {
  flex: 1;
  padding: 12px 24px;
  border: none;
  border-radius: 10px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease;
  outline: none;
}

.action-btn.confirm-btn {
  background: linear-gradient(135deg, #2a95e8, #1882d8);
  color: #ffffff;
}

.action-btn.cancel-btn {
  background: rgba(255, 255, 255, 0.08);
  color: rgba(241, 245, 248, 0.92);
}

.action-btn:hover,
.action-btn:focus-visible,
.action-btn.is-focused {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.action-btn.confirm-btn:hover,
.action-btn.confirm-btn:focus-visible,
.action-btn.confirm-btn.is-focused {
  background: linear-gradient(135deg, #3aa3f0, #1c90e8);
}

.action-btn.cancel-btn:hover,
.action-btn.cancel-btn:focus-visible,
.action-btn.cancel-btn.is-focused {
  background: rgba(255, 255, 255, 0.12);
}
</style>
