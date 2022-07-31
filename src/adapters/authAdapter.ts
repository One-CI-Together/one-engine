import { AxiosRequestHeaders } from 'axios';
import AxiosAdapter from './axiosAdapter';


class AuthAdapter {
    private baseURL: string
    private profile: string | null

    constructor(baseURL: string, profile: string | null = null) {
        this.baseURL = baseURL;
        this.profile = profile;
    }

    public async audToken(token) {
        return this.request('/v1/aud', 'POST', {
            access_token: token,
        });
    }

    private async request(
        urn: string,
        method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE',
        json?: object,
        query?: object,
        headers?: AxiosRequestHeaders
    ) {
        return AxiosAdapter.request({
            uri: this.baseURL + urn,
            method,
            json,
            query,
            headers
        })
    }
}


export default AuthAdapter;
