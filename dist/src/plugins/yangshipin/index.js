import pluginScript from './plugin.js?raw';
import { yangshipinManifest } from "./manifest.js";
function buildCall(expression) {
    return `
${pluginScript}
${expression}
  `;
}
export const yangshipinPlugin = {
    manifest: yangshipinManifest,
    matches: (url) => yangshipinManifest.matches.some((prefix) => url.startsWith(prefix)),
    buildInitScript: (config) => buildCall(`window.__tvAssistantPlugins.yangshipin.init(${JSON.stringify(config)});`),
    buildMenuDataScript: () => buildCall('window.__tvAssistantPlugins.yangshipin.waitForMenuData(20000);'),
    buildSelectChannelScript: (channelName) => buildCall(`window.__tvAssistantPlugins.yangshipin.selectChannel(${JSON.stringify(channelName)});`),
    buildAdjustVolumeScript: (delta) => buildCall(`window.__tvAssistantPlugins.yangshipin.adjustVolume(${delta});`)
};
