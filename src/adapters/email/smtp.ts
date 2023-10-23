import lib, { Transporter } from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';
import { IntegrationError } from '../../errors/IntegrationError';
import { IConfig, IEmailAdapter, ISend, ISMTP } from './abstract';


export class SMTPEmailAdapter extends IEmailAdapter {
    constructor(config: IConfig) {
        super(config);
        this.emailAddress = config.emailAddress;
        this.senderName = config.senderName;
        this.smtp = config.smtp as ISMTP;
        this.showLogs = config.showLogs ?? true;
        this.transporter = lib.createTransport({
            host: this.smtp.server,
            port: this.smtp.port,
            secure: false,
            auth: {
              user: this.smtp.user,
              pass: this.smtp.password,
            },
        });
    };

    public async send(data: ISend) {
        try {
            const result = await this.transporter.sendMail({
                from: `"${data.senderString ?? this.senderName}" <${data.senderEmail ?? this.emailAddress}>`,
                to: data.to, // list of receivers
                subject: data.subject,
                html: data.content,
            });
            if (this.showLogs) {
                console.debug(result);
            }
        } catch(err) {
            throw new IntegrationError({
                integration: 'SMTP',
                message: err,
                service: 'send',
                status: 524,
            });
        }
    };
}