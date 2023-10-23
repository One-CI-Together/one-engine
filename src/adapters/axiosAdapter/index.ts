import axios, { AxiosRequestHeaders } from 'axios';
import { IntegrationError } from '../../errors/IntegrationError';


class AxiosAdapter {
    static async request(config: {
        uri: string,
        method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE',
        json?: object,
        query?: object,
        headers?: AxiosRequestHeaders
    }): Promise<[object, number]> {
        try {
            const response = await axios.request({
                method: config.method,
                url: config.uri,
                data: config.json,
                params: config.query,
                headers: config.headers,
            });
            return [response.data, response.status];
        } catch (reason) {
            if (reason.response?.status) {
                return [reason.response?.data ?? {}, reason.response.status]
            }
            throw new IntegrationError({
                integration: 'AXIOS',
                message: reason,
                service: config.uri,
                status: 502,
            });
        }
        return [{error: 'Unable to connect'}, 502]
    }
}


export default AxiosAdapter;
