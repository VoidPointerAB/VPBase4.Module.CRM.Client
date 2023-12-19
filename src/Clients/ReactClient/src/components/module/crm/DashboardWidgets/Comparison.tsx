export const compareValues = (key: string, order = 'desc') => {
    return ((a: any, b: any) => {
        if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) { return 0 }
        const valueA = (typeof a[key] === 'string') ? a[key].toUpperCase() : a[key];
        const valueB = (typeof b[key] === 'string') ? b[key].toUpperCase() : b[key];

        let comparison = 0;
        if (valueA > valueB) { comparison = 1; }
        else if (valueA < valueB) { comparison = -1; }
        return ((order === 'desc') ? (comparison * -1) : comparison);
    });
}