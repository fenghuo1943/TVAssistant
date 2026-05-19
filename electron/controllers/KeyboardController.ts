import robot from "robotjs";
import path from 'path';
import { fileURLToPath } from 'url';
import { createRequire } from 'module';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const require = createRequire(import.meta.url);

function findNativeModulePath(): string | null {
  const possiblePaths = [
    path.resolve(__dirname, '../../../native/build/Release/driver.node'),
    path.resolve(__dirname, '../../../../native/build/Release/driver.node'),
    path.resolve(process.cwd(), 'native/build/Release/driver.node'),
  ];

  for (const modulePath of possiblePaths) {
    if (fs.existsSync(modulePath)) {
      console.log('找到键盘原生模块:', modulePath);
      return modulePath;
    }
  }

  console.warn('未找到键盘原生模块，尝试的路径:');
  possiblePaths.forEach(p => console.warn('  -', p));
  return null;
}

let driverModule: any = null;
try {
  const modulePath = findNativeModulePath();
  if (modulePath) {
    driverModule = require(modulePath);
    console.log('虚拟键盘驱动模块加载成功');
  } else {
    console.warn('未找到虚拟键盘驱动模块，将使用 robotjs');
  }
} catch (error) {
  console.warn('虚拟键盘驱动模块加载失败，将使用 robotjs:', error);
}

export class KeyboardController {
  private useVirtualDriver = false;

  constructor() {
    if (driverModule) {
      const opened = driverModule.openDevice();
      console.log('虚拟键盘设备打开结果:', opened);
      if (opened) {
        this.useVirtualDriver = true;
        console.log('虚拟键盘设备已打开');
      } else {
        console.warn('虚拟键盘设备打开失败，回退到 robotjs');
      }
    }
  }
  keyDown(vk: number, modifier: number) {
    try {
      console.log(`KeyDown: vk=${vk}, modifier=${modifier}`);
      
      // 验证虚拟键码是否有效
      if (!this.isValidVk(vk)) {
        console.warn(`无效的虚拟键码: ${vk}`);
        return;
      }
      
      if (this.useVirtualDriver && driverModule) {
        // 检查是否是修饰键本身
        const isModifierKey = this.isModifierVk(vk);
        if (isModifierKey) {
          // 修饰键需要通过 modifier 位来设置，而不是放入 keys 数组
          const newModifier = this.addModifierBit(modifier, vk);
          const hidModifier = this.convertToHidModifier(newModifier);
          driverModule.keyboardMulti(hidModifier, 0);  // 没有普通按键
        } else {
          const scanCode = this.vkToScanCode(vk);
          const hidModifier = this.convertToHidModifier(modifier);
          driverModule.keyboardMulti(hidModifier, 1, scanCode);
        }
      } else {
        const robotKey = this.vkToRobot(vk);
        if (robotKey === "unknown") {
          console.warn(`无法转换虚拟键码 ${vk} 为 robotjs 按键`);
          return;
        }
        robot.keyToggle(robotKey, "down", this.mapModifier(modifier));
      }
    } catch (error) {
      console.error(`执行 keyDown 时出错 (vk=${vk}):`, error);
    }
  }

  keyUp(vk: number, modifier: number) {
    try {
      console.log(`KeyUp: vk=${vk}, modifier=${modifier}`);
      
      // 验证虚拟键码是否有效
      if (!this.isValidVk(vk)) {
        console.warn(`无效的虚拟键码: ${vk}`);
        return;
      }
      
      if (this.useVirtualDriver && driverModule) {
        // 检查是否是修饰键本身
        const isModifierKey = this.isModifierVk(vk);
        if (isModifierKey) {
          // 修饰键需要通过 modifier 位来清除
          const newModifier = this.removeModifierBit(modifier, vk);
          const hidModifier = this.convertToHidModifier(newModifier);
          driverModule.keyboardMulti(hidModifier, 0);  // 没有普通按键
        } else {
          const scanCode = this.vkToScanCode(vk);
          const hidModifier = this.convertToHidModifier(modifier);
          driverModule.keyboardMulti(hidModifier, 0, scanCode);
        }
      } else {
        const robotKey = this.vkToRobot(vk);
        if (robotKey === "unknown") {
          console.warn(`无法转换虚拟键码 ${vk} 为 robotjs 按键`);
          return;
        }
        robot.keyToggle(robotKey, "up", this.mapModifier(modifier));
      }
    } catch (error) {
      console.error(`执行 keyUp 时出错 (vk=${vk}):`, error);
    }
  }

