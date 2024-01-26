import { base32upper } from 'multiformats/bases/base32';
import { CID } from 'multiformats/cid';
/**
 * A sharding strategy that takes the last few characters of a multibase encoded
 * CID and uses them as the directory to store the block in. This prevents
 * storing all blocks in a single directory which would overwhelm most
 * filesystems.
 */
export class NextToLast {
    extension;
    prefixLength;
    base;
    constructor(init = {}) {
        this.extension = init.extension ?? '.data';
        this.prefixLength = init.prefixLength ?? 2;
        this.base = init.base ?? base32upper;
    }
    encode(cid) {
        const str = this.base.encoder.encode(cid.multihash.bytes);
        const prefix = str.substring(str.length - this.prefixLength);
        return `${prefix}/${str}${this.extension}`;
    }
    decode(str) {
        let fileName = str.split('/').pop();
        if (fileName == null) {
            throw new Error('Invalid path');
        }
        if (fileName.endsWith(this.extension)) {
            fileName = fileName.substring(0, fileName.length - this.extension.length);
        }
        return CID.decode(this.base.decoder.decode(fileName));
    }
}
/**
 * A sharding strategy that does not do any sharding and stores all files
 * in one directory. Only for testing, do not use in production.
 */
export class FlatDirectory {
    extension;
    base;
    constructor(init = {}) {
        this.extension = init.extension ?? '.data';
        this.base = init.base ?? base32upper;
    }
    encode(cid) {
        const str = this.base.encoder.encode(cid.multihash.bytes);
        return `${str}${this.extension}`;
    }
    decode(str) {
        let fileName = str.split('/').pop();
        if (fileName == null) {
            throw new Error('Invalid path');
        }
        if (fileName.endsWith(this.extension)) {
            fileName = fileName.substring(0, fileName.length - this.extension.length);
        }
        return CID.decode(this.base.decoder.decode(fileName));
    }
}
//# sourceMappingURL=sharding.js.map