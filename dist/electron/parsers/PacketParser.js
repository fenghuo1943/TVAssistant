export class PacketParser {
    static parseOld(buf) {
        return {
            Type: buf.readUInt8(0),
            X: buf.readInt32LE(1),
            Y: buf.readInt32LE(5),
            button: buf.readUInt8(9),
        };
    }
    static parseV2(buf) {
        const type = buf.readUInt8(0);
        const length = buf.readUInt16LE(2);
        const payload = buf.subarray(4, 4 + length);
        return { type, payload };
    }
    static isV2(buf) {
        if (buf.length < 4)
            return false;
        const length = buf.readUInt16LE(2);
        return buf.length === 4 + length;
    }
}
