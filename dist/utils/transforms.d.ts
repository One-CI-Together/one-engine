export declare class Transforms {
    static round(value: number, precision?: number): number;
    static getPagination(query: any, defaultValues: paginationInterface, maxLimit: number): {
        page: number;
        limit: number;
    };
    static toCurrency(value: number, withSign?: boolean, options?: Intl.NumberFormatOptions): string;
    static fromFile(fileName: string, args: (string | number)[]): Promise<string>;
    static toTitle(value: string): string;
    static timeDelta(config: {
        initial: Date;
        final: Date;
        return?: 'seconds' | 'minutes' | 'hours' | 'days';
    }): number;
    static normalize(text: string): string;
    static validateNumber(value: string, config?: {
        kind?: 'float' | 'integer';
        min?: number;
        max?: number;
        mod?: boolean;
    }): number;
    static stringToTime(value: string): Date;
    static timeToString(value: Date): string;
    static timeStringToNumber(value: string): number;
    static toOnlyDateString(value: Date): string;
    static getRandomElement(array: any[]): any[];
    static isOverday(begin: string, end: string): boolean;
    static weekDays: string[];
    static getInitialsOfDay(date: Date): string;
    static randomizeArray(array: any[]): any[];
}
interface paginationInterface {
    page: string;
    limit: string;
}
export interface PaginationInterface {
    page: number;
    limit: number;
}
export {};
