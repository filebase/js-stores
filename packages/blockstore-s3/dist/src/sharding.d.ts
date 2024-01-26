import { CID } from 'multiformats/cid';
import type { MultibaseCodec } from 'multiformats/bases/interface';
export interface ShardingStrategy {
    extension: string;
    encode(cid: CID): string;
    decode(path: string): CID;
}
export interface NextToLastInit {
    /**
     * The file extension to use. default: '.data'
     */
    extension?: string;
    /**
     * How many characters to take from the end of the CID. default: 2
     */
    prefixLength?: number;
    /**
     * The multibase codec to use - nb. should be case insensitive.
     * default: base32upper
     */
    base?: MultibaseCodec<string>;
}
/**
 * A sharding strategy that takes the last few characters of a multibase encoded
 * CID and uses them as the directory to store the block in. This prevents
 * storing all blocks in a single directory which would overwhelm most
 * filesystems.
 */
export declare class NextToLast implements ShardingStrategy {
    extension: string;
    private readonly prefixLength;
    private readonly base;
    constructor(init?: NextToLastInit);
    encode(cid: CID): string;
    decode(str: string): CID;
}
export interface FlatDirectoryInit {
    /**
     * The file extension to use. default: '.data'
     */
    extension?: string;
    /**
     * How many characters to take from the end of the CID. default: 2
     */
    prefixLength?: number;
    /**
     * The multibase codec to use - nb. should be case insensitive.
     * default: base32padupper
     */
    base?: MultibaseCodec<string>;
}
/**
 * A sharding strategy that does not do any sharding and stores all files
 * in one directory. Only for testing, do not use in production.
 */
export declare class FlatDirectory implements ShardingStrategy {
    extension: string;
    private readonly base;
    constructor(init?: NextToLastInit);
    encode(cid: CID): string;
    decode(str: string): CID;
}
//# sourceMappingURL=sharding.d.ts.map