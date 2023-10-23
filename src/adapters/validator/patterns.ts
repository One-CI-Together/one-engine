class Patterns {
    public static string(data: {
        minLen?: number,
        maxLen?: number,
        defaultValue?: string,
        action?(v: string): string,
        optional?: boolean,
        nullable?: boolean,
    }) {
        return [
            {
                type: 'string',
                minLength: data.minLen ?? 0,
                maxLength: data.maxLen ?? 100,
                nullable: data.nullable ?? false,
            },
            {
                action: data.action,
                optional: data.optional,
                defaultValue: data.defaultValue,
            }
        ]
    }

    public static regex(data: {
        exp: string,
        defaultValue?: string,
        action?(v: string): string,
        optional?: boolean,
        nullable?: boolean,
    }) {
        return [{
            type: 'string',
            pattern: data.exp,
            nullable: data.nullable ?? false,
        }, {
            action: data.action,
            optional: data.optional,
            defaultValue: data.defaultValue,
        }]
    }
}