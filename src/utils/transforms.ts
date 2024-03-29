import fs from 'fs/promises';
import { resolve } from 'path';
import { ApplicationError } from '../errors/applicationError';

export class Transforms {
    public static round(value: number, precision: number = 2) {
        const power = 10 ** precision;
        return Math.round(parseFloat((value * power).toPrecision(15))) / power;
    };

    public static getPagination(
        query: any,
        defaultValues: paginationInterface,
        maxLimit: number
    ) {
        const newQuery = {
            page: parseInt(query.page ?? defaultValues.page),
            limit: parseInt(query.limit ?? defaultValues.limit),
        }

        newQuery.page = isNaN(newQuery.page) ? parseInt(defaultValues.page) : Math.abs(newQuery.page)
        newQuery.limit = isNaN(newQuery.limit) ? parseInt(defaultValues.limit) : Math.abs(newQuery.limit)

        newQuery.page -= 1;

        if (newQuery.page < 0) {
            newQuery.page = 0;
        }

        if (newQuery.limit > maxLimit) {
            newQuery.limit = maxLimit;
        };

        return newQuery;
    }

    public static toCurrency(value: number, withSign: boolean = true, options: Intl.NumberFormatOptions = {
        maximumFractionDigits: 2,
        minimumFractionDigits: 2,
    }) {
        return `${withSign && 'R$'} ${value.toLocaleString('pt-BR', options)}`;
    }

    public static async fromFile(fileName: string, args: (string | number)[]): Promise<string> {
        const completeFilePath = resolve(
            (process.env.EMAIL_TEMPLATES ?? __dirname + '/../builders/templates/') + fileName);
        const file = await fs.readFile(completeFilePath, {
            encoding: 'utf-8'
        });

        if (file) {
            return file.replace(/{(\d+)}/g, ((match: string, n: number) => {
                return typeof args[n] != 'undefined' ? args[n] : match;
            }) as any);
        }

        return `Falha ao localizar <${completeFilePath}>`;
    }

    public static toTitle(value: string) {
        return value.trim().split(' ').map(a => {
            if (['de', 'do', 'e'].includes(a.toLocaleLowerCase())) {
                return a.toLocaleLowerCase();
            }
            return a[0].toUpperCase() + a.slice(1).toLowerCase();
        }).join(' ');
    }

    public static timeDelta(config: {
        initial: Date,
        final: Date,
        return?: 'seconds' | 'minutes' | 'hours' | 'days'
    }): number {
        const finalTS = config.final.valueOf();
        const initialTS = config.initial.valueOf();

        const returns = {
            seconds: 1000,
            minutes: 1000 * 60,
            hours: 1000 * 60 * 60,
            days: 1000 * 60 * 60 * 24
        }

        return (finalTS - initialTS) / returns[config.return ?? 'hours'];
    }

    public static normalize(text: string): string {
        return text.trim().toUpperCase();
    }

    public static validateNumber(
        value: string,
        config?: {
            kind?: 'float' | 'integer',
            min?: number,
            max?: number,
            mod?: boolean,
        }): number {
        const _config = {
            kind: config?.kind ?? 'integer',
            min: config?.min ?? -99999999,
            max: config?.max ?? 99999999,
            mod: config?.mod ?? true,
        }
        const funnc = _config.kind === 'float' ? parseFloat : parseInt;
        const _value = funnc(value);
        if (isNaN(_value)) {
            throw new ApplicationError({
                message: `${value} não é um número`,
                point: 'Validação dos campos',
                status: 422,
            });
        }
        if (_value > _config.max || _value < _config.min) {
            throw new ApplicationError({
                message: `Valor deveria estar entre ${_config.min} e ${_config.max}`,
                point: 'Validação dos campos',
                status: 422,
            });
        }

        return _config.mod ? Math.abs(_value) : _value;
    }

    public static stringToTime(value: string): Date {
        const now = new Date();
        const valueAsArray = value.split(':');
        const hoursAsNumber = parseInt(`${valueAsArray[0]}`);
        const minutesAsNumber = parseInt(`${valueAsArray[1]}`);

        now.setHours(hoursAsNumber);
        now.setMinutes(minutesAsNumber);

        return now;
    };

    public static timeToString(value: Date): string {
        return value.toTimeString().slice(0, 5);
    };

    public static timeStringToNumber(value: string): number {
        const time = Transforms.stringToTime(value);
        const hours = time.getHours();
        const minutes = time.getMinutes();

        return Transforms.round(
            parseFloat(`${hours}.${minutes / .6}`),
            3
        )
    }

    public static toOnlyDateString(value: Date): string {
        return value.toISOString().slice(0, 10);
    }

    public static getRandomElement(array: any[]) {
        const index =  Math.floor(Math.random() * array.length);
        return [ array[index], index ];
    }

    public static isOverday(begin: string, end: string): boolean {
        const [ _begin, _end ] = [ parseInt(begin.split(':')[0]), parseInt(end.split(':')[0]) ];
        return _end < _begin;
    }

    public static weekDays = [
        'DOM',
        'SEG',
        'TER',
        'QUA',
        'QUI',
        'SEX',
        'SAB'
    ];

    public static getInitialsOfDay(date: Date): string {
        return Transforms.weekDays[date.getDay()];
    }

    public static randomizeArray(array: any[]) {
        return [...array].sort(() => Math.random() - 0.5);
    }
}

interface paginationInterface {
    page: string,
    limit: string,
}

export interface PaginationInterface {
    page: number,
    limit: number,
}