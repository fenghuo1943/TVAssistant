import type { Shortcut } from './homePageShared.ts';

export type HomeMode = 'tv' | 'game';

export type AppSettings = {
  launchModuleId: string;
  openModuleOnLaunch: boolean;
  startAtLogin: boolean;
  homeMode: HomeMode;
  enabledShortcuts: string[]; // 存储启用的快捷方式的 url
};

export const defaultShortcuts: Shortcut[] = [
  {
    name: 'TV 直播',
    badge: 'LIVE',
    url: 'https://www.yangshipin.cn/tv/home',
    theme: 'theme-live'
  },
  {
    name: '央视片库',
    badge: 'CCTV',
    url: 'https://tv.cctv.com/',
    theme: 'theme-cctv'
  },
  {
    name: '抖音',
    badge: 'DY',
    url: 'https://www.douyin.com/',
    theme: 'theme-douyin'
  },
  {
    name: '腾讯视频',
    badge: 'QQ',
    url: 'https://v.qq.com/',
    theme: 'theme-tencent'
  }
];

export const defaultSettings: AppSettings = {
  launchModuleId: '',
  openModuleOnLaunch: false,
  startAtLogin: false,
  homeMode: 'tv',
  enabledShortcuts: defaultShortcuts.map(s => s.url) // 默认启用所有快捷方式
};

export const launchModuleOptions = [
  {
    id: '',
    name: '无'
  },
  ...defaultShortcuts.map((shortcut: Shortcut) => ({
    id: shortcut.url,
    name: shortcut.name
  }))
];
