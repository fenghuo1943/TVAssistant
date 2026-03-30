import { yangshipinPlugin } from "./yangshipin/index.js";
export const browserPlugins = [yangshipinPlugin];
export function findBrowserPlugin(url) {
    return browserPlugins.find((plugin) => plugin.matches(url)) ?? null;
}
