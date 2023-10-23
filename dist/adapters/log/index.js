"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogAdapter = void 0;
const builders_1 = require("../../builders");
const generators_1 = require("../../utils/generators");
class LogAdapter {
    constructor(config) {
        this.turns = {
            debug: 0,
            info: 1,
            warn: 2,
            error: 3,
        };
        this.emailAdapter = config.emailAdapter;
        this.showing = config.showing ?? 'debug';
        this.sendEmailFor = config.sendEmailFor;
        this.app = config.app ?? 'Default';
        this.backend = config.backend ?? 'Default';
        this.emailTarget = config.emailTarget;
        this.senderString = config.senderString = 'LogService';
    }
    ;
    logger(_message, severity, _resume) {
        let message = _message;
        let resume = _resume;
        if (message instanceof Error) {
            resume = `[${message.name}] - ${message.message}`;
            message = message.stack ?? resume;
        }
        if (this.turns[severity] >= this.turns[this.showing]) {
            const now = generators_1.Generator.now();
            const tzoffset = now.getTimezoneOffset() * 60000; //offset in milliseconds
            const localISOTime = (new Date(now.valueOf() - tzoffset)).toISOString().slice(0, -1);
            console[severity](localISOTime);
            console[severity](message);
            if (resume) {
                console[severity](resume);
            }
        }
        if (this.emailAdapter &&
            this.sendEmailFor &&
            this.emailTarget &&
            this.turns[severity] >= this.turns[this.sendEmailFor]) {
            const title = `[${severity.toUpperCase()}]-[${this.app}-${this.backend}]-${resume}`;
            builders_1.Builder.log({
                title,
                body: this.converter(message),
            }).then(content => {
                this.emailAdapter?.send({
                    subject: title,
                    content,
                    to: this.emailTarget ?? '',
                    senderString: this.senderString,
                });
            });
        }
    }
    converter(o) {
        if (typeof o === 'object') {
            return Object.prototype.toString.call(o) === '[object Date]' ?
                o.toISOString() : JSON.stringify(o);
        }
        else if (o === null) {
            return o;
        }
        ;
        return o?.toString() ?? 'undefined';
    }
}
exports.LogAdapter = LogAdapter;
;
//# sourceMappingURL=index.js.map