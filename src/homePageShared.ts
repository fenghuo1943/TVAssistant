export type ShortcutType = 'website' | 'application';

export type Shortcut = {
  name: string;
  badge: string;
  url: string;
  theme: string;
  type?: ShortcutType; // 新增：快捷方式类型
  icon?: string; // 新增：图标路径或 URL
};

// 注意：shortcuts 现在由 settings.ts 中的 defaultShortcuts 定义
// 此文件保留类型定义供其他模块使用