  comboKey(vk: number, modifier: number) {
    try {
      // 验证虚拟键码是否有效
      if (!this.isValidVk(vk)) {
        console.warn(`无效的虚拟键码: ${vk}`);
        return;
      }
      
      if (this.useVirtualDriver && driverModule) {
        // 检查是否是修饰键本身
        const isModifierKey = this.isModifierVk(vk);
        if (isModifierKey) {
          // 修饰键的点击：先按下再释放
          const newModifier = this.addModifierBit(modifier, vk);
          const hidModifierDown = this.convertToHidModifier(newModifier);
          const hidModifierUp = this.convertToHidModifier(modifier);
          driverModule.keyboardMulti(hidModifierDown, 0);
          setTimeout(() => {
            driverModule.keyboardMulti(hidModifierUp, 0);
          }, 50);
        } else {
          const scanCode = this.vkToScanCode(vk);
          const hidModifier = this.convertToHidModifier(modifier);
          driverModule.keyboardMulti(hidModifier, 1, scanCode);
          setTimeout(() => {
            driverModule.keyboardMulti(hidModifier, 0, scanCode);
          }, 50);
        }
      } else {
        const robotKey = this.vkToRobot(vk);
        if (robotKey === "unknown") {
          console.warn(`无法转换虚拟键码 ${vk} 为 robotjs 按键`);
          return;
        }
        robot.keyTap(robotKey, this.mapModifier(modifier));
      }
    } catch (error) {
      console.error(`执行 comboKey 时出错 (vk=${vk}):`, error);
    }
  }

  textInput(text: string) {
    try {
      robot.typeString(text);
    } catch (error) {
      console.error(`执行 textInput 时出错:`, error);
    }
  }

  private mapModifier(mod: number): string[] {
    const result: string[] = [];
    if (mod & 1) result.push("shift");
    if (mod & 2) result.push("control");
    if (mod & 4) result.push("alt");
    if (mod & 8) result.push("command");
    return result;
  }

  private vkToRobot(vk: number): string {
    // 字母 A-Z (65-90)
    if (vk >= 65 && vk <= 90) {
      return String.fromCharCode(vk).toLowerCase();
    }

    // 数字 0-9 (主键盘 48-57)
    if (vk >= 48 && vk <= 57) {
      return String.fromCharCode(vk);
    }

    // 数字键盘 0-9 (96-105)
    const numpadMap: Record<number, string> = {
      96: "0",
      97: "1",
      98: "2",
      99: "3",
      100: "4",
      101: "5",
      102: "6",
      103: "7",
      104: "8",
      105: "9",
    };
    if (numpadMap[vk]) {
      return numpadMap[vk];
    }

    // 功能键 F1-F12 (112-123)
    const functionKeyMap: Record<number, string> = {
      112: "f1",
      113: "f2",
      114: "f3",
      115: "f4",
      116: "f5",
      117: "f6",
      118: "f7",
      119: "f8",
      120: "f9",
      121: "f10",
      122: "f11",
      123: "f12",
    };
    if (functionKeyMap[vk]) {
      return functionKeyMap[vk];
    }

    // 控制键和特殊键
    const controlKeyMap: Record<number, string> = {
      8: "backspace",
      9: "tab",
      12: "clear",
      13: "enter",
      16: "shift",
      17: "control",
      18: "alt",
      20: "capslock",
      27: "escape",
      32: "space",
      33: "pageup",
      34: "pagedown",
      35: "end",
      36: "home",
      37: "left",
      38: "up",
      39: "right",
      40: "down",
      45: "insert",
      46: "delete",
      91: "command",
      144: "num_lock",
    };
    if (controlKeyMap[vk]) {
      return controlKeyMap[vk];
    }

    // 符号键
    const symbolKeyMap: Record<number, string> = {
      106: "*",
      107: "+",
      108: "enter",
      109: "-",
      110: ".",
      111: "/",
      186: ";",
      187: "=",
      188: ",",
      189: "-",
      190: ".",
      191: "/",
      192: "`",
      219: "[",
      220: "\\",
      221: "]",
      222: "'",
    };
    if (symbolKeyMap[vk]) {
      return symbolKeyMap[vk];
    }

    // 多媒体键
    const mediaKeyMap: Record<number, string> = {
      175: "volume_up",
      174: "volume_down",
      179: "stop",
      173: "mute",
      172: "browser",
      180: "mail",
      170: "search",
      171: "favorites",
    };
    if (mediaKeyMap[vk]) {
      return mediaKeyMap[vk];
    }

    return "unknown";
  }

