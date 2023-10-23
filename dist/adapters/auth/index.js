"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const IntegrationError_1 = require("../../errors/IntegrationError");
const axiosAdapter_1 = __importDefault(require("../axiosAdapter"));
class AuthAdapter {
    constructor(baseURL, app) {
        this.baseURL = baseURL;
        this.app = app;
    }
    async audToken(token) {
        return this.request('/aud', 'POST', {
            token,
        });
    }
    async login(data) {
        if (!data.expMinutes) {
            data.expMinutes = 60;
        }
        ;
        const result = await this.request('/login', 'POST', {
            ...data,
            app: this.app,
        });
        return result;
    }
    async createUser(data) {
        if (!data.expMinutes) {
            data.expMinutes = 60;
        }
        ;
        data.user.app = this.app;
        const result = await this.request('/user', 'POST', {
            ...data,
        });
        return result;
    }
    async request(urn, method, json, query, headers) {
        const [response, status] = await axiosAdapter_1.default.request({
            uri: this.baseURL + urn,
            method,
            json,
            query,
            headers
        });
        if (status >= 300) {
            throw new IntegrationError_1.IntegrationError({
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
exports.default = AuthAdapter;
//# sourceMappingURL=index.js.map