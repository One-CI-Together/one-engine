"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const _1 = __importDefault(require("."));
const axios_1 = __importDefault(require("axios"));
async function main() {
    const engine = new _1.default({
        email: {
            emailAddress: '',
            senderName: '',
            using: 'aws_ses',
            showLogs: true,
            awsRegion: 'sa-east-1',
        },
        storage: {
            bucket: 'static.oneci.com.br',
            region: 'us-east-1'
        }
    });
    const _package = fs_1.default.readFileSync('wall.jpg');
    // await engine.storage?.putObject({
    //     content: _package,
    //     contentType: 'application/json',
    //     key: 'test.json',
    //     ACL: 'private'
    // });
    const url = await engine.storage?.preSignedURI({
        expSeconds: 3600,
        key: 'users/me/wall.jpg',
        isUpload: true
    });
    await put(url, _package);
}
function put(url, data) {
    return axios_1.default.put(url, data, {
        headers: {
            'Content-Type': 'image/jpeg'
        }
    });
}
main();
//# sourceMappingURL=test.js.map