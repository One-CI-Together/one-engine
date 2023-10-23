"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SMTPEmailAdapter = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const IntegrationError_1 = require("../../errors/IntegrationError");
const abstract_1 = require("./abstract");
class SMTPEmailAdapter extends abstract_1.IEmailAdapter {
    constructor(config) {
        super(config);
        this.emailAddress = config.emailAddress;
        this.senderName = config.senderName;
        this.smtp = config.smtp;
        this.showLogs = config.showLogs ?? true;
        this.transporter = nodemailer_1.default.createTransport({
            host: this.smtp.server,
            port: this.smtp.port,
            secure: false,
            auth: {
                user: this.smtp.user,
                pass: this.smtp.password,
            },
        });
    }
    ;
    async send(data) {
        try {
            const result = await this.transporter.sendMail({
                from: `"${data.senderString ?? this.senderName}" <${data.senderEmail ?? this.emailAddress}>`,
                to: data.to,
                subject: data.subject,
                html: data.content,
            });
            if (this.showLogs) {
                console.debug(result);
            }
        }
        catch (err) {
            throw new IntegrationError_1.IntegrationError({
                integration: 'SMTP',
                message: err,
                service: 'send',
                status: 524,
            });
        }
    }
    ;
}
exports.SMTPEmailAdapter = SMTPEmailAdapter;
//# sourceMappingURL=smtp.js.map