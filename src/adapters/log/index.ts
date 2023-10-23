import { Builder } from "../../builders";
import { Generator } from "../../utils/generators";
import { SendGridAdapter } from "../email/sendgrid";

export class LogAdapter {
    private emailAdapter?: SendGridAdapter
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

    public logger(_message: LogTypes, severity: Severity, _resume?: string) {
        let message = _message;
        let resume = _resume;
        if (message instanceof Error) {
            resume = `[${message.name}] - ${message.message}`;
            message = message.stack ?? resume as string;
        }

        if (this.turns[severity] >= this.turns[this.showing]) {
            const now = Generator.now();

            const tzoffset = now.getTimezoneOffset() * 60000; //offset in milliseconds
            const localISOTime = (new Date(now.valueOf() - tzoffset)).toISOString().slice(0, -1);

            console[severity](localISOTime);
            console[severity](
                message
            );
            if (resume) {
                console[severity](resume);
            }
        }

        if (this.emailAdapter &&
                this.sendEmailFor &&
                this.emailTarget &&
                this.turns[severity] >= this.turns[this.sendEmailFor]) {
            const title = `[${severity.toUpperCase()}]-[${this.app}-${this.backend}]-${resume}`;
            
            Builder.log({
                    title,
                    body: this.converter(message),
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

    private converter(o: LogTypes) {
        if (typeof o === 'object') {
            return Object.prototype.toString.call(o) === '[object Date]' ? 
                (o as Date).toISOString() : JSON.stringify(o);
        } else if (o === null) {return o};
        return o?.toString() ?? 'undefined';
    }
};

export interface LoggerConfig {
    emailAdapter?: SendGridAdapter,
    showing?: Severity,
    app?: string,
    backend?: string,
    sendEmailFor?: Severity,
    emailTarget?: string,
    senderString?: string
}

export type LogTypes = string | number | Date | Error | Object | undefined;

export type Severity = 'debug' | 'info' | 'warn' | 'error';