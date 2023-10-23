import { INewUser, IRAud, IRLogin } from './interfaces';
declare class AuthAdapter {
    private baseURL;
    app: string;
    constructor(baseURL: string, app: string);
    audToken(token: string): Promise<IRAud>;
    login(data: {
        username: string;
        password: string;
        flow: string;
        expMinutes?: number;
    }): Promise<IRLogin>;
    createUser(data: INewUser): Promise<IRLogin>;
    private request;
}
export default AuthAdapter;
