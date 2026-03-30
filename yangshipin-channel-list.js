// 央视直播新 URL 频道列表抓取脚本
// 适用页面: https://www.yangshipin.cn/tv/home
// 用法:
// 1. 在页面控制台直接粘贴执行
// 2. 或作为内容脚本注入页面
// 3. 执行 window.getYangshipinChannelGroups() 获取结果

(function yangshipinChannelListBootstrap() {
  const SELECTOR_CANDIDATES = [
    '.tv-main-con-r-list-left',
    '.tv-main-con-r-list',
    '[class*="tv-main-con-r-list"]',
    '[class*="channel"]',
    '[class*="list"]'
  ];

  const CCTV_PATTERN = /^(CCTV|CGTN)/i;
  const SATELLITE_PATTERN = /(卫视)$/;

  function normalizeText(text) {
    return String(text || '')
      .replace(/\s+/g, ' ')
      .replace(/\([^)]*\)/g, '')
      .replace(/[（(][^）)]*[）)]/g, '')
      .replace(/高清|超清|标清|4K|HD/gi, '')
      .trim();
  }

  function isChannelName(name) {
    if (!name) {
      return false;
    }

    if (name.length > 20) {
      return false;
    }

    if (/VIP|充值|登录|扫码|下载|打开APP|节目单|更多/.test(name)) {
      return false;
    }

    return CCTV_PATTERN.test(name) || SATELLITE_PATTERN.test(name);
  }

  function dedupe(names) {
    return [...new Set(names)];
  }

  function classifyChannel(name) {
    if (CCTV_PATTERN.test(name)) {
      return '央视频道';
    }

    if (SATELLITE_PATTERN.test(name)) {
      return '卫视频道';
    }

    return null;
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

    return entries.filter((entry, index, array) => {
      return array.findIndex((item) => item.name === entry.name) === index;
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

  function getCurrentChannel() {
    const selectedCandidates = [
      '.tvSelect',
      '[class*="select"]',
      '[class*="active"]',
      '[aria-selected="true"]'
    ];

    for (const selector of selectedCandidates) {
      const selected = document.querySelector(selector);
      const text = normalizeText(selected?.textContent || '');
      if (isChannelName(text)) {
        return text;
      }
    }

    return '';
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
          return {
            container,
            names
          };
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

  function buildChannelGroups(channelNames) {
    const result = {
      currentChannel: getCurrentChannel(),
      央视频道: [],
      卫视频道: []
    };

    channelNames.forEach((name) => {
      const group = classifyChannel(name);
      if (group) {
        result[group].push(name);
      }
    });

    result.央视频道 = dedupe(result.央视频道);
    result.卫视频道 = dedupe(result.卫视频道);

    return result;
  }

  function getYangshipinChannelGroups() {
    const bestContainer = findBestContainer();
    const channelNames = bestContainer?.names?.length ? bestContainer.names : collectFromWholePage();
    const grouped = buildChannelGroups(channelNames);

    console.log('[yangshipin-channel-list] 当前频道:', grouped.currentChannel || '未识别');
    console.log('[yangshipin-channel-list] 央视频道:', grouped.央视频道);
    console.log('[yangshipin-channel-list] 卫视频道:', grouped.卫视频道);
    console.log('[yangshipin-channel-list] JSON:', JSON.stringify(grouped, null, 2));

    return grouped;
  }

  function jumpToYangshipinChannel(channelName) {
    const targetName = normalizeText(channelName);
    const entries = getChannelEntries();
    const target = entries.find((entry) => entry.name === targetName);

    if (!target) {
      console.warn('[yangshipin-channel-list] 未找到频道:', targetName);
      return false;
    }

    target.element.scrollIntoView({
      block: 'nearest'
    });
    simulateClick(target.element);
    console.log('[yangshipin-channel-list] 已切换频道:', targetName);
    return true;
  }

  function waitForChannels(timeoutMs = 15000) {
    return new Promise((resolve, reject) => {
      const start = Date.now();

      const tryResolve = () => {
        const data = getYangshipinChannelGroups();
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
        if (Date.now() - start > timeoutMs) {
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

  window.getYangshipinChannelGroups = getYangshipinChannelGroups;
  window.jumpToYangshipinChannel = jumpToYangshipinChannel;
  window.waitForYangshipinChannelGroups = waitForChannels;

  console.log('[yangshipin-channel-list] 已注入。');
  console.log('[yangshipin-channel-list] 可执行: window.getYangshipinChannelGroups()');
  console.log('[yangshipin-channel-list] 或等待页面渲染后执行: window.waitForYangshipinChannelGroups()');
})();
