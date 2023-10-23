export interface INewUser {
    user: {
        username: string;
        flow: string;
        email: string;
        password: string;
        can_redefine_pass?: boolean;
        active?: boolean;
        logwith?: null | 'google';
        app?: string;
    };
    roles: string[];
    expMinutes: number;
}
export interface IRAud {
    roles: string[];
    sub: string;
    error: string;
    flow: string;
    app: string;
}
export interface IRLogin extends IRAud {
    access: string;
    refresh: string;
    aud: string;
    iss: string;
}
