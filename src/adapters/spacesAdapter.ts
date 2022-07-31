import AWS from 'aws-sdk';


export class SpacesAdapter {
    private spaces: AWS.S3
    private bucket: string

    constructor(config: StorageConfig) {
        this.spaces = new AWS.S3({
            apiVersion: '2006-03-01',
            endpoint: new AWS.Endpoint(config.endpoint),
        });
        this.bucket = config.bucket;
    }

    public async putObject(
        key: string,
        content: Buffer,
        contentType: string,
        ACL: string = 'public-read'
    ): Promise<string> {
        const response = await this.spaces.upload({
            Bucket: this.bucket,
            Key: key,
            ACL,
            Body: content,
            ContentType: contentType
        }).promise();
        return response.Location;
    };

    public async preSignedURI(
        key: string,
        expSeconds: number,
    ) {
        return this.spaces.getSignedUrl('getObject', {
            Bucket: this.bucket,
            Key: key,
            Expires: expSeconds,
        });
    }
};

export interface StorageConfig {
    endpoint: string,
    bucket: string,
};