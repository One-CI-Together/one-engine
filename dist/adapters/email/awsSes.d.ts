import { IConfig, IEmailAdapter, ISend } from './abstract';
export declare class AWSSESAdapter extends IEmailAdapter {
    constructor(config: IConfig);
    send(data: ISend): Promise<void>;
}
