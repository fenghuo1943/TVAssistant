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
    if (vk >= 0x41 && vk <= 0x5a) return String.fromCharCode(vk).toLowerCase();
    if (vk >= 0x30 && vk <= 0x39) return String.fromCharCode(vk);

    const map: Record<number, string> = {
      0x0d: "enter",
      0x1b: "escape",
      0x08: "backspace",
      0x09: "tab",
      0x20: "space",
      0x25: "left",
      0x26: "up",
      0x27: "right",
      0x28: "down",
      0x10: "shift",
      0x11: "control",
      0x12: "alt",
      0x70: "f1",
      0x71: "f2",
      0x72: "f3",
      0x73: "f4",
      0x74: "f5",
      0x75: "f6",
      0x76: "f7",
      0x77: "f8",
      0x78: "f9",
      0x79: "f10",
      0x7a: "f11",
      0x7b: "f12",
    };
    return map[vk] || "unknown";
  }
}