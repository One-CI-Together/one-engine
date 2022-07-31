import { Polly } from 'aws-sdk';
import AuthAdapter from './adapters/authAdapter';
import AxiosAdapter from './adapters/axiosAdapter';
import { EmailAdapter } from './adapters/emailAdapter';
import { LogAdapter, LoggerConfig, LogInterface } from './adapters/logAdapter';
import { SpacesAdapter, StorageConfig } from './adapters/spacesAdapter';
import { PoolManager } from './persistence/polly/manager';
import { Generator } from './utils/generators';
import { Transforms } from './utils/transforms';

class Engine {
    public http = AxiosAdapter.request;
    public generators = Generator
    public transforms = Transforms
    public persistence = {
        Polly: Polly,
        Pool: PoolManager,
    };
    public email?: EmailAdapter;
    public auth?: AuthAdapter;
    public storage?: SpacesAdapter;
    private logger: LogAdapter

    constructor(config?: {
        logger?: LoggerConfig,
        email?: {baseURL: string},
        auth?: {baseURL: string},
        storage?: StorageConfig
    }) {
        if (config?.email) {
            this.email = new EmailAdapter(config.email.baseURL);
        }
        if (config?.auth) {
            this.auth = new AuthAdapter(config.auth.baseURL);
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

    public debug(log: LogInterface) {this.logger.debug(log)};
    public info(log: LogInterface) {this.logger.info(log)};
    public warn(log: LogInterface) {this.logger.warn(log)};
    public error(log: LogInterface) {this.logger.error(log)};

    public newLogger(config: LoggerConfig) {
        return new LogAdapter(config);
    };

    public newStorage(config: StorageConfig) {
        return new SpacesAdapter(config);
    }
}

export default Engine;
