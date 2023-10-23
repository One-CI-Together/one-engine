"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const IntegrationError_1 = require("../../errors/IntegrationError");
class AxiosAdapter {
    static async request(config) {
        try {
            const response = await axios_1.default.request({
                method: config.method,
                url: config.uri,
                data: config.json,
                params: config.query,
                headers: config.headers,
            });
            return [response.data, response.status];
        }
        catch (reason) {
            if (reason.response?.status) {
                return [reason.response?.data ?? {}, reason.response.status];
            }
            throw new IntegrationError_1.IntegrationError({
                integration: 'AXIOS',
                message: reason,
                service: config.uri,
                status: 502,
            });
        }
        return [{ error: 'Unable to connect' }, 502];
    }
}
exports.default = AxiosAdapter;
//# sourceMappingURL=index.js.map