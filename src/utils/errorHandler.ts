/**
 * 错误处理工具函数
 * 提供统一的错误处理、重试机制和用户友好的错误提示
 */

export type ErrorLevel = 'info' | 'warning' | 'error';

export interface ErrorOptions {
  level?: ErrorLevel;
  message?: string;
  retryable?: boolean;
  maxRetries?: number;
}

/**
 * 显示错误提示通知
 * @param message 错误消息
 * @param options 错误选项
 */
export function showError(message: string, options: ErrorOptions = {}): void {
  const { level = 'error' } = options;
  
  // 控制台输出
  console.error(`[${level}] ${message}`);
  
  // UI 通知（如果在浏览器环境中）
  if (typeof window !== 'undefined') {
    // 简单的 toast 通知
    const toast = document.createElement('div');
    toast.className = 'error-toast';
    toast.textContent = message;
    
    // 根据错误级别设置背景色
    const colors = {
      info: 'rgba(0, 122, 255, 0.9)',
      warning: 'rgba(255, 149, 0, 0.9)',
      error: 'rgba(255, 59, 48, 0.9)'
    };
    
    toast.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      padding: 12px 24px;
      background: ${colors[level]};
      color: white;
      border-radius: 8px;
      z-index: 9999;
      animation: slideIn 0.3s ease;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      font-size: 14px;
      max-width: 400px;
    `;
    
    document.body.appendChild(toast);
    setTimeout(() => {
      toast.style.animation = 'slideOut 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 3000);
  }
}

/**
 * 带重试机制的异步函数包装器
 * @param fn 要执行的异步函数
 * @param options 重试选项
 * @returns 函数执行结果
 */
export async function withRetry<T>(
  fn: () => Promise<T>,
  options: ErrorOptions = {}
): Promise<T> {
  const { maxRetries = 3, retryable = true, message } = options;
  let lastError: unknown;
  
  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;
      
      // 如果不可重试或已是最后一次尝试，则退出
      if (!retryable || attempt === maxRetries - 1) {
        break;
      }
      
      // 指数退避策略
      const delay = 1000 * (attempt + 1);
      console.warn(`重试中... (${attempt + 1}/${maxRetries})，${delay}ms 后重试`);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
  
  // 显示错误提示
  if (message) {
    showError(message, { ...options, level: 'error' });
  }
  
  throw lastError;
}

/**
 * 防抖函数
 * @param fn 要防抖的函数
 * @param delay 延迟时间（毫秒）
 * @returns 防抖后的函数
 */
export function debounce<T extends (...args: unknown[]) => unknown>(
  fn: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;
  
  return (...args: Parameters<T>) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      fn(...args);
      timeoutId = null;
    }, delay);
  };
}

/**
 * 节流函数
 * @param fn 要节流的函数
 * @param interval 最小间隔时间（毫秒）
 * @returns 节流后的函数
 */
export function throttle<T extends (...args: any[]) => any>(
  fn: T,
  interval: number
): (...args: Parameters<T>) => void {
  let lastCall = 0;
  let timeoutId: ReturnType<typeof setTimeout> | null = null;
  
  return (...args: Parameters<T>) => {
    const now = Date.now();
    const remaining = interval - (now - lastCall);
    
    if (remaining <= 0) {
      if (timeoutId) {
        clearTimeout(timeoutId);
        timeoutId = null;
      }
      lastCall = now;
      fn(...args);
    } else if (!timeoutId) {
      timeoutId = setTimeout(() => {
        lastCall = Date.now();
        fn(...args);
        timeoutId = null;
      }, remaining);
    }
  };
}
