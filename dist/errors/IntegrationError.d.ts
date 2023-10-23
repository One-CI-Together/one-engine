export declare class IntegrationError extends Error {
    data: IError;
    constructor(data: IError);
}
interface IError {
    integration: string;
    request?: any;
    service: string;
    message: any;
    status: number;
}
export {};
