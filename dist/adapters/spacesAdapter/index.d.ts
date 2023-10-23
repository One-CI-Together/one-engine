/// <reference types="node" />
export declare class SpacesAdapter {
    private spaces;
    private bucket;
    constructor(config: StorageConfig);
    putObject(data: {
        key: string;
        content: Buffer;
        contentType: string;
        ACL?: string;
    }): Promise<string>;
    preSignedURI(data: {
        key: string;
        expSeconds: number;
        isUpload?: boolean;
    }): Promise<string>;
}
export interface StorageConfig {
    bucket: string;
    region: string;
}
