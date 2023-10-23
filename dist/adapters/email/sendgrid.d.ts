import { IConfig, IEmailAdapter, ISend } from './abstract';
export declare class SendGridAdapter extends IEmailAdapter {
    constructor(config: IConfig);
    send(data: ISend): Promise<void>;
}
