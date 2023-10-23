declare class Patterns {
    static string(data: {
        minLen?: number;
        maxLen?: number;
        defaultValue?: string;
        action?(v: string): string;
        optional?: boolean;
        nullable?: boolean;
    }): ({
        type: string;
        minLength: number;
        maxLength: number;
        nullable: boolean;
        action?: undefined;
        optional?: undefined;
        defaultValue?: undefined;
    } | {
        action: ((v: string) => string) | undefined;
        optional: boolean | undefined;
        defaultValue: string | undefined;
        type?: undefined;
        minLength?: undefined;
        maxLength?: undefined;
        nullable?: undefined;
    })[];
    static regex(data: {
        exp: string;
        defaultValue?: string;
        action?(v: string): string;
        optional?: boolean;
        nullable?: boolean;
    }): ({
        type: string;
        pattern: string;
        nullable: boolean;
        action?: undefined;
        optional?: undefined;
        defaultValue?: undefined;
    } | {
        action: ((v: string) => string) | undefined;
        optional: boolean | undefined;
        defaultValue: string | undefined;
        type?: undefined;
        pattern?: undefined;
        nullable?: undefined;
    })[];
}
