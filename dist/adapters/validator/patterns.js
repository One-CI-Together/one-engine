class Patterns {
    static string(data) {
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
        ];
    }
    static regex(data) {
        return [{
                type: 'string',
                pattern: data.exp,
                nullable: data.nullable ?? false,
            }, {
                action: data.action,
                optional: data.optional,
                defaultValue: data.defaultValue,
            }];
    }
}
//# sourceMappingURL=patterns.js.map