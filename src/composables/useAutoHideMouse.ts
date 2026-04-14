import { onBeforeUnmount, onMounted, ref, watch } from 'vue';

export interface UseAutoHideMouseOptions {
  hideDelay?: number;
  immediate?: boolean;
}

const HOST_CURSOR_STYLE_ID = 'tv-assistant-host-auto-hide-cursor-style';
const HOST_CURSOR_HIDDEN_CLASS = 'tv-assistant-host-cursor-hidden';

function ensureHostCursorStyle() {
  if (document.getElementById(HOST_CURSOR_STYLE_ID)) {
    return;
  }

  const style = document.createElement('style');
  style.id = HOST_CURSOR_STYLE_ID;
  style.textContent = `
    .${HOST_CURSOR_HIDDEN_CLASS},
    .${HOST_CURSOR_HIDDEN_CLASS} * {
      cursor: none !important;
    }
  `;

  document.head.appendChild(style);
}

function buildWebviewCursorScript(hideDelay: number) {
  return `
    (() => {
      const STYLE_ID = 'tv-assistant-webview-auto-hide-cursor-style';
      const HIDDEN_CLASS = 'tv-assistant-webview-cursor-hidden';

      if (!document.getElementById(STYLE_ID)) {
        const style = document.createElement('style');
        style.id = STYLE_ID;
        style.textContent = \`
          .\${HIDDEN_CLASS},
          .\${HIDDEN_CLASS} * {
            cursor: none !important;
          }
        \`;
        document.head.appendChild(style);
      }

      const root = document.documentElement;
      const state = window.__tvAssistantAutoHideCursor ?? {
        enabled: false,
        hideDelay: ${hideDelay}
      };

      state.hideDelay = ${hideDelay};

      let hideTimer = null;

      function clearHideTimer() {
        if (hideTimer) {
          clearTimeout(hideTimer);
          hideTimer = null;
        }
      }

      function showCursor() {
        root.classList.remove(HIDDEN_CLASS);
        clearHideTimer();
        hideTimer = setTimeout(() => {
          if (state.enabled) {
            root.classList.add(HIDDEN_CLASS);
          }
        }, state.hideDelay);
      }

      state.enable = () => {
        state.enabled = true;
        root.classList.remove(HIDDEN_CLASS);
        showCursor();
      };

      state.disable = () => {
        state.enabled = false;
        root.classList.remove(HIDDEN_CLASS);
        clearHideTimer();
      };

      state.show = () => {
        showCursor();
      };

      state.hide = () => {
        if (!state.enabled) {
          return;
        }
        clearHideTimer();
        root.classList.add(HIDDEN_CLASS);
      };

      window.__tvAssistantAutoHideCursor = state;
      
      document.addEventListener('mousemove', () => {
        if (state.enabled) {
          showCursor();
        }
      }, { passive: true });

      state.enable();
      return true;
    })();
  `;
}

function buildDisableWebviewCursorScript() {
  return `
    (() => {
      window.__tvAssistantAutoHideCursor?.disable?.();
      return true;
    })();
  `;
}

function buildSetWebviewCursorVisibilityScript(visible: boolean) {
  return `
    (() => {
      const controller = window.__tvAssistantAutoHideCursor;
      if (!controller) {
        return false;
      }

      if (${visible ? 'true' : 'false'}) {
        controller.show?.();
      } else {
        controller.hide?.();
      }

      return true;
    })();
  `;
}

declare global {
  interface Window {
    __tvAssistantAutoHideCursor?: {
      enabled: boolean;
      hideDelay: number;
      show?: () => void;
      hide?: () => void;
      enable?: () => void;
      disable?: () => void;
    };
    require?: (moduleName: string) => any;
  }
}

type CursorPoint = {
  x: number;
  y: number;
};

type RobotJsLike = {
  getMousePos: () => CursorPoint;
};

