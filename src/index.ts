import dotenv from 'dotenv';
dotenv.config();

import AuthAdapter from './adapters/auth';
import AxiosAdapter from './adapters/axiosAdapter';
import { IEmailAdapter, ISMTP } from './adapters/email/abstract';
import { AWSSESAdapter } from './adapters/email/awsSes';
import { SendGridAdapter } from './adapters/email/sendgrid';
import { SMTPEmailAdapter } from './adapters/email/smtp';
import { LogAdapter } from './adapters/log';
import { LoggerConfig, LogTypes } from './adapters/log';
import { SpacesAdapter, StorageConfig } from './adapters/spacesAdapter';
import { Generator } from './utils/generators';
import { Helpers } from './utils/helpers';
import { Transforms } from './utils/transforms';

class Engine {
    public http = AxiosAdapter.request;
    public generators = Generator;
    public transforms = Transforms;
    public email?: IEmailAdapter;
    public auth?: AuthAdapter;
    public storage?: SpacesAdapter;
    private logger: LogAdapter;
    public env: 'development' | 'staging' | 'production';

    constructor(config?: {
        logger?: LoggerConfig,
        email?: {
            apiKey?: string,
            emailAddress: string,
            senderName: string,
            smtp?: ISMTP,
            showLogs?: boolean,
            awsRegion?: string,
            using: 'sendgrid' | 'smtp' | 'aws_ses',
        },
        auth?: {baseURL: string, app: string};
        storage?: StorageConfig,
        env?: 'development' | 'staging' | 'production'
    }) {
        this.env = config?.env ?? 'staging';
        if (config?.email) {
            const Using = {
                smtp: SMTPEmailAdapter,
                sendgrid: SendGridAdapter,
                aws_ses: AWSSESAdapter,
            }
            const UseClass = Using[config.email.using];
            this.email = new UseClass({
                emailAddress: config.email.emailAddress,
                senderName: config.email.senderName,
                sendgridKey: config.email.apiKey,
                showLogs: config.email.showLogs,
                smtp: config.email.smtp,
                awsRegion: config.email.awsRegion,
            });
        }
        if (config?.auth) {
            this.auth = new AuthAdapter(
                config.auth.baseURL,
                config.auth.app
            );
        }
        
        this.logger = new LogAdapter({
            emailAdapter: this.email,
            showing: 'debug',
            ...(config?.logger ?? {}),
        });
        
        if (config?.storage) {
            this.storage = new SpacesAdapter(config.storage);
        }
    }

    public debug(log: LogTypes, resume?: string) {this.logger.logger(log, 'debug', resume)};
    public info(log: LogTypes, resume?: string) {this.logger.logger(log, 'info', resume)};
    public warn(log: LogTypes, resume?: string) {this.logger.logger(log, 'warn', resume)};
    public error(log: LogTypes, resume?: string) {this.logger.logger(log, 'error', resume)};

    public uuid() {return this.generators.uuid()};
    public now() {return this.generators.now()};

    public newLogger(config: LoggerConfig) {
        return new LogAdapter(config);
    };

    public newStorage(config: StorageConfig) {
        return new SpacesAdapter(config);
    }

    public async wait(seconds: number) {return Helpers.wait(seconds)}
}


export const Utils = Transforms;
export default Engine;
