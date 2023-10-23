"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Builder = void 0;
const transforms_1 = require("../utils/transforms");
class Builder {
    static async log(data) {
        return transforms_1.Transforms.fromFile('log.html', [
            transforms_1.Transforms.toTitle(data.title),
            data.body,
        ]);
    }
}
exports.Builder = Builder;
//# sourceMappingURL=index.js.map