export function useAutoHideMouse(options: UseAutoHideMouseOptions = {}) {
  const {
    hideDelay = 3000,
    immediate = false
  } = options;

  const isEnabled = ref(immediate);
  const isMouseVisible = ref(true);
  const webviewRef = ref<Electron.WebviewTag | null>(null);
  const isWebviewReady = ref(false);

  let hideTimer: ReturnType<typeof setTimeout> | null = null;
  let pollTimer: ReturnType<typeof setInterval> | null = null;
  let isMounted = false;
  let lastCursorPoint: CursorPoint | null = null;

  const robot = (window.require?.('robotjs') ?? null) as RobotJsLike | null;

  function applyHostCursorVisibility(visible: boolean) {
    document.documentElement.classList.toggle(HOST_CURSOR_HIDDEN_CLASS, !visible);
    if (webviewRef.value) {
      webviewRef.value.style.cursor = visible ? '' : 'none';
    }
  }

  function clearHideTimer() {
    if (hideTimer) {
      clearTimeout(hideTimer);
      hideTimer = null;
    }
  }

  function clearPollTimer() {
    if (pollTimer) {
      clearInterval(pollTimer);
      pollTimer = null;
    }
  }

  async function syncWebviewCursorVisibility(visible: boolean) {
    const webview = webviewRef.value;
    if (!webview || !isWebviewReady.value) {
      return;
    }

    try {
      await webview.executeJavaScript(buildSetWebviewCursorVisibilityScript(visible), true);
    } catch (error) {
      console.error('[AutoHideMouse] webview cursor visibility sync failed:', error);
    }
  }

  function showMouse() {
    const wasVisible = isMouseVisible.value;
    isMouseVisible.value = true;
    applyHostCursorVisibility(true);
    if (!wasVisible) {
      void syncWebviewCursorVisibility(true);
    }
  }

  function hideMouse() {
    if (!isEnabled.value || !isMouseVisible.value) {
      return;
    }

    isMouseVisible.value = false;
    applyHostCursorVisibility(false);
    void syncWebviewCursorVisibility(false);
  }

  async function syncWebviewCursor(enabled: boolean) {
    const webview = webviewRef.value;
    if (!webview || !isWebviewReady.value) {
      return;
    }

    try {
      if (enabled) {
        await webview.executeJavaScript(buildWebviewCursorScript(hideDelay), true);
      } else {
        await webview.executeJavaScript(buildDisableWebviewCursorScript(), true);
      }
    } catch (error) {
      console.error('[AutoHideMouse] webview cursor sync failed:', error);
    }
  }

  function resetHideTimer() {
    if (!isEnabled.value) {
      return;
    }

    if (!isMouseVisible.value) {
      showMouse();
    }

    clearHideTimer();
    hideTimer = setTimeout(() => {
      hideMouse();
    }, hideDelay);
  }

  function handleCursorActivity() {
    resetHideTimer();
  }

  function handleMouseMove() {
    handleCursorActivity();
  }

  function startCursorPolling() {
    clearPollTimer();

    if (!robot) {
      return;
    }

    lastCursorPoint = robot.getMousePos();
    pollTimer = setInterval(() => {
      if (!isEnabled.value) {
        return;
      }

      const currentPoint = robot.getMousePos();
      if (!lastCursorPoint || currentPoint.x !== lastCursorPoint.x || currentPoint.y !== lastCursorPoint.y) {
        lastCursorPoint = currentPoint;
        handleCursorActivity();
      }
    }, 120);
  }

  function enable() {
    if (isEnabled.value) {
      resetHideTimer();
      void syncWebviewCursor(true);
      return;
    }

    isEnabled.value = true;
  }

  function disable() {
    if (!isEnabled.value) {
      showMouse();
      void syncWebviewCursor(false);
      return;
    }

    isEnabled.value = false;
    lastCursorPoint = null;
  }

  function toggle() {
    if (isEnabled.value) {
      disable();
      return;
    }

    enable();
  }

  function attachWebview(webview: Electron.WebviewTag | null) {
    webviewRef.value = webview;
    isWebviewReady.value = false;

    if (!webview) {
      return;
    }
  }

  function markWebviewReady() {
    isWebviewReady.value = true;

    if (isEnabled.value) {
      void syncWebviewCursor(true);
      void syncWebviewCursorVisibility(isMouseVisible.value);
    } else {
      void syncWebviewCursor(false);
    }
  }

  onMounted(() => {
    isMounted = true;
    ensureHostCursorStyle();
    applyHostCursorVisibility(true);

    if (isEnabled.value) {
      document.addEventListener('mousemove', handleMouseMove, { passive: true });
      startCursorPolling();
      resetHideTimer();
    }
  });

  watch(isEnabled, (enabled) => {
    if (!isMounted) {
      return;
    }

    if (enabled) {
      document.addEventListener('mousemove', handleMouseMove, { passive: true });
      startCursorPolling();
      resetHideTimer();
      void syncWebviewCursor(true);
      void syncWebviewCursorVisibility(isMouseVisible.value);
      return;
    }

    document.removeEventListener('mousemove', handleMouseMove);
    clearHideTimer();
    clearPollTimer();
    lastCursorPoint = null;
    showMouse();
    void syncWebviewCursor(false);
  });

  onBeforeUnmount(() => {
    document.removeEventListener('mousemove', handleMouseMove);
    clearHideTimer();
    clearPollTimer();
    lastCursorPoint = null;
    showMouse();
    void syncWebviewCursor(false);
  });

  return {
    isEnabled,
    isMouseVisible,
    enable,
    disable,
    toggle,
    showMouse,
    hideMouse,
    resetHideTimer,
    attachWebview,
    markWebviewReady
  };
}
