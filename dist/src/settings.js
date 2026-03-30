import { shortcuts } from "./homePageShared.js";
export const defaultSettings = {
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
    ...shortcuts.map((shortcut) => ({
        id: shortcut.url,
        name: shortcut.name
    }))
];
