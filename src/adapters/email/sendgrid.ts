import sgMail from '@sendgrid/mail';
import { IntegrationError } from '../../errors/IntegrationError';
import { IConfig, IEmailAdapter, ISend } from './abstract';


export class SendGridAdapter extends IEmailAdapter {
    constructor(config: IConfig) {
        super(config);
        sgMail.setApiKey(config.sendgridKey as string);
        this.emailAddress = config.emailAddress;
        this.senderName = config.senderName;
    }

    public async send(data: ISend): Promise<void> {
        try {
            await sgMail.send({
                from: `${data.senderString ?? this.senderName} <${data.senderEmail ?? this.emailAddress}>`,
                subject: data.subject,
                to: data.to,
                html: data.content,

            });
        } catch(error) {
            throw new IntegrationError({
                integration: 'Sendgrid',
                message: error,
                service: 'send',
                status: 524,
            });
        };
    }
}