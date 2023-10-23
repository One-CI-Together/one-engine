import AuthAdapter from './adapters/auth';
import AxiosAdapter from './adapters/axiosAdapter';
import { IEmailAdapter, ISMTP } from './adapters/email/abstract';
import { LogAdapter } from './adapters/log';
import { LoggerConfig, LogTypes } from './adapters/log';
import { SpacesAdapter, StorageConfig } from './adapters/spacesAdapter';
import { Generator } from './utils/generators';
import { Transforms } from './utils/transforms';
declare class Engine {
    http: typeof AxiosAdapter.request;
    generators: typeof Generator;
    transforms: typeof Transforms;
    email?: IEmailAdapter;
    auth?: AuthAdapter;
    storage?: SpacesAdapter;
    private logger;
    env: 'development' | 'staging' | 'production';
    constructor(config?: {
        logger?: LoggerConfig;
        email?: {
            apiKey?: string;
            emailAddress: string;
            senderName: string;
            smtp?: ISMTP;
            showLogs?: boolean;
            awsRegion?: string;
            using: 'sendgrid' | 'smtp' | 'aws_ses';
        };
        auth?: {
            baseURL: string;
            app: string;
        };
        storage?: StorageConfig;
        env?: 'development' | 'staging' | 'production';
    });
    debug(log: LogTypes, resume?: string): void;
    info(log: LogTypes, resume?: string): void;
    warn(log: LogTypes, resume?: string): void;
    error(log: LogTypes, resume?: string): void;
    uuid(): string;
    now(): Date;
    newLogger(config: LoggerConfig): LogAdapter;
    newStorage(config: StorageConfig): SpacesAdapter;
    wait(seconds: number): Promise<unknown>;
}
export declare const Utils: typeof Transforms;
export default Engine;
