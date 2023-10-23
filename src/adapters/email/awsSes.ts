import mimemessage from 'mimemessage';
import { SESClient, SendRawEmailCommand } from "@aws-sdk/client-ses";

import { IntegrationError } from '../../errors/IntegrationError';
import { IConfig, IEmailAdapter, ISend } from './abstract';


export class AWSSESAdapter extends IEmailAdapter {
	constructor(config: IConfig) {
		super(config);
		this.emailAddress = config.emailAddress;
		this.senderName = config.senderName;
		if (config.awsRegion) {
			this.AwsSes = new SESClient({ region: config.awsRegion });
		}
	};

	public async send(data: ISend) {
		try {
			if (true) {
				const mailContent = mimemessage.factory({ contentType: 'multipart/mixed', body: [] });
				mailContent.header('From', `${data.senderString ?? this.senderName} <${data.senderEmail ?? this.emailAddress}>`);
				mailContent.header('To', data.to);
				mailContent.header('Subject', data.subject);

				const alternateEntity = mimemessage.factory({
					contentType: 'multipart/alternate',
					body: []
				});

				const htmlEntity = mimemessage.factory({
					contentType: 'text/html;charset=utf-8',
					body: data.content,
				});

				alternateEntity.body.push(htmlEntity);
				mailContent.body.push(alternateEntity);

				for (let file of (data.files ?? [])) {
					const attachmentEntity = mimemessage.factory({
						contentType: file.mimetype,
						contentTransferEncoding: 'base64',
						body: Buffer.from(file.data).toString('base64')
					});
						
					attachmentEntity.header(
						'Content-Disposition',
						`attachment ;filename="${file.filename}"`
					);

					mailContent.body.push(attachmentEntity);
				}
				
				const result = await this.AwsSes?.send(new SendRawEmailCommand({
					RawMessage: {
						Data: Buffer.from(mailContent.toString())
					}
				}));
				if (this.showLogs) {
					console.log(result);
				}
			}
		} catch (err) {
			throw err;
			// throw new IntegrationError({
			// 	integration: 'SES',
			// 	message: err,
			// 	service: 'send',
			// 	status: 524,
			// });
		}
	};
}