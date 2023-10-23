import { S3Client } from "@aws-sdk/client-s3";
import {
    PutObjectCommand,
    GetObjectCommand,
 } from "@aws-sdk/client-s3";
 import { getSignedUrl } from "@aws-sdk/s3-request-presigner";


export class SpacesAdapter {
    private spaces: S3Client
    private bucket: string

    constructor(config: StorageConfig) {
        this.spaces = new S3Client({
            region: config.region,
        });
        this.bucket = config.bucket;
    }

    public async putObject(data: {
        key: string,
        content: Buffer,
        contentType: string,
        ACL?: string,
    }): Promise<string> {
        const response = await this.spaces.send(
            new PutObjectCommand({
                Bucket: this.bucket,
                Key: data.key,
                ACL: data.ACL ?? 'public-read',
                Body: data.content,
                ContentType: data.contentType
            })
        ) as any;
        return response.Location;
    };

    public async preSignedURI(data: {
        key: string,
        expSeconds: number,
        isUpload?: boolean,
    }) {
        const command = new (!data.isUpload ? GetObjectCommand : PutObjectCommand)({
            Bucket: this.bucket,
            Key: data.key,
        });
        const url = await getSignedUrl(
            this.spaces,
            command,
            {
                expiresIn: data.expSeconds,
            });

        return url;
    }
};

export interface StorageConfig {
    bucket: string,
    region: string,
};