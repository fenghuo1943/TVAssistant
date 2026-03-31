export type BrowserPluginCapabilities = {
  liveMenu: boolean;
  volumeControl: boolean;
};

export type BrowserPluginManifest = {
  id: string;
  name: string;
  matches: string[];
  capabilities: BrowserPluginCapabilities;
  defaultConfig: Record<string, unknown>;
};

export type BrowserPlugin = {
  manifest: BrowserPluginManifest;
  matches: (url: string) => boolean;
  buildInitScript: (config: Record<string, unknown>) => string;
  buildMenuDataScript: () => string;
  buildSelectChannelScript: (channelName: string) => string;
  buildAdjustVolumeScript: (delta: number) => string;
};

/**
 * 直播菜单数据结构
 */
export type LiveMenuData = {
  currentChannel?: string;
  央视频道?: string[];
  卫视频道?: string[];
};

/**
 * 插件配置类型
 */
export type PluginConfig = Record<string, unknown>;

/**
 * IPC Renderer 接口定义
 */
export interface IpcRenderer {
  on(channel: string, listener: (event: unknown, payload: { key: string }) => void): void;
  removeListener(channel: string, listener: (event: unknown, payload: { key: string }) => void): void;
  send(channel: string, ...args: unknown[]): void;
  invoke<T = unknown>(channel: string, ...args: unknown[]): Promise<T>;
}
