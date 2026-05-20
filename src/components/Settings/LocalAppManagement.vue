<template>
  <section class="settings-card" :class="{ 'is-secondary-focused': props.isSecondaryFocused }" role="tabpanel" id="panel-local-app-management">
    <div class="local-app-header">
      <h2 class="local-app-title">本地应用管理</h2>
      <button 
        type="button" 
        class="add-app-button" 
        @click="handleAddApp"
        :disabled="isAddingApp"
      >
        {{ isAddingApp ? '添加中...' : '添加应用' }}
      </button>
    </div>

    <div class="local-app-list">
      <div
        v-for="(app, index) in localApps"
        :key="app.url"
        class="local-app-item"
        :class="{ 'is-focused': focusedIndex === index }"
        :ref="(el) => setAppItemRef(el as HTMLDivElement, index)"
        :tabindex="-1"
      >
        <div class="app-icon-container">
          <img 
            v-if="app.icon" 
            :src="app.icon" 
            :alt="app.name"
            class="app-icon"
            @error="handleIconError($event, app)"
          />
          <div v-else class="app-icon-placeholder">
            💻
          </div>
        </div>
        
        <div class="app-info">
          <div class="app-name">{{ app.name }}</div>
          <div class="app-path">{{ app.path || app.url }}</div>
        </div>
        
        <button
          type="button"
          class="delete-button"
          @click.stop="handleDeleteApp(app, index)"
          :disabled="isDeleting"
        >
          删除
        </button>
      </div>
      
      <div v-if="localApps.length === 0" class="empty-state">
        <p>暂无本地应用</p>
        <p class="empty-hint">点击“添加应用”按钮来添加本地应用程序</p>
      </div>
    </div>
      
    <!-- 添加应用的消息提示 -->
    <div v-if="addMessage" class="add-message" :class="addMessageType" role="status">
      {{ addMessage }}
    </div>
  </section>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue';
import type { AppSettings, Shortcut } from '../../settings.ts';
import type { IpcRenderer } from '../../plugins/types.ts';

// 获取 ipcRenderer
const ipcRenderer = ((window as typeof window & { require?: (moduleName: string) => { ipcRenderer?: IpcRenderer } })
  .require?.('electron')?.ipcRenderer ?? null) as IpcRenderer | null;

const props = defineProps<{
  settings: AppSettings;
  focusedIndex: number;
  isSecondaryFocused?: boolean;
}>();

const emit = defineEmits<{
  'update-setting': [value: Partial<AppSettings>];
  'set-ref': [el: HTMLDivElement, index: number];
  'item-removed': [index: number];
}>();

const isAddingApp = ref(false);
const isDeleting = ref(false);
const appItemRefs = ref<HTMLDivElement[]>([]);
const addMessage = ref('');
const addMessageType = ref<'success' | 'error' | ''>('');

// 从设置中提取本地应用（type为application的快捷方式）
const localApps = computed(() => {
  const allShortcuts = [
    ...props.settings.customShortcuts.filter(sc => sc.type === 'application'),
    // 也可以包含默认的本地应用示例
  ];
  
  return allShortcuts.map(shortcut => ({
    name: shortcut.name,
    url: shortcut.url,
    path: extractPathFromUrl(shortcut.url),
    icon: shortcut.icon,
    type: shortcut.type
  }));
});

function extractPathFromUrl(url: string): string {
  if (url.startsWith('file:///')) {
    return decodeURIComponent(url.substring(8));
  }
  return url;
}

function handleIconError(event: Event, app: any) {
  const imgElement = event.target as HTMLImageElement;
  imgElement.style.display = 'none';
}

async function handleAddApp() {
  if (isAddingApp.value) return;
  
  try {
    isAddingApp.value = true;
    
    // 打开文件选择对话框
    const exePath = await ipcRenderer?.invoke<string>('file:select-exe');
    
    if (!exePath) {
      // 用户取消了选择
      console.log('用户取消了文件选择');
      return;
    }
    
    console.log('选择的文件路径:', exePath);
    
    // 从可执行文件中提取图标
    let iconUrl = '';
    try {
      console.log('正在提取图标...');
      const extractedIcon = await ipcRenderer?.invoke<string>('icon:extract-from-exe', exePath);
      if (extractedIcon) {
        iconUrl = extractedIcon;
        console.log('图标提取成功:', iconUrl);
      } else {
        console.warn('图标提取失败，将使用默认图标');
      }
    } catch (error) {
      console.error('提取图标时出错:', error);
    }
    
    // 从路径中提取文件名作为应用名称
    const fileName = exePath.split(/[\\/]/).pop() || '未知应用';
    const appName = fileName.replace(/\.exe$/i, '');
    
    // 创建 file:// URL
    const fileUrl = `file:///${exePath.replace(/\\/g, '/')}`;
    
    // 创建新的快捷方式
    const newApp: Shortcut = {
      name: appName,
      badge: appName.toUpperCase().slice(0, 4),
      url: fileUrl,
      theme: 'theme-local',
      type: 'application',
      icon: iconUrl
    };
    
    const newCustomShortcuts = JSON.parse(JSON.stringify([
      ...props.settings.customShortcuts,
      newApp
    ]));
    
    const newUrls = [...new Set([...props.settings.enabledShortcuts, newApp.url])];
    emit('update-setting', { 
      customShortcuts: newCustomShortcuts,
      enabledShortcuts: newUrls 
    });
    
    console.log('成功添加本地应用:', newApp);
    
    // 显示成功消息
    addMessageType.value = 'success';
    addMessage.value = `已成功添加 ${appName}`;
    
    // 3秒后清除消息
    setTimeout(() => {
      addMessage.value = '';
      addMessageType.value = '';
    }, 3000);
    
  } catch (error) {
    console.error('添加本地应用失败:', error);
    
    // 显示错误消息
    addMessageType.value = 'error';
    addMessage.value = '添加应用失败，请重试';
    
    setTimeout(() => {
      addMessage.value = '';
      addMessageType.value = '';
    }, 3000);
  } finally {
    isAddingApp.value = false;
  }
}