  private vkToScanCode(vk: number): number {
    // 使用 USB HID Usage ID 映射
    const vkToHidMap: Record<number, number> = {
      // 功能键
      27: 0x29, // Escape
      112: 0x3A, 113: 0x3B, 114: 0x3C, 115: 0x3D,
      116: 0x3E, 117: 0x3F, 118: 0x40, 119: 0x41,
      120: 0x42, 121: 0x43, 122: 0x44, 123: 0x45,
      
      // 数字键（主键盘）
      48: 0x27, 49: 0x1E, 50: 0x1F, 51: 0x20, 52: 0x21,
      53: 0x22, 54: 0x23, 55: 0x24, 56: 0x25, 57: 0x26,
      
      // 字母键 A-Z
      65: 0x04, 66: 0x05, 67: 0x06, 68: 0x07,
      69: 0x08, 70: 0x09, 71: 0x0A, 72: 0x0B,
      73: 0x0C, 74: 0x0D, 75: 0x0E, 76: 0x0F,
      77: 0x10, 78: 0x11, 79: 0x12, 80: 0x13,
      81: 0x14, 82: 0x15, 83: 0x16, 84: 0x17,
      85: 0x18, 86: 0x19, 87: 0x1A, 88: 0x1B,
      89: 0x1C, 90: 0x1D,
      
      // 控制键
      13: 0x28,  // Enter
      8: 0x2A,   // Backspace
      9: 0x2B,   // Tab
      32: 0x2C,  // Space
      20: 0x39,  // Caps Lock
      
      // 修饰键
      16: 0xE1,  // Left Shift
      17: 0xE0,  // Left Control
      18: 0xE2,  // Left Alt
      91: 0xE3,  // Left GUI (Win key)
      
      // 符号键
      189: 0x2D, // -
      187: 0x2E, // =
      219: 0x2F, // [
      221: 0x30, // ]
      220: 0x31, // \
      186: 0x33, // ;
      222: 0x34, // '
      192: 0x35, // `
      188: 0x36, // ,
      190: 0x37, // .
      191: 0x38, // /
      
      // 导航键
      38: 0x52,  // Up
      40: 0x51,  // Down
      37: 0x50,  // Left
      39: 0x4F,  // Right
      36: 0x4A,  // Home
      35: 0x4D,  // End
      33: 0x4B,  // Page Up
      34: 0x4E,  // Page Down
      45: 0x49,  // Insert
      46: 0x4C,  // Delete
      
      // 数字键盘
      144: 0x53, // Num Lock
      111: 0x54, // Numpad /
      106: 0x55, // Numpad *
      109: 0x56, // Numpad -
      107: 0x57, // Numpad +
      108: 0x58, // Numpad Enter
      96: 0x62, 97: 0x59, 98: 0x5A, 99: 0x5B,
      100: 0x5C, 101: 0x5D, 102: 0x5E, 103: 0x5F,
      104: 0x60, 105: 0x61,
      110: 0x63, // Numpad .
    };
    
    return vkToHidMap[vk] || 0;
  }

  private charToVk(char: string): number {
    const upperChar = char.toUpperCase();
    if (upperChar.length === 1 && upperChar >= 'A' && upperChar <= 'Z') {
      return upperChar.charCodeAt(0);
    }

    const charToVkMap: Record<string, number> = {
      '0': 48, '1': 49, '2': 50, '3': 51, '4': 52,
      '5': 53, '6': 54, '7': 55, '8': 56, '9': 57,
      ' ': 32, '\t': 9, '\n': 13, '\r': 13,
      ';': 186, '=': 187, ',': 188, '-': 189, '.': 190,
      '/': 191, '`': 192, '[': 219, '\\': 220, ']': 221,
      '\'': 222,
    };
    return charToVkMap[char] || 0;
  }

