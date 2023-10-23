"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApplicationError = void 0;
class ApplicationError extends Error {
    constructor(data) {
        super(`${data.status} - ${data.point}`);
        console.warn(data.message);
        this.data = data;
    }
}
exports.ApplicationError = ApplicationError;
//# sourceMappingURL=applicationError.js.map