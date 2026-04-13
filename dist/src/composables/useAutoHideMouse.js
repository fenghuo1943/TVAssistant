import { ref, watch, onMounted, onBeforeUnmount } from 'vue';
/**
 * 自动隐藏鼠标 Hook
 * 功能：
 * 1. 鼠标停止移动指定时间后自动隐藏
 * 2. 鼠标移动时自动显示
 * 3. 可动态启用/禁用
 */
export function useAutoHideMouse(options = {}) {
    const { hideDelay = 3000, immediate = false } = options;
    const isEnabled = ref(immediate);
    const isMouseVisible = ref(true);
    let hideTimer = null;
    let isInitialized = false;
    let cssInsertionId = null;
    let webviewHandlerInjected = false;
    /**
     * 获取 webview 元素
     */
    const getWebview = () => {
        const webview = document.querySelector('webview');
        console.log('[AutoHideMouse] 尝试获取 webview 元素:', webview);
        return webview;
    };
    /**
     * 等待 webview 元素就绪
     */
    const waitForWebview = (maxRetries = 10, interval = 500) => {
        return new Promise((resolve) => {
            let retries = 0;
            const check = () => {
                const webview = getWebview();
                if (webview) {
                    console.log('[AutoHideMouse] webview 元素已就绪');
                    resolve(webview);
                }
                else if (retries < maxRetries) {
                    retries++;
                    console.log(`[AutoHideMouse] webview 未就绪，第 ${retries} 次重试...`);
                    setTimeout(check, interval);
                }
                else {
                    console.warn('[AutoHideMouse] 超过最大重试次数，webview 仍未就绪');
                    resolve(null);
                }
            };
            check();
        });
    };
    /**
     * 在 webview 中注入完整的鼠标自动隐藏逻辑
     */
    const injectWebviewAutoHideHandler = async () => {
        if (webviewHandlerInjected) {
            console.log('[AutoHideMouse] 处理器已注入，跳过');
            return;
        }
        console.log('[AutoHideMouse] 开始注入 webview 自动隐藏处理器');
        // 等待 webview 元素就绪
        const webview = await waitForWebview();
        if (!webview) {
            console.error('[AutoHideMouse] 无法获取 webview 元素，注入失败');
            return;
        }
        console.log('[AutoHideMouse] 在 webview 中注入自动隐藏处理器');
        // 在 webview 内部注入完整的 JavaScript 逻辑
        webview.executeJavaScript(`
      (function() {
        // 创建隐藏鼠标的样式
        const style = document.createElement('style');
        console.log('[WebView] 创建隐藏鼠标的样式');
        style.id = 'tv-assistant-auto-hide-cursor';
        style.textContent = \`
          .tv-assistant-cursor-hidden {
            cursor: none !important;
          }
          .tv-assistant-cursor-hidden * {
            cursor: none !important;
          }
        \`;
        document.head.appendChild(style);
        
        let hideTimer = null;
        let isHidden = false;
        const HIDE_DELAY = 3000; // 3秒后隐藏
        
        // 显示鼠标
        function showCursor() {
          if (isHidden) {
            document.body.classList.remove('tv-assistant-cursor-hidden');
            isHidden = false;
            console.log('[WebView] 鼠标已显示');
          }
        }
        
        // 隐藏鼠标
        function hideCursor() {
          if (!isHidden) {
            document.body.classList.add('tv-assistant-cursor-hidden');
            isHidden = true;
            console.log('[WebView] 鼠标已隐藏');
          }
        }
        
        // 重置计时器
        function resetTimer() {
          showCursor();
          
          if (hideTimer) {
            clearTimeout(hideTimer);
          }
          
          hideTimer = setTimeout(() => {
            hideCursor();
          }, HIDE_DELAY);
        }
        
        // 监听鼠标移动
        document.addEventListener('mousemove', function() {
          resetTimer();
        });
        
        // 立即启动计时器
        resetTimer();
        
        console.log('[WebView] 自动隐藏处理器已注入');
      })();
    `).then(() => {
            webviewHandlerInjected = true;
            console.log('[AutoHideMouse] webview 自动隐藏处理器注入成功');
        }).catch((err) => {
            console.error('[AutoHideMouse] webview 自动隐藏处理器注入失败:', err);
        });
    };
    /**
     * 显示鼠标
     */
    const showMouse = () => {
        if (!isMouseVisible.value) {
            console.log('[AutoHideMouse] 显示鼠标');
            isMouseVisible.value = true;
        }
    };
    /**
     * 隐藏鼠标
     */
    const hideMouse = () => {
        if (isMouseVisible.value && isEnabled.value) {
            console.log('[AutoHideMouse] 隐藏鼠标');
            isMouseVisible.value = false;
        }
    };
    /**
     * 重置隐藏计时器
     */
    const resetHideTimer = () => {
        console.log('[AutoHideMouse] 重置计时器, isEnabled:', isEnabled.value);
        // 先显示鼠标
        showMouse();
        // 清除旧计时器
        if (hideTimer !== null) {
            console.log('[AutoHideMouse] 清除旧计时器');
            clearTimeout(hideTimer);
        }
        // 设置新计时器
        if (isEnabled.value) {
            console.log(`[AutoHideMouse] 设置新计时器, ${hideDelay}ms 后隐藏`);
            hideTimer = setTimeout(() => {
                console.log('[AutoHideMouse] 计时器触发，准备隐藏鼠标');
                hideMouse();
            }, hideDelay);
        }
        else {
            console.log('[AutoHideMouse] 未启用，不设置计时器');
        }
    };
    /**
     * 鼠标移动处理函数
     */
    const handleMouseMove = () => {
        if (isEnabled.value) {
            console.log('[AutoHideMouse] 检测到鼠标移动');
            resetHideTimer();
        }
    };
    /**
     * 启用自动隐藏
     */
    const enable = () => {
        console.log('[AutoHideMouse] 调用 enable(), 当前状态:', isEnabled.value);
        if (!isEnabled.value) {
            isEnabled.value = true;
        }
        else {
            // 如果已经启用，重置计时器
            console.log('[AutoHideMouse] 已启用，重置计时器');
            resetHideTimer();
        }
    };
    /**
     * 禁用自动隐藏
     */
    const disable = () => {
        console.log('[AutoHideMouse] 调用 disable()');
        isEnabled.value = false;
        if (hideTimer !== null) {
            console.log('[AutoHideMouse] 清除计时器');
            clearTimeout(hideTimer);
            hideTimer = null;
        }
        showMouse();
    };
    /**
     * 切换启用状态
     */
    const toggle = () => {
        if (isEnabled.value) {
            disable();
        }
        else {
            enable();
        }
    };
    // 组件挂载时初始化
    onMounted(() => {
        console.log('[AutoHideMouse] 组件挂载, isEnabled:', isEnabled.value);
        isInitialized = true;
        if (isEnabled.value) {
            console.log('[AutoHideMouse] 添加鼠标移动事件监听器');
            document.addEventListener('mousemove', handleMouseMove);
            // 在 webview 中注入自动隐藏处理器
            injectWebviewAutoHideHandler();
            resetHideTimer();
        }
    });
    // 监听启用状态变化
    watch(isEnabled, (newValue) => {
        console.log('[AutoHideMouse] watch 触发, newValue:', newValue, ', isInitialized:', isInitialized);
        // 如果还没初始化完成，不执行
        if (!isInitialized) {
            console.log('[AutoHideMouse] 尚未初始化，跳过');
            return;
        }
        if (newValue) {
            console.log('[AutoHideMouse] 启用状态，添加事件监听器');
            document.addEventListener('mousemove', handleMouseMove);
            // 在 webview 中注入自动隐藏处理器
            injectWebviewAutoHideHandler();
            resetHideTimer();
        }
        else {
            console.log('[AutoHideMouse] 禁用状态，移除事件监听器');
            document.removeEventListener('mousemove', handleMouseMove);
            if (hideTimer !== null) {
                console.log('[AutoHideMouse] 清除计时器');
                clearTimeout(hideTimer);
                hideTimer = null;
            }
            showMouse();
        }
    });
    // 组件卸载时清理
    onBeforeUnmount(() => {
        console.log('[AutoHideMouse] 组件卸载，清理资源');
        document.removeEventListener('mousemove', handleMouseMove);
        if (hideTimer !== null) {
            console.log('[AutoHideMouse] 清除计时器');
            clearTimeout(hideTimer);
        }
        showMouse();
    });
    return {
        /** 是否启用自动隐藏 */
        isEnabled,
        /** 鼠标是否可见 */
        isMouseVisible,
        /** 启用自动隐藏 */
        enable,
        /** 禁用自动隐藏 */
        disable,
        /** 切换启用状态 */
        toggle,
        /** 手动显示鼠标 */
        showMouse,
        /** 手动隐藏鼠标 */
        hideMouse
    };
}
