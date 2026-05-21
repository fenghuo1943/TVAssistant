<template>
  <div class="foreground-app-test">
    <h2>前台应用检测测试</h2>
    
    <div class="test-section">
      <h3>当前前台应用</h3>
      <div class="app-info">
        <p><strong>路径:</strong> {{ foregroundAppPath || '未检测到' }}</p>
        <button @click="getForegroundApp" :disabled="isLoading">
          {{ isLoading ? '获取中...' : '刷新' }}
        </button>
      </div>
    </div>

    <div class="test-section">
      <h3>本地应用匹配检测</h3>
      <div class="match-result">
        <p v-if="isMatchResult === null">点击按钮开始检测</p>
        <p v-else-if="isMatchResult" class="success">✓ 前台应用是已添加的本地应用</p>
        <p v-else class="error">✗ 前台应用不是已添加的本地应用</p>
        
        <button @click="checkIfLocalApp" :disabled="isLoading">
          {{ isLoading ? '检测中...' : '检测是否为本地应用' }}
        </button>
      </div>
    </div>

    <div class="test-section">
      <h3>自动监控模式</h3>
      <div class="monitor-controls">
        <button 
          @click="toggleMonitoring" 
          :class="{ active: isMonitoring }"
        >
          {{ isMonitoring ? '停止监控' : '开始监控' }}
        </button>
        <p class="monitor-status">
          状态: {{ isMonitoring ? '监控中' : '已停止' }}
        </p>
        <p v-if="lastDetectedApp" class="last-detected">
          最后检测: {{ lastDetectedApp }}
        </p>
      </div>
    </div>

    <div class="test-section">
      <h3>已添加的本地应用列表</h3>
      <div class="app-list">
        <div v-if="localApps.length === 0" class="empty">
          暂无本地应用，请先在设置中添加
        </div>
        <div v-for="(app, index) in localApps" :key="index" class="app-item">
          <span class="app-name">{{ app.name }}</span>
          <span class="app-path">{{ extractPath(app.url) }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, onUnmounted } from 'vue';
import type { AppSettings, Shortcut } from '../settings.ts';
import type { IpcRenderer } from '../plugins/types.ts';

const ipcRenderer = ((window as typeof window & { require?: (moduleName: string) => { ipcRenderer?: IpcRenderer } })
  .require?.('electron')?.ipcRenderer ?? null) as IpcRenderer | null;

// Props - 从父组件传入设置
const props = defineProps<{
  settings: AppSettings;
}>();

// 状态
const foregroundAppPath = ref('');
const isMatchResult = ref<boolean | null>(null);
const isLoading = ref(false);
const isMonitoring = ref(false);
const lastDetectedApp = ref('');
let monitorInterval: number | null = null;

// 获取所有本地应用
const localApps = computed(() => {
  return props.settings.customShortcuts.filter(sc => sc.type === 'application');
});

// 提取文件路径
function extractPath(url: string): string {
  if (url.startsWith('file:///')) {
    let path = decodeURIComponent(url.substring(8));
    if (process.platform === 'win32') {
      path = path.replace(/^\//, '');
    }
    return path;
  }
  return url;
}

// 获取前台应用路径
async function getForegroundApp() {
  try {
    isLoading.value = true;
    const path = await ipcRenderer?.invoke<string>('app:get-foreground-app-path');
    foregroundAppPath.value = path || '';
    console.log('前台应用路径:', path);
  } catch (error) {
    console.error('获取前台应用失败:', error);
  } finally {
    isLoading.value = false;
  }
}

// 检查是否为本地应用
async function checkIfLocalApp() {
  try {
    isLoading.value = true;
    
    // 获取所有本地应用的路径
    const localAppPaths = localApps.value.map(app => extractPath(app.url));
    
    if (localAppPaths.length === 0) {
      alert('请先添加本地应用');
      isMatchResult.value = null;
      return;
    }
    
    const isMatched = await ipcRenderer?.invoke<boolean>(
      'app:is-foreground-app-in-list',
      localAppPaths
    );
    
    isMatchResult.value = isMatched || false;
    console.log('匹配结果:', isMatched);
  } catch (error) {
    console.error('检测失败:', error);
    isMatchResult.value = null;
  } finally {
    isLoading.value = false;
  }
}

// 切换监控模式
function toggleMonitoring() {
  if (isMonitoring.value) {
    stopMonitoring();
  } else {
    startMonitoring();
  }
}

// 开始监控
async function startMonitoring() {
  const localAppPaths = localApps.value.map(app => extractPath(app.url));
  
  if (localAppPaths.length === 0) {
    alert('请先添加本地应用');
    return;
  }
  
  isMonitoring.value = true;
  
  // 立即执行一次
  await checkOnce(localAppPaths);
  
  // 每 2 秒检查一次
  monitorInterval = window.setInterval(async () => {
    await checkOnce(localAppPaths);
  }, 2000);
}

// 单次检查
async function checkOnce(localAppPaths: string[]) {
  try {
    const path = await ipcRenderer?.invoke<string>('app:get-foreground-app-path');
    const isMatched = await ipcRenderer?.invoke<boolean>(
      'app:is-foreground-app-in-list',
      localAppPaths
    );
    
    if (path) {
      foregroundAppPath.value = path;
      
      if (isMatched) {
        lastDetectedApp.value = `✓ ${path}`;
        console.log('检测到本地应用:', path);
      } else {
        lastDetectedApp.value = `✗ ${path}`;
      }
    }
  } catch (error) {
    console.error('监控检查失败:', error);
  }
}

// 停止监控
function stopMonitoring() {
  isMonitoring.value = false;
  if (monitorInterval) {
    clearInterval(monitorInterval);
    monitorInterval = null;
  }
}

// 组件卸载时清理
onUnmounted(() => {
  stopMonitoring();
});
</script>

<style scoped>
.foreground-app-test {
  padding: 20px;
  color: #f7fbff;
}

.test-section {
  margin-bottom: 30px;
  padding: 20px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.test-section h3 {
  margin-top: 0;
  margin-bottom: 15px;
  font-size: 16px;
  color: #2a95e8;
}

.app-info, .match-result, .monitor-controls {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

button {
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  background: linear-gradient(135deg, rgba(42, 149, 232, 0.9), rgba(99, 194, 111, 0.9));
  color: white;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  align-self: flex-start;
}

button:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(42, 149, 232, 0.4);
}

button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

button.active {
  background: linear-gradient(135deg, rgba(255, 59, 48, 0.9), rgba(255, 149, 0, 0.9));
}

.success {
  color: #63c26f;
  font-weight: 600;
}

.error {
  color: #ff3b30;
  font-weight: 600;
}

.monitor-status {
  margin: 10px 0;
  font-size: 14px;
  color: rgba(210, 220, 230, 0.7);
}

.last-detected {
  margin-top: 10px;
  padding: 10px;
  background: rgba(0, 0, 0, 0.2);
  border-radius: 6px;
  font-size: 13px;
  word-break: break-all;
}

.app-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.app-item {
  padding: 12px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.app-name {
  font-weight: 600;
  font-size: 14px;
}

.app-path {
  font-size: 12px;
  color: rgba(210, 220, 230, 0.6);
  word-break: break-all;
}

.empty {
  text-align: center;
  padding: 20px;
  color: rgba(210, 220, 230, 0.5);
  font-style: italic;
}
</style>
