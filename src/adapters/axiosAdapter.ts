import axios, { AxiosRequestHeaders } from 'axios';


class AxiosAdapter {
    static async request(config: {
        uri: string,
        method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE',
        json?: object,
        query?: object,
        headers?: AxiosRequestHeaders
    }) {
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
            if (reason.response?.data) {
                return [reason.response.data, reason.response.status]
            }
        }
        return [{error: 'Unable to connect'}, 502]
    }
}


export default AxiosAdapter;
