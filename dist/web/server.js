"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_fileupload_1 = __importDefault(require("express-fileupload"));
const server = (0, express_1.default)();
server.use(express_1.default.json({ limit: '10mb' }));
server.use((0, express_fileupload_1.default)());
server.use();
exports.default = server;
//# sourceMappingURL=server.js.map