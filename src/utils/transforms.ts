import fs from 'fs/promises';
import { resolve } from 'path';
import { ParsedUrlQuery } from "querystring";

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
        
        if (newQuery.limit > maxLimit) {
            newQuery.limit = maxLimit;
        };

        return newQuery;
    }

    public static toCurrency(value: number, withSign: boolean = true, options?: Intl.NumberFormatOptions) {
        return `${withSign && 'R$'} ${value.toLocaleString('pt-BR', options)}`;
    }

    public static async fromFile(fileName: string, args: (string | number)[]): Promise<string> {
        const completeFilePath = resolve(
            'src/builders/templates/' + fileName);
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
        return value.split(' ').map(a => {
            if (['de', 'do', 'e'].includes(a.toLocaleLowerCase())) {
                return a.toLocaleLowerCase();
            }
            return a[0].toUpperCase() + a.slice(1).toLowerCase();
        }).join(' ');
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