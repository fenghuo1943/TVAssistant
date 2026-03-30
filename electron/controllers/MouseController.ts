import robot from "robotjs";

export class MouseController {
  private smoothX = 0;
  private smoothY = 0;
  private pendingDX = 0;
  private pendingDY = 0;

  constructor() {
    this.startMouseLoop();
  }

  move(deltaX: number, deltaY: number) {
    this.pendingDX += deltaX;
    this.pendingDY += deltaY;
  }

  click(button: number) {
    robot.mouseClick(this.mapButton(button));
  }

  mouseDown(button: number) {
    robot.mouseToggle("down", this.mapButton(button));
  }

  mouseUp(button: number) {
    robot.mouseToggle("up", this.mapButton(button));
  }

  scrollVertical(dy: number) {
    const amount = dy * 5;
    process.platform === "win32"
      ? robot.scrollMouse(-amount, 0)
      : robot.scrollMouse(0, amount);
  }

  scrollHorizontal(dx: number) {
    const amount = dx * 5;
    process.platform === "win32"
      ? robot.scrollMouse(0, amount)
      : robot.scrollMouse(amount, 0);
  }

  private mapButton(button: number): "left" | "right" | "middle" {
    return button === 0 ? "left" : button === 1 ? "right" : "middle";
  }

  private startMouseLoop() {
    setInterval(() => {
      if (this.pendingDX === 0 && this.pendingDY === 0) return;

      const pos = robot.getMousePos();
      this.smoothX = this.smoothX * 0.5 + this.pendingDX * 0.5;
      this.smoothY = this.smoothY * 0.5 + this.pendingDY * 0.5;

      robot.moveMouse(
        pos.x + Math.round(this.smoothX),
        pos.y + Math.round(this.smoothY)
      );

      this.pendingDX = 0;
      this.pendingDY = 0;
    }, 16);
  }
}