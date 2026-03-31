<template>
  <section class="settings-card" :class="{ 'is-secondary-focused': props.isSecondaryFocused }" role="tabpanel" id="panel-add-site">
    <div class="add-site-form">
      <div class="form-header">
        <h2 class="form-title">添加新网址</h2>
        <span class="form-hint">需要用鼠标键盘</span>
      </div>

      <div class="form-row">
        <label class="form-label" for="site-name-input" id="site-name-label">网站名称</label>
        <input
          id="site-name-input"
          ref="siteNameInputRef"
          type="text"
          class="form-input"
          :class="{ 'is-error': errors.name }"
          placeholder="例如：优酷"
          v-model="formData.name"
        />
        <div v-if="errors.name" class="form-error" role="alert">
          {{ errors.name }}
        </div>
      </div>

      <div class="form-row">
        <label class="form-label" for="site-url-input" id="site-url-label">网址</label>
        <input
          id="site-url-input"
          ref="siteUrlInputRef"
          type="text"
          class="form-input"
          :class="{ 'is-error': errors.url }"
          placeholder="https:// 开头"
          v-model="formData.url"
        />
        <div v-if="errors.url" class="form-error" role="alert">
          {{ errors.url }}
        </div>
      </div>

      <div class="form-actions">
        <button
          type="button"
          class="action-btn confirm-btn"
          ref="confirmBtnRef"
          @click="handleSubmit"
        >
          确认添加
        </button>
        <button
          type="button"
          class="action-btn cancel-btn"
          ref="cancelBtnRef"
          @click="handleCancel"
        >
          取消
        </button>
      </div>

      <div v-if="submitMessage" class="form-message" :class="submitMessageType" role="status">
        {{ submitMessage }}
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { defaultShortcuts, type AppSettings, type Shortcut } from '../../settings.ts';

const props = defineProps<{
  settings: AppSettings;
  isSecondaryFocused?: boolean;
}>();

const emit = defineEmits<{
  'update-setting': [value: Partial<AppSettings>];
}>();

const formData = ref({
  name: '',
  url: ''
});

const errors = ref({
  name: '',
  url: ''
});

const submitMessage = ref('');
const submitMessageType = ref<'success' | 'error'>('success');

const siteNameInputRef = ref<HTMLInputElement | null>(null);
const siteUrlInputRef = ref<HTMLInputElement | null>(null);
const confirmBtnRef = ref<HTMLButtonElement | null>(null);
const cancelBtnRef = ref<HTMLButtonElement | null>(null);

function validateName(): boolean {
  const name = formData.value.name.trim();
  
  if (!name) {
    errors.value.name = '请输入网站名称';
    return false;
  }
  
  if (name.length > 20) {
    errors.value.name = '网站名称不能超过 20 个字符';
    return false;
  }
  
  // 检查是否已存在同名网站
  const existingShortcut = defaultShortcuts.find(s => s.name === name);
  if (existingShortcut) {
    errors.value.name = '该网站名称已存在';
    return false;
  }
  
  errors.value.name = '';
  return true;
}

function validateUrl(): boolean {
  const url = formData.value.url.trim();
  
  if (!url) {
    errors.value.url = '请输入网址';
    return false;
  }
  
  if (!url.startsWith('https://')) {
    errors.value.url = '网址必须以 https:// 开头';
    return false;
  }
  
  try {
    new URL(url);
  } catch {
    errors.value.url = '请输入有效的网址格式';
    return false;
  }
  
  // 检查是否已存在相同网址
  const existingShortcut = defaultShortcuts.find(s => s.url === url);
  if (existingShortcut) {
    errors.value.url = '该网址已存在';
    return false;
  }
  
  errors.value.url = '';
  return true;
}

function handleSubmit() {
  submitMessage.value = '';
  
  // 只在提交时验证
  if (!validateName() || !validateUrl()) {
    submitMessageType.value = 'error';
    //submitMessage.value = '请修正表单中的错误';
    return;
  }
  
  // 添加到默认快捷方式列表
  const newShortcut: Shortcut = {
    name: formData.value.name.trim(),
    badge: formData.value.name.trim().toUpperCase().slice(0, 4),
    url: formData.value.url.trim(),
    theme: 'theme-custom'
  };
  
  defaultShortcuts.push(newShortcut);
  
  // 自动启用该快捷方式
  const newUrls = [...new Set([...props.settings.enabledShortcuts, newShortcut.url])];
  emit('update-setting', { enabledShortcuts: newUrls });
  
  // 显示成功消息
  submitMessageType.value = 'success';
  submitMessage.value = `已成功添加 ${newShortcut.name}`;
  
  // 清空表单
  formData.value = {
    name: '',
    url: ''
  };
  errors.value = {
    name: '',
    url: ''
  };
}

