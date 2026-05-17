import dgram from 'dgram';
import os from 'os';

export class DiscoveryService {
    private udp: dgram.Socket;
    private running = false;

    constructor(private port = 9999, private onLog?: (msg: string) => void) {
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
                if (json.type === 'discover') isDiscover = true;
            } catch { }

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

    private getAllLocalIPs(): string[] {
        const interfaces = os.networkInterfaces();
        const ips: string[] = [];
        
        for (const name in interfaces) {
            const iface = interfaces[name];
            if (!iface) continue;
            
            for (const i of iface) {
                if (i.family === 'IPv4' && !i.internal) {
                    ips.push(i.address);
                }
            }
        }
        
        return ips.length > 0 ? ips : ['未知'];
    }
}
