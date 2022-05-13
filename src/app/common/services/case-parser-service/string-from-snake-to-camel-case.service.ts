export const snakeToCamelCase = (str: string) => {
    if (/([-_])/g.test(str)) {
        return str.replace(/([-_].)/g, group =>
            group
            .replace('-', '')
            .replace('_', '')
            .toUpperCase()
        );
    }

    return str;
}
