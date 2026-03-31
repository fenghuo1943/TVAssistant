/**
 * 应用配置常量
 * 集中管理应用中所有的常量，避免硬编码和魔法值
 */

/**
 * 应用基本信息
 */
export const APP_CONFIG = {
  NAME: 'TV Assistant',
  VERSION: '1.0.0',
  DEFAULT_WIDTH: 1920,
  DEFAULT_HEIGHT: 1080
} as const;

/**
 * 设置菜单键值
 */
export const SETTINGS_MENU_KEYS = {
  GENERAL: 'general',
  SITE_MANAGEMENT: 'site-management',
  ADD_SITE: 'add-site',
  ADD_LOCAL_APP: 'add-local-app',
  WALLPAPER: 'wallpaper'
} as const;

export type SettingsMenuKey = typeof SETTINGS_MENU_KEYS[keyof typeof SETTINGS_MENU_KEYS];

/**
 * 主页模式
 */
export const HOME_MODES = {
  TV: 'tv',
  GAME: 'game'
} as const;

export type HomeMode = typeof HOME_MODES[keyof typeof HOME_MODES];

/**
 * 直播菜单列类型
 */
export const LIVE_MENU_COLUMNS = {
  GROUP: 'group',
  ITEM: 'item'
} as const;

export type LiveMenuColumn = typeof LIVE_MENU_COLUMNS[keyof typeof LIVE_MENU_COLUMNS];

/**
 * 默认快捷方式配置
 */
export const DEFAULT_SHORTCUTS = [
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
] as const;

/**
 * 主题映射
 */
export const THEME_CLASSES = {
  'theme-live': 'card-theme-live',
  'theme-cctv': 'card-theme-cctv',
  'theme-douyin': 'card-theme-douyin',
  'theme-tencent': 'card-theme-tencent'
} as const;

/**
 * IPC 通道常量
 */
export const IPC_CHANNELS = {
  // 设置相关
  SETTINGS_GET: 'settings:get',
  SETTINGS_SET: 'settings:set',
  
  // 插件配置相关
  PLUGIN_CONFIG_GET: 'plugin-config:get',
  PLUGIN_CONFIG_SET: 'plugin-config:set',
  
  // 网络服务相关
  NETWORK_START: 'network:start',
  NETWORK_STOP: 'network:stop'
} as const;

/**
 * 键盘导航常量
 */
export const NAVIGATION_KEYS = {
  UP: 'ArrowUp',
  DOWN: 'ArrowDown',
  LEFT: 'ArrowLeft',
  RIGHT: 'ArrowRight',
  ENTER: 'Enter',
  SPACE: ' ',
  ESCAPE: 'Escape',
  BACKSPACE: 'Backspace'
} as const;

/**
 * 焦点管理常量
 */
export const FOCUS_SELECTORS = {
  CARD: '.site-card',
  BUTTON: 'button',
  INPUT: 'input',
  SELECT: 'select'
} as const;

/**
 * 错误级别
 */
export const ERROR_LEVELS = {
  INFO: 'info',
  WARNING: 'warning',
  ERROR: 'error'
} as const;

export type ErrorLevel = typeof ERROR_LEVELS[keyof typeof ERROR_LEVELS];
