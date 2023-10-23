"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpacesAdapter = void 0;
const client_s3_1 = require("@aws-sdk/client-s3");
const client_s3_2 = require("@aws-sdk/client-s3");
const s3_request_presigner_1 = require("@aws-sdk/s3-request-presigner");
class SpacesAdapter {
    constructor(config) {
        this.spaces = new client_s3_1.S3Client({
            region: config.region,
        });
        this.bucket = config.bucket;
    }
    async putObject(data) {
        const response = await this.spaces.send(new client_s3_2.PutObjectCommand({
            Bucket: this.bucket,
            Key: data.key,
            ACL: data.ACL ?? 'public-read',
            Body: data.content,
            ContentType: data.contentType
        }));
        return response.Location;
    }
    ;
    async preSignedURI(data) {
        const command = new (!data.isUpload ? client_s3_2.GetObjectCommand : client_s3_2.PutObjectCommand)({
            Bucket: this.bucket,
            Key: data.key,
        });
        const url = await (0, s3_request_presigner_1.getSignedUrl)(this.spaces, command, {
            expiresIn: data.expSeconds,
        });
        return url;
    }
}
exports.SpacesAdapter = SpacesAdapter;
;
;
//# sourceMappingURL=index.js.map