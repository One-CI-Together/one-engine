import { SendGridAdapter } from "../email/sendgrid";
export declare class LogAdapter {
    private emailAdapter?;
    private showing;
    private turns;
    sendEmailFor?: Severity;
    app: string;
    backend: string;
    emailTarget?: string;
    senderString: string;
    constructor(config: LoggerConfig);
    logger(_message: LogTypes, severity: Severity, _resume?: string): void;
    private converter;
}
export interface LoggerConfig {
    emailAdapter?: SendGridAdapter;
    showing?: Severity;
    app?: string;
    backend?: string;
    sendEmailFor?: Severity;
    emailTarget?: string;
    senderString?: string;
}
export declare type LogTypes = string | number | Date | Error | Object | undefined;
export declare type Severity = 'debug' | 'info' | 'warn' | 'error';
