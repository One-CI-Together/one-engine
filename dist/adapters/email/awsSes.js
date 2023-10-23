"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AWSSESAdapter = void 0;
const mimemessage_1 = __importDefault(require("mimemessage"));
const client_ses_1 = require("@aws-sdk/client-ses");
const abstract_1 = require("./abstract");
class AWSSESAdapter extends abstract_1.IEmailAdapter {
    constructor(config) {
        super(config);
        this.emailAddress = config.emailAddress;
        this.senderName = config.senderName;
        if (config.awsRegion) {
            this.AwsSes = new client_ses_1.SESClient({ region: config.awsRegion });
        }
    }
    ;
    async send(data) {
        try {
            if (true) {
                const mailContent = mimemessage_1.default.factory({ contentType: 'multipart/mixed', body: [] });
                mailContent.header('From', `${data.senderString ?? this.senderName} <${data.senderEmail ?? this.emailAddress}>`);
                mailContent.header('To', data.to);
                mailContent.header('Subject', data.subject);
                const alternateEntity = mimemessage_1.default.factory({
                    contentType: 'multipart/alternate',
                    body: []
                });
                const htmlEntity = mimemessage_1.default.factory({
                    contentType: 'text/html;charset=utf-8',
                    body: data.content,
                });
                alternateEntity.body.push(htmlEntity);
                mailContent.body.push(alternateEntity);
                for (let file of (data.files ?? [])) {
                    const attachmentEntity = mimemessage_1.default.factory({
                        contentType: file.mimetype,
                        contentTransferEncoding: 'base64',
                        body: Buffer.from(file.data).toString('base64')
                    });
                    attachmentEntity.header('Content-Disposition', `attachment ;filename="${file.filename}"`);
                    mailContent.body.push(attachmentEntity);
                }
                const result = await this.AwsSes?.send(new client_ses_1.SendRawEmailCommand({
                    RawMessage: {
                        Data: Buffer.from(mailContent.toString())
                    }
                }));
                if (this.showLogs) {
                    console.log(result);
                }
            }
        }
        catch (err) {
            throw err;
            // throw new IntegrationError({
            // 	integration: 'SES',
            // 	message: err,
            // 	service: 'send',
            // 	status: 524,
            // });
        }
    }
    ;
}
exports.AWSSESAdapter = AWSSESAdapter;
//# sourceMappingURL=awsSes.js.map