import yangshipinPluginScript from './yangshipin-plugin.js?raw';

export type BrowserPlugin = {
  id: string;
  matches: (url: string) => boolean;
  supportsLiveMenu: boolean;
  supportsVolume: boolean;
  script: string;
  buildInitScript: (config: Record<string, unknown>) => string;
  buildMenuDataScript: () => string;
  buildSelectChannelScript: (channelName: string) => string;
  buildAdjustVolumeScript: (delta: number) => string;
};

function buildYangshipinCall(expression: string) {
  return `
${yangshipinPluginScript}
${expression}
  `;
}

export const browserPlugins: BrowserPlugin[] = [
  {
    id: 'yangshipin',
    matches: (url) => url.startsWith('https://www.yangshipin.cn/tv/home'),
    supportsLiveMenu: true,
    supportsVolume: true,
    script: yangshipinPluginScript,
    buildInitScript: (config) =>
      buildYangshipinCall(
        `window.__tvAssistantPlugins.yangshipin.init(${JSON.stringify(config)});`
      ),
    buildMenuDataScript: () =>
      buildYangshipinCall(
        'window.__tvAssistantPlugins.yangshipin.waitForMenuData(20000);'
      ),
    buildSelectChannelScript: (channelName) =>
      buildYangshipinCall(
        `window.__tvAssistantPlugins.yangshipin.selectChannel(${JSON.stringify(channelName)});`
      ),
    buildAdjustVolumeScript: (delta) =>
      buildYangshipinCall(
        `window.__tvAssistantPlugins.yangshipin.adjustVolume(${delta});`
      )
  }
];

export function findBrowserPlugin(url: string) {
  return browserPlugins.find((plugin) => plugin.matches(url)) ?? null;
}
