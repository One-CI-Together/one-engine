import { AxiosRequestHeaders } from 'axios';
declare class AxiosAdapter {
    static request(config: {
        uri: string;
        method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
        json?: object;
        query?: object;
        headers?: AxiosRequestHeaders;
    }): Promise<[object, number]>;
}
export default AxiosAdapter;
