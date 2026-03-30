import { shortcuts, type Shortcut } from './homePageShared.ts';

export type HomeMode = 'tv' | 'game';

export type AppSettings = {
  launchModuleId: string;
  openModuleOnLaunch: boolean;
  startAtLogin: boolean;
  homeMode: HomeMode;
};

export const defaultSettings: AppSettings = {
  launchModuleId: '',
  openModuleOnLaunch: false,
  startAtLogin: false,
  homeMode: 'tv'
};

export const launchModuleOptions = [
  {
    id: '',
    name: '无'
  },
  ...shortcuts.map((shortcut: Shortcut) => ({
    id: shortcut.url,
    name: shortcut.name
  }))
];
