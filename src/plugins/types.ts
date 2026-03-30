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
