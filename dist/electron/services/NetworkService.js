import dgram from "dgram";
import net from "net";
import { MouseController } from "../controllers/MouseController.js";
import { KeyboardController } from "../controllers/KeyboardController.js";
import { PacketParser } from "../parsers/PacketParser.js";
import { CommandType } from "../types/types.js";
export class NetworkService {
    constructor(port = 5001, onLog) {
        this.port = port;
        this.onLog = onLog;
        this.udp = dgram.createSocket("udp4");
        this.running = false;
        this.lastHeartbeat = Date.now();
        this.mouse = new MouseController();
        this.keyboard = new KeyboardController();
    }
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
    setupUdp() {
        this.udp.on("message", (msg, rinfo) => {
            if (msg.toString() === "HELLO")
                return this.registerClient(rinfo);
            if (msg.toString() === "PING")
                return this.heartbeat(rinfo);
            if (!this.currentClient || rinfo.address !== this.currentClient.address)
                return;
            const packet = PacketParser.isV2(msg)
                ? PacketParser.parseV2(msg)
                : PacketParser.parseOld(msg);
            if ("payload" in packet)
                this.handlePacketV2(packet);
            else
                this.handlePacket(packet);
        });
        this.udp.bind(this.port);
    }
    registerClient(rinfo) {
        this.currentClient = { address: rinfo.address, port: rinfo.port };
        this.lastHeartbeat = Date.now();
        this.sendText("OK", rinfo.address, rinfo.port);
        this.onLog?.(`Client connected: ${rinfo.address}`);
    }
    heartbeat(rinfo) {
        this.lastHeartbeat = Date.now();
        this.sendText("PONG", rinfo.address, rinfo.port);
    }
    monitorHeartbeat() {
        setInterval(() => {
            if (this.currentClient && Date.now() - this.lastHeartbeat > 5000) {
                this.onLog?.("Client disconnected (heartbeat timeout)");
                this.currentClient = undefined;
            }
        }, 1000);
    }
    sendText(msg, address, port) {
        this.udp.send(msg, port, address);
    }
    handlePacket(packet) {
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
    handlePacketV2(packet) {
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
    startTcpServer() {
        this.tcpServer = net.createServer((socket) => {
            let buffer = Buffer.alloc(0);
            socket.on("data", (data) => {
                const buf = Buffer.isBuffer(data) ? data : Buffer.from(data);
                buffer = Buffer.concat([buffer, buf]);
                while (buffer.length >= 4) {
                    const length = buffer.readUInt16LE(2);
                    if (buffer.length < 4 + length)
                        break;
                    const packet = buffer.subarray(0, 4 + length);
                    buffer = buffer.subarray(4 + length);
                    const payload = packet.subarray(4);
                    this.keyboard.textInput(payload.toString("utf-8"));
                }
            });
            socket.on("error", () => { });
        });
        this.tcpServer.listen(5002, () => this.onLog?.("TCP TextInput listening on port 5002"));
    }
}
