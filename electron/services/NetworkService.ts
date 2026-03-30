import dgram from "dgram";
import net from "net";
import { MouseController } from "../controllers/MouseController.ts";
import { KeyboardController } from "../controllers/KeyboardController.ts";
import { PacketParser } from "../parsers/PacketParser.ts";
import { CommandType, InputPacket, PacketV2 } from "../types/types.ts";

export class NetworkService {
  private udp = dgram.createSocket("udp4");
  private tcpServer?: net.Server;
  private running = false;
  private currentClient?: { address: string; port: number };
  private lastHeartbeat = Date.now();

  private mouse = new MouseController();
  private keyboard = new KeyboardController();

  constructor(private port = 5001, private onLog?: (msg: string) => void) {}

  start() {
    this.running = true;
    this.setupUdp();
    this.startTcpServer();
    this.monitorHeartbeat();
    this.onLog?.(`NetworkService started on UDP port ${this.port}`);
  }

  stop() {
    this.running = false;
    this.udp.close();
    this.tcpServer?.close();
  }

  private setupUdp() {
    this.udp.on("message", (msg, rinfo) => {
      if (msg.toString() === "HELLO") return this.registerClient(rinfo);
      if (msg.toString() === "PING") return this.heartbeat(rinfo);

      if (!this.currentClient || rinfo.address !== this.currentClient.address) return;

      const packet: InputPacket | PacketV2 | undefined = PacketParser.isV2(msg)
        ? PacketParser.parseV2(msg)
        : PacketParser.parseOld(msg);

      if ("payload" in packet) this.handlePacketV2(packet as PacketV2);
      else this.handlePacket(packet as InputPacket);
    });

    this.udp.bind(this.port);
  }

  private registerClient(rinfo: dgram.RemoteInfo) {
    this.currentClient = { address: rinfo.address, port: rinfo.port };
    this.lastHeartbeat = Date.now();
    this.sendText("OK", rinfo.address, rinfo.port);
    this.onLog?.(`Client connected: ${rinfo.address}`);
  }

  private heartbeat(rinfo: dgram.RemoteInfo) {
    this.lastHeartbeat = Date.now();
    this.sendText("PONG", rinfo.address, rinfo.port);
  }

  private monitorHeartbeat() {
    setInterval(() => {
      if (this.currentClient && Date.now() - this.lastHeartbeat > 5000) {
        this.onLog?.("Client disconnected (heartbeat timeout)");
        this.currentClient = undefined;
      }
    }, 1000);
  }

  private sendText(msg: string, address: string, port: number) {
    this.udp.send(msg, port, address);
  }

  private handlePacket(packet: InputPacket) {
    switch (packet.Type) {
      case CommandType.Move:
        this.mouse.move(packet.X, packet.Y);
        break;
      case CommandType.Click:
        this.mouse.click(packet.button);
        break;
      case CommandType.VerticalScroll:
        this.mouse.scrollVertical(packet.Y);
        break;
      case CommandType.HorizontalScroll:
        this.mouse.scrollHorizontal(packet.X);
        break;
      case CommandType.MouseDown:
        this.mouse.mouseDown(packet.button);
        break;
      case CommandType.MouseUp:
        this.mouse.mouseUp(packet.button);
        break;
    }
  }

  private handlePacketV2(packet: PacketV2) {
    switch (packet.type) {
      case CommandType.Move:
        const dx = packet.payload.readInt32LE(0);
        const dy = packet.payload.readInt32LE(4);
        this.mouse.move(dx, dy);
        break;
      case CommandType.Click:
        this.mouse.click(packet.payload.readUInt8(0));
        break;
      case CommandType.VerticalScroll:
        this.mouse.scrollVertical(packet.payload.readInt32LE(0));
        break;
      case CommandType.HorizontalScroll:
        this.mouse.scrollHorizontal(packet.payload.readInt32LE(0));
        break;
      case CommandType.MouseDown:
        this.mouse.mouseDown(packet.payload.readUInt8(0));
        break;
      case CommandType.MouseUp:
        this.mouse.mouseUp(packet.payload.readUInt8(0));
        break;
      case CommandType.KeyDown:
        this.keyboard.keyDown(packet.payload.readInt32LE(0), packet.payload.readUInt16LE(4));
        break;
      case CommandType.KeyUp:
        this.keyboard.keyUp(packet.payload.readInt32LE(0), packet.payload.readUInt16LE(4));
        break;
      case CommandType.ComboKey:
        this.keyboard.comboKey(packet.payload.readInt32LE(0), packet.payload.readUInt16LE(4));
        break;
      case CommandType.TextInput:
        this.keyboard.textInput(packet.payload.toString("utf-8"));
        break;
    }
  }

  private startTcpServer() {
    this.tcpServer = net.createServer((socket) => {
      let buffer = Buffer.alloc(0);
      socket.on("data", (data) => {
        const buf = Buffer.isBuffer(data) ? data : Buffer.from(data);
        buffer = Buffer.concat([buffer, buf]);
        while (buffer.length >= 4) {
          const length = buffer.readUInt16LE(2);
          if (buffer.length < 4 + length) break;

          const packet = buffer.subarray(0, 4 + length);
          buffer = buffer.subarray(4 + length);
          const payload = packet.subarray(4);

          this.keyboard.textInput(payload.toString("utf-8"));
        }
      });
      socket.on("error", () => {});
    });
    this.tcpServer.listen(5002, () => this.onLog?.("TCP TextInput listening on port 5002"));
  }
}
