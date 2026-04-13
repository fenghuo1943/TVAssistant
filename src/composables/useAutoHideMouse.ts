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
        timer: null,
        hideDelay: ${hideDelay},
        lastPointerX: null,
        lastPointerY: null,
        onPointerActivity: null,
        pointerEvents: ['mousemove', 'mousedown', 'mouseup', 'wheel']
      };

      state.hideDelay = ${hideDelay};

      const showCursor = () => {
        root.classList.remove(HIDDEN_CLASS);
      };

      const hideCursor = () => {
        root.classList.add(HIDDEN_CLASS);
      };

      const clearTimer = () => {
        if (state.timer) {
          clearTimeout(state.timer);
          state.timer = null;
        }
      };

      const resetTimer = () => {
        if (!state.enabled) {
          return;
        }

        showCursor();
        clearTimer();
        state.timer = window.setTimeout(() => {
          hideCursor();
        }, state.hideDelay);
      };

      if (!state.onMouseMove) {
        state.onPointerActivity = (event) => {
          if (event.type === 'mousemove') {
            if (state.lastPointerX === event.clientX && state.lastPointerY === event.clientY) {
              return;
            }

            state.lastPointerX = event.clientX;
            state.lastPointerY = event.clientY;
          }

          resetTimer();
        };
      }

      state.enable = () => {
        if (!state.enabled) {
          state.pointerEvents.forEach((eventName) => {
            document.addEventListener(eventName, state.onPointerActivity, { passive: true, capture: true });
          });
          state.enabled = true;
        }

        resetTimer();
      };

      state.disable = () => {
        state.enabled = false;
        state.pointerEvents.forEach((eventName) => {
          document.removeEventListener(eventName, state.onPointerActivity, true);
        });
        clearTimer();
        state.lastPointerX = null;
        state.lastPointerY = null;
        showCursor();
      };

      window.__tvAssistantAutoHideCursor = state;
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

declare global {
  interface Window {
    __tvAssistantAutoHideCursor?: {
      enabled: boolean;
      timer: number | null;
      hideDelay: number;
      lastPointerX?: number | null;
      lastPointerY?: number | null;
      onPointerActivity?: ((event: MouseEvent | WheelEvent) => void) | null;
      pointerEvents?: string[];
      enable?: () => void;
      disable?: () => void;
    };
  }
}

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
  let isMounted = false;

  function applyHostCursorVisibility(visible: boolean) {
    document.documentElement.classList.toggle(HOST_CURSOR_HIDDEN_CLASS, !visible);
  }

  function clearHideTimer() {
    if (hideTimer) {
      clearTimeout(hideTimer);
      hideTimer = null;
    }
  }

  function showMouse() {
    isMouseVisible.value = true;
    applyHostCursorVisibility(true);
  }

  function hideMouse() {
    if (!isEnabled.value) {
      return;
    }

    isMouseVisible.value = false;
    applyHostCursorVisibility(false);
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

    showMouse();
    clearHideTimer();
    hideTimer = setTimeout(() => {
      hideMouse();
    }, hideDelay);
  }

  function handleMouseMove() {
    resetHideTimer();
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
      resetHideTimer();
    }
  });

  watch(isEnabled, (enabled) => {
    if (!isMounted) {
      return;
    }

    if (enabled) {
      document.addEventListener('mousemove', handleMouseMove, { passive: true });
      resetHideTimer();
      void syncWebviewCursor(true);
      return;
    }

    document.removeEventListener('mousemove', handleMouseMove);
    clearHideTimer();
    showMouse();
    void syncWebviewCursor(false);
  });

  onBeforeUnmount(() => {
    document.removeEventListener('mousemove', handleMouseMove);
    clearHideTimer();
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
