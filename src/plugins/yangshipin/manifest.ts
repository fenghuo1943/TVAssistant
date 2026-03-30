import type { BrowserPluginManifest } from '../types.ts';

export const yangshipinManifest: BrowserPluginManifest = {
  id: 'yangshipin',
  name: '央视频直播',
  matches: ['https://www.yangshipin.cn/tv/home'],
  capabilities: {
    liveMenu: true,
    volumeControl: true
  },
  defaultConfig: {
    volume: 0.6
  }
};
