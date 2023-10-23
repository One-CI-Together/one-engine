/// <reference types="node" />
import { SESClient } from "@aws-sdk/client-ses";
export declare abstract class IEmailAdapter {
    protected emailAddress: string;
    protected senderName: string;
    protected smtp: ISMTP;
    protected showLogs: boolean;
    protected transporter: any;
    protected AwsSes?: SESClient;
    constructor(config: IConfig);
    abstract send(data: ISend): Promise<void>;
}
export interface ISMTP {
    server: string;
    port: number;
    password: string;
    user: string;
}
export interface IConfig {
    emailAddress: string;
    senderName: string;
    smtp?: ISMTP;
    awsRegion?: string;
    sendgridKey?: string;
    showLogs?: boolean;
}
export interface ISend {
    subject: string;
    content: string;
    to: string;
    senderString?: string;
    senderEmail?: string;
    files?: {
        filename: string;
        mimetype: string;
        data: Buffer;
    }[];
}
