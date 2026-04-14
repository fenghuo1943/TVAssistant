import { yangshipinPlugin } from './yangshipin/index.ts';
import type { BrowserPlugin } from './types.ts';

export const browserPlugins: BrowserPlugin[] = [yangshipinPlugin];
//export const browserPlugins: BrowserPlugin[] = [];

export function findBrowserPlugin(url: string) {
  return browserPlugins.find((plugin) => plugin.matches(url)) ?? null;
}
