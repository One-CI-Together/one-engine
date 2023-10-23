"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Helpers = void 0;
class Helpers {
    static async wait(seconds) {
        const s = new Promise((resolve) => {
            setTimeout(() => resolve(true), seconds * 1000);
        });
        return s;
    }
}
exports.Helpers = Helpers;
//# sourceMappingURL=helpers.js.map