import robot from "robotjs";

export class KeyboardController {
  keyDown(vk: number, modifier: number) {
    robot.keyToggle(this.vkToRobot(vk), "down", this.mapModifier(modifier));
  }

  keyUp(vk: number, modifier: number) {
    robot.keyToggle(this.vkToRobot(vk), "up", this.mapModifier(modifier));
  }

  comboKey(vk: number, modifier: number) {
    robot.keyTap(this.vkToRobot(vk), this.mapModifier(modifier));
  }

  textInput(text: string) {
    robot.typeString(text);
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
      20: "caps_lock",
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
}