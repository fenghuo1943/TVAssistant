import robot from "robotjs";
export class MouseController {
    constructor() {
        this.smoothX = 0;
        this.smoothY = 0;
        this.pendingDX = 0;
        this.pendingDY = 0;
        this.startMouseLoop();
    }
    move(deltaX, deltaY) {
        this.pendingDX += deltaX;
        this.pendingDY += deltaY;
    }
    click(button) {
        robot.mouseClick(this.mapButton(button));
    }
    mouseDown(button) {
        robot.mouseToggle("down", this.mapButton(button));
    }
    mouseUp(button) {
        robot.mouseToggle("up", this.mapButton(button));
    }
    scrollVertical(dy) {
        const amount = dy * 5;
        process.platform === "win32"
            ? robot.scrollMouse(-amount, 0)
            : robot.scrollMouse(0, amount);
    }
    scrollHorizontal(dx) {
        const amount = dx * 5;
        process.platform === "win32"
            ? robot.scrollMouse(0, amount)
            : robot.scrollMouse(amount, 0);
    }
    mapButton(button) {
        return button === 0 ? "left" : button === 1 ? "right" : "middle";
    }
    startMouseLoop() {
        setInterval(() => {
            if (this.pendingDX === 0 && this.pendingDY === 0)
                return;
            const pos = robot.getMousePos();
            this.smoothX = this.smoothX * 0.5 + this.pendingDX * 0.5;
            this.smoothY = this.smoothY * 0.5 + this.pendingDY * 0.5;
            robot.moveMouse(pos.x + Math.round(this.smoothX), pos.y + Math.round(this.smoothY));
            this.pendingDX = 0;
            this.pendingDY = 0;
        }, 16);
    }
}
