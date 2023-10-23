import { IConfig, IEmailAdapter, ISend } from './abstract';
export declare class SMTPEmailAdapter extends IEmailAdapter {
    constructor(config: IConfig);
    send(data: ISend): Promise<void>;
}
