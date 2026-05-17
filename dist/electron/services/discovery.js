import dgram from 'dgram';
import os from 'os';
export class DiscoveryService {
    constructor(port = 9999, onLog) {
        this.port = port;
        this.onLog = onLog;
        this.running = false;
        this.udp = dgram.createSocket('udp4');
    }
    start() {
        this.running = true;
        this.udp.on('message', (msg, rinfo) => {
            const message = msg.toString();
            this.onLog?.(`Received: ${message} from ${rinfo.address}:${rinfo.port}`);
            let isDiscover = false;
            try {
                const json = JSON.parse(message);
                if (json.type === 'discover')
                    isDiscover = true;
            }
            catch { }
            if (isDiscover) {
                const ips = this.getAllLocalIPs();
                const deviceName = os.hostname();
                const response = JSON.stringify({
                    type: 'discover_response',
                    ips,
                    name: deviceName,
                    os: 'windows'
                });
                this.udp.send(response, rinfo.port, rinfo.address, () => {
                    this.onLog?.(`Responded to ${rinfo.address}:${rinfo.port} -> ${response}`);
                });
            }
        });
        this.udp.bind(this.port, () => {
            this.onLog?.(`UDP Discovery listening on port ${this.port}`);
        });
    }
    stop() {
        this.running = false;
        this.udp.close();
    }
    getAllLocalIPs() {
        const interfaces = os.networkInterfaces();
        const ips = [];
        for (const name in interfaces) {
            const iface = interfaces[name];
            if (!iface)
                continue;
            for (const i of iface) {
                if (i.family === 'IPv4' && !i.internal) {
                    ips.push(i.address);
                }
            }
        }
        return ips.length > 0 ? ips : ['未知'];
    }
}
