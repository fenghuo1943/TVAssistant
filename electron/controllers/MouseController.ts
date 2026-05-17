import robot from "robotjs";
import path from 'path';
import { fileURLToPath } from 'url';
import { createRequire } from 'module';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const require = createRequire(import.meta.url);

function findNativeModulePath(): string | null {
  // 可能的路径列表（按优先级排序）
  const possiblePaths = [
    // 开发环境：从 dist/electron/controllers 向上追溯
    path.resolve(__dirname, '../../../native/build/Release/driver.node'),
    // 生产环境：可能直接在项目根目录
    path.resolve(__dirname, '../../../../native/build/Release/driver.node'),
    // 备选：相对于当前工作目录
    path.resolve(process.cwd(), 'native/build/Release/driver.node'),
  ];

  for (const modulePath of possiblePaths) {
    if (fs.existsSync(modulePath)) {
      console.log('找到原生模块:', modulePath);
      return modulePath;
    }
  }

  console.warn('未找到原生模块，尝试的路径:');
  possiblePaths.forEach(p => console.warn('  -', p));
  return null;
}
// 动态加载原生模块
let driverModule: any = null;
try {
  // 尝试从项目根目录的 native/build/Release 加载
  const modulePath = findNativeModulePath();
  if (modulePath) {
    driverModule = require(modulePath);
    console.log('虚拟鼠标驱动模块加载成功');
  } else {
    console.warn('未找到虚拟鼠标驱动模块，将使用 robotjs');
  }
} catch (error) {
  console.warn('虚拟鼠标驱动模块加载失败，将使用 robotjs:', error);
}

export class MouseController {
  private smoothX = 0;
  private smoothY = 0;
  private pendingDX = 0;
  private pendingDY = 0;
  private useVirtualDriver = false;
  private accumulatedX = 0;
  private accumulatedY = 0;

  constructor() {
    this.startMouseLoop();
    // 如果驱动模块可用，尝试打开设备
    if (driverModule) {
      const opened = driverModule.openDevice();
      console.log('虚拟鼠标设备打开结果:', opened);
      if (opened) {
        //this.useVirtualDriver = true;
        console.log('虚拟鼠标设备已打开');
      } else {
        console.warn('虚拟鼠标设备打开失败，回退到 robotjs');
      }
    }
  }

  move(deltaX: number, deltaY: number) {
    this.pendingDX += deltaX;
    this.pendingDY += deltaY;
  }

  click(button: number) {
    if (this.useVirtualDriver && driverModule) {
      // 使用虚拟鼠标驱动
      driverModule.clickMouse(this.mapToVirtualButton(button),1);
      setTimeout(() => {
        driverModule.clickMouse(this.mapToVirtualButton(button),0);
      }, 20);
    } else {
      // 回退到使用 robotjs
      robot.mouseClick(this.mapButton(button));
    }
  }

  mouseDown(button: number) {
    if (this.useVirtualDriver && driverModule) {
      // 使用虚拟鼠标驱动
      driverModule.clickMouse(this.mapToVirtualButton(button),1);
    } else {
      // 回退到使用 robotjs
      robot.mouseToggle("down", this.mapButton(button));
    }
  }

  mouseUp(button: number) {
    if (this.useVirtualDriver && driverModule) {
      // 使用虚拟鼠标驱动
      driverModule.clickMouse(this.mapToVirtualButton(button),0);
    } else {
      // 回退到使用 robotjs
      robot.mouseToggle("up", this.mapButton(button));
    }
  }

  scrollVertical(dy: number) {
    if (this.useVirtualDriver && driverModule) {
      // 使用虚拟鼠标驱动
      //console.log(`虚拟鼠标滚动: ${dy}`);
      driverModule.scrollMouse(dy/2.0);
    } else {
      // 回退到使用 robotjs
      const amount = dy * 5;
      process.platform === "win32"
        ? robot.scrollMouse(-amount, 0)
        : robot.scrollMouse(0, amount);
    }
  }

  scrollHorizontal(dx: number) {
    //console.log(`虚拟鼠标滚动: ${dx}`);
    if (this.useVirtualDriver && driverModule) {
      // 使用虚拟鼠标驱动
      driverModule.scrollMouse(dx, 0);
    } else {
      // 回退到使用 robotjs
      const amount = dx * 5;
      //console.log(`机器人滚动: ${amount}`);
      process.platform === "win32"
        ? robot.scrollMouse(0, amount)
        : robot.scrollMouse(amount, 0);
    }
  }
  private mapToVirtualButton(button: number): number {
    // 将原有编码转换为虚拟驱动编码
    switch (button) {
      case 0: return 1; // 左键: 0 -> 1
      case 1: return 2; // 右键: 1 -> 2
      case 2: return 4; // 中键: 2 -> 4
      default: return 1; // 默认左键
    }
  }
  private mapButton(button: number): "left" | "right" | "middle" {
    return button === 0 ? "left" : button === 1 ? "right" : "middle";
  }

  private startMouseLoop() {
    setInterval(() => {
      //if (this.useVirtualDriver) return;
      if (this.pendingDX === 0 && this.pendingDY === 0) return;

      const pos = robot.getMousePos();
      
      if (this.useVirtualDriver && driverModule) {
        // 虚拟驱动：累积增量，避免精度丢失
        this.accumulatedX += this.pendingDX;
        this.accumulatedY += this.pendingDY;
        
        const moveX = Math.round(this.accumulatedX);
        const moveY = Math.round(this.accumulatedY);
        this.smoothX = this.smoothX * 0.5 + this.pendingDX * 0.5;
        this.smoothY = this.smoothY * 0.5 + this.pendingDY * 0.5;
        console.log(`Virtual Driver: smoothX=${this.smoothX}, smoothY=${this.smoothY}, moveX=${moveX}, moveY=${moveY}, pendingDX=${this.pendingDX}, pendingDY=${this.pendingDY}`);
        if (moveX !== 0 || moveY !== 0) {
          //console.log(`Virtual Driver: moveX=${moveX}, moveY=${moveY}, pendingDX=${this.pendingDX}, pendingDY=${this.pendingDY}`);
          driverModule.moveMouse(moveX, moveY);
          // 减去已移动的部分，保留小数累积
          this.accumulatedX -= moveX;
          this.accumulatedY -= moveY;
        }
      } else {
        // robotjs：使用指数平滑算法
        this.smoothX = this.smoothX * 0.5 + this.pendingDX * 0.5;
        this.smoothY = this.smoothY * 0.5 + this.pendingDY * 0.5;
        
        robot.moveMouse(
          pos.x + Math.round(this.smoothX),
          pos.y + Math.round(this.smoothY)
        );
      }

      this.pendingDX = 0;
      this.pendingDY = 0;
    }, 16);
  }
}