function handleCancel() {
  formData.value = {
    name: '',
    url: ''
  };
  errors.value = {
    name: '',
    url: ''
  };
  submitMessage.value = '';
}

// 暴露引用和方法给父组件用于焦点管理
defineExpose({
  siteNameInputRef,
  siteUrlInputRef,
  confirmBtnRef,
  cancelBtnRef,
  handleSubmit,
  handleCancel
});
</script>

<style scoped>
.add-site-form {
  display: flex;
  flex-direction: column;
  gap: 28px;
}

.form-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 8px;
}

.form-title {
  font-size: 20px;
  font-weight: 700;
  color: #f7fbff;
  margin: 0;
}

.form-hint {
  font-size: 13px;
  color: rgba(210, 220, 230, 0.68);
  font-weight: 500;
}

.form-row {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.form-label {
  font-size: 16px;
  font-weight: 600;
  color: rgba(247, 251, 255, 0.94);
}

.form-input {
  padding: 14px 18px;
  border-radius: 12px;
  border: 1px solid rgba(79, 152, 209, 0.45);
  background: rgba(12, 20, 27, 0.9);
  color: #f4f8fb;
  font-size: 15px;
  outline: none;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

.form-input::placeholder {
  color: rgba(210, 220, 230, 0.5);
}

.form-input.is-error {
  border-color: rgba(255, 59, 48, 0.8);
  box-shadow: 0 0 0 3px rgba(255, 59, 48, 0.2);
}

.form-error {
  font-size: 13px;
  color: rgba(255, 59, 48, 0.92);
  font-weight: 500;
  margin-top: -4px;
}

.form-actions {
  display: flex;
  gap: 14px;
  margin-top: 8px;
}

.action-btn {
  padding: 12px 28px;
  border: none;
  border-radius: 12px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  outline: none;
  position: relative;
}

.action-btn.confirm-btn {
  background: linear-gradient(135deg, rgba(99, 194, 111, 0.92), rgba(49, 164, 245, 0.92));
  color: #ffffff;
  box-shadow: 0 2px 8px rgba(49, 164, 245, 0.3);
}

.action-btn.cancel-btn {
  background: rgba(255, 59, 48, 0.9);
  color: #ffffff;
  box-shadow: 0 2px 8px rgba(255, 59, 48, 0.3);
}

.action-btn:hover,
.action-btn:focus-visible,
.action-btn.is-focused {
  transform: translateY(-2px) scale(1.02);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
}

.action-btn.confirm-btn:hover,
.action-btn.confirm-btn:focus-visible,
.action-btn.confirm-btn.is-focused {
  background: linear-gradient(135deg, rgba(79, 214, 91, 0.95), rgba(59, 174, 255, 0.95));
  box-shadow: 
    0 0 0 3px rgba(42, 149, 232, 0.4),
    0 8px 24px rgba(42, 149, 232, 0.4),
    0 0 40px rgba(42, 149, 232, 0.2);
}

.action-btn.cancel-btn:hover,
.action-btn.cancel-btn:focus-visible,
.action-btn.cancel-btn.is-focused {
  background: rgba(255, 79, 68, 0.95);
  box-shadow: 
    0 0 0 3px rgba(255, 59, 48, 0.4),
    0 8px 24px rgba(255, 59, 48, 0.4),
    0 0 40px rgba(255, 59, 48, 0.2);
}

.form-message {
  padding: 14px 18px;
  border-radius: 10px;
  font-size: 14px;
  font-weight: 600;
  text-align: center;
  margin-top: 8px;
}

.form-message.success {
  background: rgba(99, 194, 111, 0.15);
  color: rgba(99, 194, 111, 0.92);
  border: 1px solid rgba(99, 194, 111, 0.3);
}

.form-message.error {
  background: rgba(255, 59, 48, 0.15);
  color: rgba(255, 59, 48, 0.92);
  border: 1px solid rgba(255, 59, 48, 0.3);
}
</style>
