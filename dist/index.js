"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Utils = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const auth_1 = __importDefault(require("./adapters/auth"));
const axiosAdapter_1 = __importDefault(require("./adapters/axiosAdapter"));
const awsSes_1 = require("./adapters/email/awsSes");
const sendgrid_1 = require("./adapters/email/sendgrid");
const smtp_1 = require("./adapters/email/smtp");
const log_1 = require("./adapters/log");
const spacesAdapter_1 = require("./adapters/spacesAdapter");
const generators_1 = require("./utils/generators");
const helpers_1 = require("./utils/helpers");
const transforms_1 = require("./utils/transforms");
class Engine {
    constructor(config) {
        this.http = axiosAdapter_1.default.request;
        this.generators = generators_1.Generator;
        this.transforms = transforms_1.Transforms;
        this.env = config?.env ?? 'staging';
        if (config?.email) {
            const Using = {
                smtp: smtp_1.SMTPEmailAdapter,
                sendgrid: sendgrid_1.SendGridAdapter,
                aws_ses: awsSes_1.AWSSESAdapter,
            };
            const UseClass = Using[config.email.using];
            this.email = new UseClass({
                emailAddress: config.email.emailAddress,
                senderName: config.email.senderName,
                sendgridKey: config.email.apiKey,
                showLogs: config.email.showLogs,
                smtp: config.email.smtp,
                awsRegion: config.email.awsRegion,
            });
        }
        if (config?.auth) {
            this.auth = new auth_1.default(config.auth.baseURL, config.auth.app);
        }
        this.logger = new log_1.LogAdapter({
            emailAdapter: this.email,
            showing: 'debug',
            ...(config?.logger ?? {}),
        });
        if (config?.storage) {
            this.storage = new spacesAdapter_1.SpacesAdapter(config.storage);
        }
    }
    debug(log, resume) { this.logger.logger(log, 'debug', resume); }
    ;
    info(log, resume) { this.logger.logger(log, 'info', resume); }
    ;
    warn(log, resume) { this.logger.logger(log, 'warn', resume); }
    ;
    error(log, resume) { this.logger.logger(log, 'error', resume); }
    ;
    uuid() { return this.generators.uuid(); }
    ;
    now() { return this.generators.now(); }
    ;
    newLogger(config) {
        return new log_1.LogAdapter(config);
    }
    ;
    newStorage(config) {
        return new spacesAdapter_1.SpacesAdapter(config);
    }
    async wait(seconds) { return helpers_1.Helpers.wait(seconds); }
}
exports.Utils = transforms_1.Transforms;
exports.default = Engine;
//# sourceMappingURL=index.js.map