  private getCharModifier(char: string): number {
    if (char >= 'A' && char <= 'Z') {
      return 1;
    }

    const shiftChars = '!@#$%^&*()_+{}|:"<>?~';
    if (shiftChars.includes(char)) {
      return 1;
    }

    return 0;
  }

  // 新增方法：验证虚拟键码是否有效
  private isValidVk(vk: number): boolean {
    // 检查是否为合理的虚拟键码范围
    return vk >= 8 && vk <= 255 && vk !== 0;
  }

  // 新增方法：判断是否是修饰键
  private isModifierVk(vk: number): boolean {
    const modifierVks = [16, 17, 18, 91, 92, 160, 161, 162, 163, 164, 165];
    return modifierVks.includes(vk);
  }

  // 新增方法：根据 VK 添加对应的 modifier 位
  private addModifierBit(currentModifier: number, vk: number): number {
    let newModifier = currentModifier;
    
    // Left Control (17, 162) -> bit 0
    if (vk === 17 || vk === 162) {
      newModifier |= 1;
    }
    // Left Shift (16, 160) -> bit 1
    else if (vk === 16 || vk === 160) {
      newModifier |= 2;
    }
    // Left Alt (18, 164) -> bit 2
    else if (vk === 18 || vk === 164) {
      newModifier |= 4;
    }
    // Left/Right GUI (91, 92) -> bit 3
    else if (vk === 91 || vk === 92) {
      newModifier |= 8;
    }
    // Right Control (163) -> bit 4
    else if (vk === 163) {
      newModifier |= 16;
    }
    // Right Shift (161) -> bit 5
    else if (vk === 161) {
      newModifier |= 32;
    }
    // Right Alt (165) -> bit 6
    else if (vk === 165) {
      newModifier |= 64;
    }
    
    return newModifier;
  }

  // 新增方法：根据 VK 移除对应的 modifier 位
  private removeModifierBit(currentModifier: number, vk: number): number {
    let newModifier = currentModifier;
    
    // Left Control (17, 162) -> bit 0
    if (vk === 17 || vk === 162) {
      newModifier &= ~1;
    }
    // Left Shift (16, 160) -> bit 1
    else if (vk === 16 || vk === 160) {
      newModifier &= ~2;
    }
    // Left Alt (18, 164) -> bit 2
    else if (vk === 18 || vk === 164) {
      newModifier &= ~4;
    }
    // Left/Right GUI (91, 92) -> bit 3
    else if (vk === 91 || vk === 92) {
      newModifier &= ~8;
    }
    // Right Control (163) -> bit 4
    else if (vk === 163) {
      newModifier &= ~16;
    }
    // Right Shift (161) -> bit 5
    else if (vk === 161) {
      newModifier &= ~32;
    }
    // Right Alt (165) -> bit 6
    else if (vk === 165) {
      newModifier &= ~64;
    }
    
    return newModifier;
  }

  // 新增方法：将传入的 modifier 转换为 USB HID 标准的 modifier byte
  // 输入格式: Bit 0=Alt, Bit 1=Ctrl, Bit 2=Shift, Bit 3=Win
  // 输出格式: Bit 0=Left Ctrl, Bit 1=Left Shift, Bit 2=Left Alt, Bit 3=Left GUI
  private convertToHidModifier(inputModifier: number): number {
    let hidModifier = 0;
    
    // 输入 Bit 1 (Ctrl) -> 输出 Bit 0 (Left Control)
    if (inputModifier & 0x02) {
      hidModifier |= 0x01;
    }
    
    // 输入 Bit 2 (Shift) -> 输出 Bit 1 (Left Shift)
    if (inputModifier & 0x04) {
      hidModifier |= 0x02;
    }
    
    // 输入 Bit 0 (Alt) -> 输出 Bit 2 (Left Alt)
    if (inputModifier & 0x01) {
      hidModifier |= 0x04;
    }
    
    // 输入 Bit 3 (Win) -> 输出 Bit 3 (Left GUI)
    if (inputModifier & 0x08) {
      hidModifier |= 0x08;
    }
    
    return hidModifier;
  }
}