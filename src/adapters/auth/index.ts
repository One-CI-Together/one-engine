import { AxiosRequestHeaders } from 'axios';
import { IntegrationError } from '../../errors/IntegrationError';
import AxiosAdapter from '../axiosAdapter';
import { INewUser, IRAud, IRLogin } from './interfaces';


class AuthAdapter {
    private baseURL: string
    public app: string

    constructor(baseURL: string, app: string) {
        this.baseURL = baseURL;
        this.app = app;
    }

    public async audToken(token: string): Promise<IRAud> {
        return this.request('/aud', 'POST', {
            token,
        }) as Promise<IRAud>;
    }

    public async login(data: {
        username: string,
        password: string,
        flow: string,
        expMinutes?: number,
    }): Promise<IRLogin> {
        if (!data.expMinutes) {data.expMinutes = 60};

        const result = await this.request('/login', 'POST', {
            ...data,
            app: this.app,
        });
        return result as IRLogin;
    }

    public async createUser(data: INewUser): Promise<IRLogin> {
        if (!data.expMinutes) {data.expMinutes = 60};

        data.user.app = this.app;
        
        const result = await this.request('/user', 'POST', {
            ...data,
        });
        return result as IRLogin;
    }

    private async request(
        urn: string,
        method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE',
        json?: object,
        query?: object,
        headers?: AxiosRequestHeaders
    ): Promise<object> {
        const [response, status] = await AxiosAdapter.request({
            uri: this.baseURL + urn,
            method,
            json,
            query,
            headers
        });
        if (status >= 300) {
            throw new IntegrationError({
                integration: 'auth',
                message: response,
                service: this.baseURL + urn,
                status,
                request: json,
            });
        }
        
        return response;
    }
}


export default AuthAdapter;
