"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IntegrationError = void 0;
class IntegrationError extends Error {
    constructor(data) {
        super(`${data.integration} - ${data.service} - ${data.status}`);
        Error.captureStackTrace(this, this.constructor);
        this.data = data;
        if (data.request) {
            console.warn(data.request);
        }
        console.error(data.message);
    }
}
exports.IntegrationError = IntegrationError;
//# sourceMappingURL=IntegrationError.js.map