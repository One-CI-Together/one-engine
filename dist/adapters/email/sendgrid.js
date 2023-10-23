"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SendGridAdapter = void 0;
const mail_1 = __importDefault(require("@sendgrid/mail"));
const IntegrationError_1 = require("../../errors/IntegrationError");
const abstract_1 = require("./abstract");
class SendGridAdapter extends abstract_1.IEmailAdapter {
    constructor(config) {
        super(config);
        mail_1.default.setApiKey(config.sendgridKey);
        this.emailAddress = config.emailAddress;
        this.senderName = config.senderName;
    }
    async send(data) {
        try {
            await mail_1.default.send({
                from: `${data.senderString ?? this.senderName} <${data.senderEmail ?? this.emailAddress}>`,
                subject: data.subject,
                to: data.to,
                html: data.content,
            });
        }
        catch (error) {
            throw new IntegrationError_1.IntegrationError({
                integration: 'Sendgrid',
                message: error,
                service: 'send',
                status: 524,
            });
        }
        ;
    }
}
exports.SendGridAdapter = SendGridAdapter;
//# sourceMappingURL=sendgrid.js.map