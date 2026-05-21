/**
 * 前台应用检测 Composable
 * 
 * 使用方法:
 * ```typescript
 * import { useForegroundAppDetection } from '../composables/useForegroundAppDetection';
 * 
 * const { isLocalAppActive, startMonitoring, stopMonitoring } = useForegroundAppDetection(settings);
 * ```
 */

import { ref, onUnmounted, type Ref } from 'vue';
import type { AppSettings } from '../settings.ts';
import type { IpcRenderer } from '../plugins/types.ts';

// 获取 ipcRenderer
const ipcRenderer = ((window as typeof window & { require?: (moduleName: string) => { ipcRenderer?: IpcRenderer } })
  .require?.('electron')?.ipcRenderer ?? null) as IpcRenderer | null;

export function useForegroundAppDetection(settings: Ref<AppSettings>) {
  // 状态
  const isLocalAppActive = ref(false);
  const currentForegroundApp = ref('');
  let monitorInterval: number | null = null;
  
  /**
   * 从设置中提取所有本地应用的路径
   */
  function getLocalAppPaths(): string[] {
    return settings.value.customShortcuts
      .filter(sc => sc.type === 'application')
      .map(sc => {
        // 将 file:// URL 转换为本地路径
        if (sc.url.startsWith('file:///')) {
          let path = decodeURIComponent(sc.url.substring(8));
          if (process.platform === 'win32') {
            path = path.replace(/^\//, '');
          }
          return path;
        }
        return sc.url;
      });
  }
  
  /**
   * 获取当前前台应用路径
   */
  async function getCurrentForegroundApp(): Promise<string> {
    try {
      const appPath = await ipcRenderer?.invoke<string>('app:get-foreground-app-path');
      currentForegroundApp.value = appPath || '';
      return appPath || '';
    } catch (error) {
      console.error('获取前台应用路径失败:', error);
      return '';
    }
  }
  
  /**
   * 检查前台应用是否为本地应用
   */
  async function checkIfLocalApp(): Promise<boolean> {
    const localAppPaths = getLocalAppPaths();
    
    if (localAppPaths.length === 0) {
      return false;
    }
    
    try {
      const isMatched = await ipcRenderer?.invoke<boolean>(
        'app:is-foreground-app-in-list',
        localAppPaths
      );
      
      isLocalAppActive.value = isMatched || false;
      return isMatched || false;
    } catch (error) {
      console.error('检查前台应用失败:', error);
      return false;
    }
  }
  
  /**
   * 开始监控前台应用
   * @param intervalMs 检查间隔（毫秒），默认 2000ms
   */
  async function startMonitoring(intervalMs: number = 2000) {
    const localAppPaths = getLocalAppPaths();
    
    if (localAppPaths.length === 0) {
      console.log('[ForegroundApp] 没有本地应用，跳过监控');
      return;
    }
    
    console.log(`[ForegroundApp] 开始监控，间隔: ${intervalMs}ms`);
    
    // 立即执行一次
    await checkIfLocalApp();
    
    // 设置定时检查
    monitorInterval = window.setInterval(async () => {
      try {
        await checkIfLocalApp();
        
        // 可选：记录前台应用路径
        if (currentForegroundApp.value) {
          console.log('[ForegroundApp] 当前前台应用:', currentForegroundApp.value);
        }
      } catch (error) {
        console.error('[ForegroundApp] 监控检查失败:', error);
      }
    }, intervalMs);
  }
  
  /**
   * 停止监控
   */
  function stopMonitoring() {
    if (monitorInterval) {
      clearInterval(monitorInterval);
      monitorInterval = null;
      console.log('[ForegroundApp] 已停止监控');
    }
  }
  
  /**
   * 手动触发一次检查
   */
  async function manualCheck() {
    await getCurrentForegroundApp();
    await checkIfLocalApp();
  }
  
  // 组件卸载时自动清理
  onUnmounted(() => {
    stopMonitoring();
  });
  
  return {
    // 状态
    isLocalAppActive,
    currentForegroundApp,
    
    // 方法
    startMonitoring,
    stopMonitoring,
    manualCheck,
    getCurrentForegroundApp,
    checkIfLocalApp,
    getLocalAppPaths
  };
}
