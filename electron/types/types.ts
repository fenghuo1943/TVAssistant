export enum CommandType {
  Move = 0,
  Click = 1,
  VerticalScroll = 2,
  HorizontalScroll = 3,
  KeyDown = 4,
  KeyUp = 5,
  MouseDown = 6,
  MouseUp = 7,
  TextInput = 20,
  ComboKey = 21,
}

export interface InputPacket {
  Type: CommandType;
  X: number;
  Y: number;
  button: number; // 0=Left,1=Right,2=Middle
}

export interface PacketV2 {
  type: number;
  payload: Buffer;
}

// 导出按键映射枚举
export * from './keyMap.js';