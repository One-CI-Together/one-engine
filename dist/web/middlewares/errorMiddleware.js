"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ErrorMiddleware {
    static async execute(err, req, res, next) {
        console.error(err.stack);
        res.status(500).send('Something where wrong...');
    }
}
//# sourceMappingURL=errorMiddleware.js.map