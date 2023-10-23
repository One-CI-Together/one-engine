"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Generator = void 0;
const uuid_1 = require("uuid");
class Generator {
    static uuid() {
        return (0, uuid_1.v4)();
    }
    static now() {
        return new Date();
    }
}
exports.Generator = Generator;
//# sourceMappingURL=generators.js.map