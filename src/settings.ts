import type { Shortcut, ShortcutType } from './homePageShared.ts';

export type { Shortcut, ShortcutType };

export type HomeMode = 'tv' | 'game';

export type AppSettings = {
  launchModuleId: string;
  openModuleOnLaunch: boolean;
  startAtLogin: boolean;
  homeMode: HomeMode;
  enabledShortcuts: string[]; // 存储启用的快捷方式的 url
  customShortcuts: Shortcut[]; // 存储用户自定义添加的快捷方式
};

export const defaultShortcuts: Shortcut[] = [
  {
    name: 'TV 直播',
    badge: 'LIVE',
    url: 'https://www.yangshipin.cn/tv/home',
    theme: 'theme-live',
    type: 'website'
  },
  {
    name: '央视片库',
    badge: 'CCTV',
    url: 'https://tv.cctv.com/',
    theme: 'theme-cctv',
    type: 'website'
  },
  {
    name: '抖音',
    badge: 'DY',
    url: 'https://www.douyin.com/',
    theme: 'theme-douyin',
    type: 'website'
  },
  {
    name: '腾讯视频',
    badge: 'QQ',
    url: 'https://v.qq.com/',
    theme: 'theme-tencent',
    type: 'website'
  }
];

export const defaultSettings: AppSettings = {
  launchModuleId: '',
  openModuleOnLaunch: false,
  startAtLogin: false,
  homeMode: 'tv',
  enabledShortcuts: defaultShortcuts.map(s => s.url), // 默认启用所有快捷方式
  customShortcuts: [] // 初始化为空数组
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
  // 注意：自定义快捷方式会在运行时动态添加
];

// 新增：本地应用示例配置
export const exampleAppShortcuts: Shortcut[] = [
  {
    name: '本地播放器',
    badge: 'APP',
    url: 'file:///C:/Program Files/Player/player.exe',
    theme: 'theme-local',
    type: 'application',
    icon: 'file:///C:/Program Files/Player/icon.png'
  },
  {
    name: '系统设置',
    badge: 'SYS',
    url: 'ms-settings:',
    theme: 'theme-system',
    type: 'application'
  }
];
