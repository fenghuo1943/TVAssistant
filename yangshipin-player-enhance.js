// 央视直播播放器增强脚本
// 功能:
// 1. 打开直播时显示带加载动画的遮罩层
// 2. 视频开始播放后隐藏遮罩层
// 3. 将视频区域强制铺满页面，形成全屏播放效果

(function yangshipinPlayerEnhanceBootstrap() {
  if (window.__yangshipinPlayerEnhancer?.initialized) {
    return;
  }

  const OVERLAY_ID = 'yangshipin-loading-overlay';
  const STYLE_ID = 'yangshipin-player-enhance-style';
  const HIDDEN_CLASS = 'yangshipin-non-video-hidden';
  const overlayState = {
    overlay: null,
    title: ''
  };

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

      #${OVERLAY_ID} .yangshipin-spinner {
        width: 72px;
        height: 72px;
        border: 5px solid rgba(255, 255, 255, 0.18);
        border-top-color: #7dff9c;
        border-radius: 50%;
        box-shadow: 0 0 32px rgba(125, 255, 156, 0.18);
        animation: yangshipin-spin 1s linear infinite;
      }

      #${OVERLAY_ID} .yangshipin-loading-text {
        font-size: 22px;
        letter-spacing: 0.18em;
        text-transform: uppercase;
        color: rgba(238, 248, 239, 0.72);
      }

      #${OVERLAY_ID} .yangshipin-channel-title {
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

      @keyframes yangshipin-spin {
        to {
          transform: rotate(360deg);
        }
      }
    `;

    document.head.appendChild(style);
  }

  function ensureOverlay() {
    injectStyles();

    if (overlayState.overlay?.isConnected) {
      return overlayState.overlay;
    }

    const overlay = document.createElement('div');
    overlay.id = OVERLAY_ID;

    const spinner = document.createElement('div');
    spinner.className = 'yangshipin-spinner';

    const channelTitle = document.createElement('div');
    channelTitle.className = 'yangshipin-channel-title';
    channelTitle.textContent = overlayState.title;

    const loadingText = document.createElement('div');
    loadingText.className = 'yangshipin-loading-text';
    loadingText.textContent = 'Loading';

    overlay.appendChild(channelTitle);
    overlay.appendChild(spinner);
    overlay.appendChild(loadingText);
    document.body.appendChild(overlay);

    overlayState.overlay = overlay;
    return overlay;
  }

  function showOverlay(channelName = '') {
    overlayState.title = channelName;
    const overlay = ensureOverlay();
    const title = overlay.querySelector('.yangshipin-channel-title');
    if (title) {
      title.textContent = channelName;
    }

    overlay.hidden = false;
  }

  function hideOverlay() {
    const overlay = ensureOverlay();
    overlay.hidden = true;
  }

  function applyFullscreen(video) {
    if (!(video instanceof HTMLVideoElement)) {
      return false;
    }

    for (const child of document.body.children) {
      if (child.id === OVERLAY_ID) {
        continue;
      }

      if (child.contains(video)) {
        child.classList.remove(HIDDEN_CLASS);
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
    const candidates = [
      '.tvSelect',
      '[class*="select"]',
      '[class*="active"]',
      '[aria-selected="true"]'
    ];

    for (const selector of candidates) {
      const element = document.querySelector(selector);
      const text = element?.textContent?.replace(/\s+/g, ' ').trim();
      if (text) {
        return text;
      }
    }

    return '';
  }

  function bindVideo(video) {
    if (!(video instanceof HTMLVideoElement) || video.dataset.yangshipinEnhanced === 'true') {
      return;
    }

    video.dataset.yangshipinEnhanced = 'true';
    applyFullscreen(video);

    const showLoading = () => showOverlay(extractCurrentChannelName());
    const hideLoading = () => hideOverlay();

    video.addEventListener('loadstart', showLoading);
    video.addEventListener('waiting', showLoading);
    video.addEventListener('seeking', showLoading);
    video.addEventListener('stalled', showLoading);
    video.addEventListener('playing', hideLoading);
    video.addEventListener('canplay', hideLoading);
    video.addEventListener('play', hideLoading);

    if (video.readyState >= 3 && !video.paused) {
      hideLoading();
    } else {
      showLoading();
    }
  }

  function watchVideo() {
    const existingVideo = document.querySelector('video');
    if (existingVideo) {
      bindVideo(existingVideo);
    } else {
      showOverlay(extractCurrentChannelName());
    }

    const observer = new MutationObserver(() => {
      const video = document.querySelector('video');
      if (video) {
        bindVideo(video);
        applyFullscreen(video);
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  }

  window.__yangshipinPlayerEnhancer = {
    initialized: true,
    showOverlay,
    hideOverlay,
    applyFullscreen
  };

  showOverlay(extractCurrentChannelName());
  watchVideo();
})();