async function handleDeleteApp(app: any, index: number) {
  if (isDeleting.value) return;
  
  try {
    isDeleting.value = true;
    
    // 从自定义快捷方式中移除
    const newCustomShortcuts = props.settings.customShortcuts.filter(sc => sc.url !== app.url);
    const newUrls = props.settings.enabledShortcuts.filter(url => url !== app.url);
    
    emit('update-setting', { 
      customShortcuts: newCustomShortcuts,
      enabledShortcuts: newUrls 
    });
    
    emit('item-removed', index);
    
  } catch (error) {
    console.error('删除本地应用失败:', error);
  } finally {
    isDeleting.value = false;
  }
}

function setAppItemRef(el: HTMLDivElement, index: number) {
  if (el) {
    appItemRefs.value[index] = el;
    emit('set-ref', el, index);
  }
}

// 暴露引用给父组件用于焦点管理
defineExpose({
  appItemRefs
});
</script>

<style scoped>
.local-app-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  padding-bottom: 16px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.local-app-title {
  font-size: 20px;
  font-weight: 700;
  color: #f7fbff;
  margin: 0;
}

.add-app-button {
  padding: 10px 20px;
  border: none;
  border-radius: 10px;
  background: linear-gradient(135deg, rgba(99, 194, 111, 0.92), rgba(49, 164, 245, 0.92));
  color: white;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 2px 8px rgba(49, 164, 245, 0.3);
}

.add-app-button:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 4px 16px rgba(49, 164, 245, 0.4);
}

.add-app-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
}

.local-app-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.local-app-item {
  display: flex;
  align-items: center;
  padding: 16px;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.08);
  transition: all 0.2s ease;
}

.local-app-item.is-focused {
  border-color: rgba(42, 149, 232, 0.6);
  box-shadow: 0 0 0 2px rgba(42, 149, 232, 0.3);
  background: rgba(42, 149, 232, 0.1);
}

.app-icon-container {
  width: 48px;
  height: 48px;
  margin-right: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.app-icon {
  width: 40px;
  height: 40px;
  border-radius: 8px;
  object-fit: cover;
}

.app-icon-placeholder {
  width: 40px;
  height: 40px;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
}

.app-info {
  flex: 1;
  min-width: 0;
}

.app-name {
  font-size: 16px;
  font-weight: 600;
  color: #f7fbff;
  margin-bottom: 4px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.app-path {
  font-size: 13px;
  color: rgba(210, 220, 230, 0.7);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.delete-button {
  padding: 8px 16px;
  border: none;
  border-radius: 8px;
  background: rgba(255, 59, 48, 0.9);
  color: white;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  margin-left: 16px;
  flex-shrink: 0;
}

.delete-button:hover:not(:disabled) {
  background: rgba(255, 79, 68, 0.95);
  transform: scale(1.05);
}

.delete-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
}

.empty-state {
  text-align: center;
  padding: 40px 20px;
  color: rgba(210, 220, 230, 0.6);
}

.empty-state p {
  margin: 8px 0;
}

.empty-hint {
  font-size: 14px;
  color: rgba(210, 220, 230, 0.4);
}

.add-message {
  margin-top: 16px;
  padding: 12px 18px;
  border-radius: 10px;
  font-size: 14px;
  font-weight: 600;
  text-align: center;
  animation: slideIn 0.3s ease;
}

.add-message.success {
  background: rgba(99, 194, 111, 0.15);
  color: rgba(99, 194, 111, 0.92);
  border: 1px solid rgba(99, 194, 111, 0.3);
}

.add-message.error {
  background: rgba(255, 59, 48, 0.15);
  color: rgba(255, 59, 48, 0.92);
  border: 1px solid rgba(255, 59, 48, 0.3);
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
