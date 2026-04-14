/// <reference types="vite/client" />

declare module '*?raw' {
  const content: string;
  export default content;
}

// Electron IPC Renderer 类型声明
declare interface Window {
  require?: (moduleName: string) => any;
}
