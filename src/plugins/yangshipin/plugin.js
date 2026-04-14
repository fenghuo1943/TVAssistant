(function registerYangshipinPlugin() {
  window.__tvAssistantPlugins = window.__tvAssistantPlugins || {};
  if (window.__tvAssistantPlugins.yangshipin) {
    return;
  }

  const OVERLAY_ID = 'tv-assistant-yangshipin-overlay';
  const STYLE_ID = 'tv-assistant-yangshipin-style';
  const HIDDEN_CLASS = 'tv-assistant-yangshipin-hidden';
  const SELECTOR_CANDIDATES = [
    '.tv-main-con-r-list-left',
    '.tv-main-con-r-list',
    '[class*="tv-main-con-r-list"]',
    '[class*="channel"]',
    '[class*="list"]'
  ];
  const CCTV_PATTERN = /^(CCTV|CGTN)/i;
  const SATELLITE_PATTERN = /(卫视)$/;

  const state = {
    initialized: false,
    config: {
      volume: 0.6
    },
    overlay: null,
    volumeIndicator: null,
    lastBoundVideo: null,
    videoObserver: null
  };

  function clampVolume(volume) {
    if (typeof volume !== 'number' || Number.isNaN(volume)) {
      return state.config.volume;
    }

    return Math.max(0, Math.min(1, volume));
  }

  function normalizeText(text) {
    return String(text || '')
      .replace(/\s+/g, ' ')
      .replace(/\([^)]*\)/g, '')
      .replace(/[（(][^）)]*[）)]/g, '')
      .replace(/高清|超清|标清|4K|HD/gi, '')
      .trim();
  }

  function isChannelName(name) {
    if (!name || name.length > 20) {
      return false;
    }

    if (/VIP|充值|登录|扫码|下载|打开APP|节目单|更多/.test(name)) {
      return false;
    }

    return CCTV_PATTERN.test(name) || SATELLITE_PATTERN.test(name);
  }

  function dedupe(values) {
    return [...new Set(values)];
  }

  function injectStyles() {
    if (document.getElementById(STYLE_ID)) {
      return;
    }

    const style = document.createElement('style');
    style.id = STYLE_ID;
    style.textContent = `
      #${OVERLAY_ID} {
        position: fixed;
        inset: 0;
        z-index: 2147483646;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 26px;
        background:
          radial-gradient(circle at center, rgba(16, 31, 28, 0.28), rgba(0, 0, 0, 0.92) 70%),
          linear-gradient(180deg, rgba(0, 0, 0, 0.76), rgba(0, 0, 0, 0.96));
        color: #f7fff8;
        font-family: "Segoe UI", "PingFang SC", "Microsoft YaHei", sans-serif;
        pointer-events: none;
      }

      #${OVERLAY_ID}[hidden] {
        display: none !important;
      }

      #${OVERLAY_ID} .spinner {
        width: 72px;
        height: 72px;
        border: 5px solid rgba(255, 255, 255, 0.18);
        border-top-color: #7dff9c;
        border-radius: 50%;
        box-shadow: 0 0 32px rgba(125, 255, 156, 0.18);
        animation: tv-assistant-spin 1s linear infinite;
      }

      #${OVERLAY_ID} .loading-text {
        font-size: 22px;
        letter-spacing: 0.18em;
        text-transform: uppercase;
        color: rgba(238, 248, 239, 0.72);
      }

      #${OVERLAY_ID} .channel-title {
        font-size: clamp(44px, 5vw, 88px);
        font-weight: 700;
        letter-spacing: 0.08em;
        text-align: center;
        text-shadow: 0 0 28px rgba(125, 255, 156, 0.18);
      }

      .${HIDDEN_CLASS} {
        opacity: 0 !important;
        pointer-events: none !important;
        visibility: hidden !important;
      }

      .tv-assistant-volume-indicator {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 2147483647;
        min-width: 180px;
        padding: 16px 28px;
        border-radius: 16px;
        background: rgba(0, 0, 0, 0.72);
        color: #ffffff;
        font-size: 34px;
        font-weight: 700;
        text-align: center;
        opacity: 0;
        transition: opacity 0.2s ease;
        pointer-events: none;
      }

      .tv-assistant-volume-indicator.visible {
        opacity: 1;
      }

      @keyframes tv-assistant-spin {
        to {
          transform: rotate(360deg);
        }
      }
    `;

    document.head.appendChild(style);
  }

  function ensureOverlay() {
    injectStyles();

    if (state.overlay?.isConnected) {
      return state.overlay;
    }

    const overlay = document.createElement('div');
    overlay.id = OVERLAY_ID;

    const title = document.createElement('div');
    title.className = 'channel-title';

    const spinner = document.createElement('div');
    spinner.className = 'spinner';

    const loadingText = document.createElement('div');
    loadingText.className = 'loading-text';
    loadingText.textContent = 'Loading';

    overlay.appendChild(title);
    overlay.appendChild(spinner);
    overlay.appendChild(loadingText);
    document.body.appendChild(overlay);
    state.overlay = overlay;

    return overlay;
  }

  function showOverlay(channelName = '') {
    const overlay = ensureOverlay();
    const title = overlay.querySelector('.channel-title');
    if (title) {
      title.textContent = channelName;
    }

    overlay.hidden = false;
  }

  function hideOverlay() {
    const overlay = ensureOverlay();
    overlay.hidden = true;
  }

  function ensureVolumeIndicator() {
    if (state.volumeIndicator?.isConnected) {
      return state.volumeIndicator;
    }

    const indicator = document.createElement('div');
    indicator.className = 'tv-assistant-volume-indicator';
    document.body.appendChild(indicator);
    state.volumeIndicator = indicator;
    return indicator;
  }

  function showVolumeIndicator(volume) {
    const indicator = ensureVolumeIndicator();
    indicator.textContent = volume === 0 ? '静音' : `音量 ${Math.round(volume * 100)}`;
    indicator.classList.add('visible');

    window.clearTimeout(indicator.__hideTimer);
    indicator.__hideTimer = window.setTimeout(() => {
      indicator.classList.remove('visible');
    }, 1200);
  }

  function isEssentialElement(element) {
    // 判断是否是必要元素（如遮罩层、音量指示器等）
    return element.id === OVERLAY_ID || element === state.volumeIndicator;
  }

  function hideUnrelatedElements(container, video) {
    // 查找并隐藏容器内所有与视频无关的UI元素
    const selectorsToHide = [
      '.header',
      '.header-b',
      '.header-b-l',
      '.header-b-m',
      '.header-b-r',
      'nav',
      'aside',
      'footer',
      '[class*="header"]'
    ];

    selectorsToHide.forEach(selector => {
      const elements = container.querySelectorAll(selector);
      elements.forEach(el => {
        // 确保不隐藏包含视频的祖先元素
        if (!el.contains(video) && !isEssentialElement(el)) {
          el.style.setProperty('display', 'none', 'important');
        }
      });
    });
  }

  function applyFullscreen(video) {
    if (!(video instanceof HTMLVideoElement)) {
      return false;
    }

    // 查找并点击全屏按钮
     /* const fullscreenButton = document.querySelector('div[data-v-03d5f916].full.full2');
    if (fullscreenButton) {
      // 模拟点击事件
      const clickEvent = new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
        view: window
      });
      fullscreenButton.dispatchEvent(clickEvent);
      return true;
    } */

    // 如果找不到指定的全屏按钮，回退到原来的CSS全屏方案
    for (const child of document.body.children) {
      if (child.id === OVERLAY_ID || child === state.volumeIndicator) {
        continue;
      }

      if (child.contains(video)) {
        child.classList.remove(HIDDEN_CLASS);
        // 新增：在包含视频的容器中，隐藏与视频无关的子元素
        hideUnrelatedElements(child, video);
        continue;
      }

      child.classList.add(HIDDEN_CLASS);
    }

    let current = video;
    while (current && current !== document.body) {
      current.style.setProperty('position', 'static', 'important');
      current.style.setProperty('display', 'block', 'important');
      current.style.setProperty('width', '100%', 'important');
      current.style.setProperty('height', '100%', 'important');
      current.style.setProperty('max-width', 'none', 'important');
      current.style.setProperty('max-height', 'none', 'important');
      current.style.setProperty('margin', '0', 'important');
      current.style.setProperty('padding', '0', 'important');
      current.style.setProperty('opacity', '1', 'important');
      current.style.setProperty('visibility', 'visible', 'important');
      current = current.parentElement;
    }

    document.documentElement.style.setProperty('width', '100%', 'important');
    document.documentElement.style.setProperty('height', '100%', 'important');
    document.documentElement.style.setProperty('overflow', 'hidden', 'important');
    document.body.style.setProperty('width', '100%', 'important');
    document.body.style.setProperty('height', '100%', 'important');
    document.body.style.setProperty('margin', '0', 'important');
    document.body.style.setProperty('padding', '0', 'important');
    document.body.style.setProperty('overflow', 'hidden', 'important');
    document.body.style.setProperty('background', '#000', 'important');

    video.style.setProperty('position', 'fixed', 'important');
    video.style.setProperty('inset', '0', 'important');
    video.style.setProperty('width', '100vw', 'important');
    video.style.setProperty('height', '100vh', 'important');
    video.style.setProperty('object-fit', 'cover', 'important');
    video.style.setProperty('z-index', '2147483644', 'important'); 

    return true;
  }

  function extractCurrentChannelName() {
    const candidates = ['.tvSelect', '[class*="select"]', '[class*="active"]', '[aria-selected="true"]'];
    for (const selector of candidates) {
      const element = document.querySelector(selector);
      const text = normalizeText(element?.textContent || '');
      if (isChannelName(text)) {
        return text;
      }
    }

    return '';
  }

  function applyConfiguredVolume(video) {
    if (!(video instanceof HTMLVideoElement)) {
      return;
    }

    const volume = clampVolume(state.config.volume);
    video.volume = volume;
    video.muted = volume === 0;
  }

  function bindVideo(video) {
    if (!(video instanceof HTMLVideoElement)) {
      return;
    }

    state.lastBoundVideo = video;
    applyConfiguredVolume(video);
    applyFullscreen(video);

    if (video.dataset.tvAssistantBound === 'true') {
      return;
    }

    video.dataset.tvAssistantBound = 'true';

    const showLoading = () => showOverlay(extractCurrentChannelName());
    const hideLoading = () => hideOverlay();

    video.addEventListener('loadstart', showLoading);
    video.addEventListener('waiting', showLoading);
    video.addEventListener('seeking', showLoading);
    video.addEventListener('stalled', showLoading);
    video.addEventListener('playing', hideLoading);
    video.addEventListener('canplay', hideLoading);
    video.addEventListener('play', hideLoading); 
  }

  function ensureVideoWatcher() {
    if (state.videoObserver) {
      return;
    } 

    state.videoObserver = new MutationObserver(() => {
      const video = document.querySelector('video');
      if (video) {
        bindVideo(video);
      }
    });

    state.videoObserver.observe(document.body, {
      childList: true,
      subtree: true
    });
  }

  function collectFromContainer(container) {
    const names = [];
    const nodes = container.querySelectorAll('div, span, a, button, li');

    nodes.forEach((node) => {
      const text = normalizeText(node.textContent || '');
      if (isChannelName(text)) {
        names.push(text);
      }
    });

    return dedupe(names);
  }

  function findBestContainer() {
    for (const selector of SELECTOR_CANDIDATES) {
      const containers = document.querySelectorAll(selector);
      for (const container of containers) {
        const names = collectFromContainer(container);
        if (names.length >= 8) {
          return { container, names };
        }
      }
    }

    return null;
  }

  function collectFromWholePage() {
    const names = [];
    const nodes = document.querySelectorAll('div, span, a, button, li');

    nodes.forEach((node) => {
      const text = normalizeText(node.textContent || '');
      if (isChannelName(text)) {
        names.push(text);
      }
    });

    return dedupe(names);
  }

  function getChannelEntries() {
    const entries = [];
    const nodes = document.querySelectorAll('div, span, a, button, li');

    nodes.forEach((node) => {
      const text = normalizeText(node.textContent || '');
      if (!isChannelName(text)) {
        return;
      }

      let clickable = node;
      while (
        clickable &&
        clickable !== document.body &&
        clickable.tagName !== 'A' &&
        clickable.tagName !== 'BUTTON' &&
        clickable.getAttribute('role') !== 'button' &&
        typeof clickable.onclick !== 'function'
      ) {
        clickable = clickable.parentElement;
      }

      entries.push({
        name: text,
        element: clickable && clickable !== document.body ? clickable : node
      });
    });

    return entries.filter((entry, index, array) => array.findIndex((item) => item.name === entry.name) === index);
  }

  function buildMenuData(channelNames) {
    const result = {
      currentChannel: extractCurrentChannelName(),
      央视频道: [],
      卫视频道: []
    };

    channelNames.forEach((name) => {
      if (CCTV_PATTERN.test(name)) {
        result.央视频道.push(name);
        return;
      }

      if (SATELLITE_PATTERN.test(name)) {
        result.卫视频道.push(name);
      }
    });

    result.央视频道 = dedupe(result.央视频道);
    result.卫视频道 = dedupe(result.卫视频道);
    return result;
  }

  function getMenuData() {
    const bestContainer = findBestContainer();
    const channelNames = bestContainer?.names?.length ? bestContainer.names : collectFromWholePage();
    return buildMenuData(channelNames);
  }

  function waitForMenuData(timeoutMs = 15000) {
    return new Promise((resolve, reject) => {
      const startedAt = Date.now();

      const tryResolve = () => {
        const data = getMenuData();
        if (data.央视频道.length > 0 || data.卫视频道.length > 0) {
          resolve(data);
          return true;
        }

        return false;
      };

      if (tryResolve()) {
        return;
      }

      const observer = new MutationObserver(() => {
        if (tryResolve()) {
          observer.disconnect();
          clearInterval(timer);
        }
      });

      const timer = window.setInterval(() => {
        if (Date.now() - startedAt > timeoutMs) {
          observer.disconnect();
          clearInterval(timer);
          reject(new Error('等待频道列表超时'));
        }
      }, 500);

      observer.observe(document.body, {
        childList: true,
        subtree: true
      });
    });
  }

  function simulateClick(element) {
    const event = new MouseEvent('click', {
      bubbles: true,
      cancelable: true,
      view: window
    });

    element.dispatchEvent(event);
  }

  function selectChannel(channelName) {
    const targetName = normalizeText(channelName);
    const entries = getChannelEntries();
    const target = entries.find((entry) => entry.name === targetName);

    if (!target) {
      return false;
    }

    showOverlay(targetName);
    target.element.scrollIntoView({ block: 'nearest' });
    simulateClick(target.element);
    return true;
  }

  function setVolume(volume) {
    const nextVolume = clampVolume(volume);
    state.config.volume = nextVolume;

    const video = document.querySelector('video');
    if (video instanceof HTMLVideoElement) {
      video.volume = nextVolume;
      video.muted = nextVolume === 0;
    }

    showVolumeIndicator(nextVolume);
    return nextVolume;
  }

  function adjustVolume(delta) {
    const video = document.querySelector('video');
    const baseVolume = video instanceof HTMLVideoElement ? video.volume : state.config.volume;
    return setVolume(baseVolume + delta);
  }

  function init(config = {}) {
     if (typeof config === 'object' && config) {
      state.config.volume = clampVolume(config.volume ?? state.config.volume);
    }

    ensureOverlay();
    ensureVideoWatcher();

    const video = document.querySelector('video');
    if (video) {
      bindVideo(video);
      if (video.readyState >= 3 && !video.paused) {
        hideOverlay();
      } else {
        showOverlay(extractCurrentChannelName());
      }
    } else {
      showOverlay(extractCurrentChannelName());
    } 

    state.initialized = true;
    return true;
  }

  window.__tvAssistantPlugins.yangshipin = {
    id: 'yangshipin',
    init,
    getMenuData,
    waitForMenuData,
    selectChannel,
    setVolume,
    adjustVolume,
    showOverlay,
    hideOverlay
  };
})();
