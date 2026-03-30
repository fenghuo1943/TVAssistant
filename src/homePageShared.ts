export type Shortcut = {
  name: string;
  badge: string;
  url: string;
  theme: string;
};

// 注意：shortcuts 现在由 settings.ts 中的 defaultShortcuts 定义
// 此文件保留类型定义供其他模块使用
