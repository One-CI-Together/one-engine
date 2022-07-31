import { Builder } from "../builders";
import { EmailAdapter } from "./emailAdapter"

export class LogAdapter {
    private emailAdapter?: EmailAdapter
    private showing: Severity
    private turns = {
        debug: 0,
        info: 1,
        warn: 2,
        error: 3,
    };
    sendEmailFor?: Severity
    app: string;
    backend: string
    emailTarget?: string
    senderString: string

    constructor(config: LoggerConfig) {
        this.emailAdapter = config.emailAdapter;
        this.showing = config.showing ?? 'debug';
        this.sendEmailFor = config.sendEmailFor;
        this.app = config.app ?? 'Default';
        this.backend = config.backend ?? 'Default';
        this.emailTarget = config.emailTarget;
        this.senderString = config.senderString = 'LogService';
    };

    public debug(data: LogInterface) {
        this.logger({
            ...data,
            severity: 'debug',
        })
    }

    public info(data: LogInterface) {
        console.log(this.logger);
        this.logger({
            ...data,
            severity: 'info',
        })
    }

    public warn(data: LogInterface) {
        this.logger({
            ...data,
            severity: 'warn',
        })
    }

    public error(data: LogInterface) {
        this.logger({
            ...data,
            severity: 'error',
        });
    }

    private logger(data: _LogInterface) {
        if (this.turns[data.severity] >= this.turns[this.showing]) {
            console[data.severity](data);
        }

        if (this.emailAdapter &&
                this.sendEmailFor &&
                this.emailTarget &&
                this.turns[data.severity] >= this.turns[this.sendEmailFor]) {
            const title = `[${data.severity.toUpperCase()}]-[${this.app}-${this.backend}]-${data.resume}`;
            
            Builder.log({
                    title,
                    body: data.message,
            }).then(content => {
                this.emailAdapter?.send({
                    subject: title,
                    content,
                    to: this.emailTarget ?? '',
                    senderString: this.senderString,
                })
            })
            
        }
    }
};

export interface LoggerConfig {
    emailAdapter?: EmailAdapter,
    showing?: Severity,
    app?: string,
    backend?: string,
    sendEmailFor?: Severity,
    emailTarget?: string,
    senderString?: string
}

export interface LogInterface {
    resume: string,
    message: string,
};

export type Severity = 'debug' | 'info' | 'warn' | 'error';

interface _LogInterface extends LogInterface {
    severity: Severity,
};