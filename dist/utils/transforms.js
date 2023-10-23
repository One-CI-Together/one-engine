"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Transforms = void 0;
const promises_1 = __importDefault(require("fs/promises"));
const path_1 = require("path");
const applicationError_1 = require("../errors/applicationError");
class Transforms {
    static round(value, precision = 2) {
        const power = 10 ** precision;
        return Math.round(parseFloat((value * power).toPrecision(15))) / power;
    }
    ;
    static getPagination(query, defaultValues, maxLimit) {
        const newQuery = {
            page: parseInt(query.page ?? defaultValues.page),
            limit: parseInt(query.limit ?? defaultValues.limit),
        };
        newQuery.page = isNaN(newQuery.page) ? parseInt(defaultValues.page) : Math.abs(newQuery.page);
        newQuery.limit = isNaN(newQuery.limit) ? parseInt(defaultValues.limit) : Math.abs(newQuery.limit);
        newQuery.page -= 1;
        if (newQuery.page < 0) {
            newQuery.page = 0;
        }
        if (newQuery.limit > maxLimit) {
            newQuery.limit = maxLimit;
        }
        ;
        return newQuery;
    }
    static toCurrency(value, withSign = true, options = {
        maximumFractionDigits: 2,
        minimumFractionDigits: 2,
    }) {
        return `${withSign && 'R$'} ${value.toLocaleString('pt-BR', options)}`;
    }
    static async fromFile(fileName, args) {
        const completeFilePath = (0, path_1.resolve)((process.env.EMAIL_TEMPLATES ?? __dirname + '/../builders/templates/') + fileName);
        const file = await promises_1.default.readFile(completeFilePath, {
            encoding: 'utf-8'
        });
        if (file) {
            return file.replace(/{(\d+)}/g, ((match, n) => {
                return typeof args[n] != 'undefined' ? args[n] : match;
            }));
        }
        return `Falha ao localizar <${completeFilePath}>`;
    }
    static toTitle(value) {
        return value.trim().split(' ').map(a => {
            if (['de', 'do', 'e'].includes(a.toLocaleLowerCase())) {
                return a.toLocaleLowerCase();
            }
            return a[0].toUpperCase() + a.slice(1).toLowerCase();
        }).join(' ');
    }
    static timeDelta(config) {
        const finalTS = config.final.valueOf();
        const initialTS = config.initial.valueOf();
        const returns = {
            seconds: 1000,
            minutes: 1000 * 60,
            hours: 1000 * 60 * 60,
            days: 1000 * 60 * 60 * 24
        };
        return (finalTS - initialTS) / returns[config.return ?? 'hours'];
    }
    static normalize(text) {
        return text.trim().toUpperCase();
    }
    static validateNumber(value, config) {
        const _config = {
            kind: config?.kind ?? 'integer',
            min: config?.min ?? -99999999,
            max: config?.max ?? 99999999,
            mod: config?.mod ?? true,
        };
        const funnc = _config.kind === 'float' ? parseFloat : parseInt;
        const _value = funnc(value);
        if (isNaN(_value)) {
            throw new applicationError_1.ApplicationError({
                message: `${value} não é um número`,
                point: 'Validação dos campos',
                status: 422,
            });
        }
        if (_value > _config.max || _value < _config.min) {
            throw new applicationError_1.ApplicationError({
                message: `Valor deveria estar entre ${_config.min} e ${_config.max}`,
                point: 'Validação dos campos',
                status: 422,
            });
        }
        return _config.mod ? Math.abs(_value) : _value;
    }
    static stringToTime(value) {
        const now = new Date();
        const valueAsArray = value.split(':');
        const hoursAsNumber = parseInt(`${valueAsArray[0]}`);
        const minutesAsNumber = parseInt(`${valueAsArray[1]}`);
        now.setHours(hoursAsNumber);
        now.setMinutes(minutesAsNumber);
        return now;
    }
    ;
    static timeToString(value) {
        return value.toTimeString().slice(0, 5);
    }
    ;
    static timeStringToNumber(value) {
        const time = Transforms.stringToTime(value);
        const hours = time.getHours();
        const minutes = time.getMinutes();
        return Transforms.round(parseFloat(`${hours}.${minutes / .6}`), 3);
    }
    static toOnlyDateString(value) {
        return value.toISOString().slice(0, 10);
    }
    static getRandomElement(array) {
        const index = Math.floor(Math.random() * array.length);
        return [array[index], index];
    }
    static isOverday(begin, end) {
        const [_begin, _end] = [parseInt(begin.split(':')[0]), parseInt(end.split(':')[0])];
        return _end < _begin;
    }
    static getInitialsOfDay(date) {
        return Transforms.weekDays[date.getDay()];
    }
    static randomizeArray(array) {
        return [...array].sort(() => Math.random() - 0.5);
    }
}
exports.Transforms = Transforms;
Transforms.weekDays = [
    'DOM',
    'SEG',
    'TER',
    'QUA',
    'QUI',
    'SEX',
    'SAB'
];
//# sourceMappingURL=transforms.js.map