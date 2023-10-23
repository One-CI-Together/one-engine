export declare class ApplicationError extends Error {
    data: IError;
    constructor(data: IError);
}
interface IError {
    message: any;
    point: string;
    status: number;
}
export {};
