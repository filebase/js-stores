/**
 * @packageDocumentation
 *
 * A Blockstore implementation that stores blocks on Amazon S3.
 *
 * @example Quickstart
 *
 * If the flag `createIfMissing` is not set or is false, then the bucket must be created prior to using blockstore-s3. Please see the AWS docs for information on how to configure the S3 instance. A bucket name is required to be set at the s3 instance level, see the below example.
 *
 * ```js
 * import { S3 } from '@aws-sdk/client-s3'
 * import { S3Blockstore } from 'blockstore-s3'
 *
 * const s3 = new S3({
 *   region: 'region',
 *   credentials: {
 *     accessKeyId: 'myaccesskey',
 *     secretAccessKey: 'mysecretkey'
 *   }
 * })
 *
 * const store = new S3Blockstore(
 *   s3,
 *   'my-bucket',
 *   { createIfMissing: false }
 * )
 * ```
 *
 * @example Using with Helia
 *
 * See [examples/helia](./examples/helia) for a full example of how to use Helia with an S3 backed blockstore.
 */
import { BaseBlockstore } from 'blockstore-core/base';
import { type ShardingStrategy } from './sharding.js';
import type { S3 } from '@aws-sdk/client-s3';
import type { Pair } from 'interface-blockstore';
import type { AbortOptions } from 'interface-store';
import type { CID } from 'multiformats/cid';
export type { ShardingStrategy };
export interface S3BlockstoreInit {
    /**
     * Whether to try to create the bucket if it is missing when `.open` is called
     */
    createIfMissing?: boolean;
    /**
     * Prefix to use for S3 commands
     */
    prefix?: string;
    /**
     * Control how CIDs map to paths and back
     */
    shardingStrategy?: ShardingStrategy;
}
/**
 * A blockstore backed by AWS S3
 */
export declare class S3Blockstore extends BaseBlockstore {
    createIfMissing: boolean;
    private readonly s3;
    private readonly bucket;
    private readonly prefix;
    private readonly shardingStrategy;
    constructor(s3: S3, bucket: string, init?: S3BlockstoreInit);
    /**
     * Store the given value under the key.
     */
    put(key: CID, val: Uint8Array, options?: AbortOptions): Promise<CID>;
    /**
     * Read from s3
     */
    get(key: CID, options?: AbortOptions): Promise<Uint8Array>;
    /**
     * Check for the existence of the given key
     */
    has(key: CID, options?: AbortOptions): Promise<boolean>;
    /**
     * Delete the record under the given key
     */
    delete(key: CID, options?: AbortOptions): Promise<void>;
    getAll(options?: AbortOptions): AsyncIterable<Pair>;
    /**
     * This will check the s3 bucket to ensure access and existence
     */
    open(options?: AbortOptions): Promise<void>;
}
//# sourceMappingURL=index.d.ts.map