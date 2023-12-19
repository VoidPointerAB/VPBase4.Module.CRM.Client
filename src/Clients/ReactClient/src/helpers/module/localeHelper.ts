const supportedLocale = ['en', 'en-gb', 'sv'];
const defaultLocale = 'sv';

export function getLocale() {
    const attemptedLocale = localStorage.getItem('dummy key'); // Should in the future check a cookie or something similar...

    const uniformLocale = convertToUniformLocale(attemptedLocale);

    return supportedLocale[supportedLocale.indexOf(uniformLocale)];
}

// Make sure we handle all possible formats in the same way (ex. sv-se is same as sv-SE)
function convertToUniformLocale(attemptedLocale: any): string {

    if (typeof attemptedLocale !== 'string') {
        return defaultLocale;
    }

    attemptedLocale = handleLocalesWithOverlap(attemptedLocale.toLowerCase());

    return supportedLocale.indexOf(attemptedLocale) === -1 ? defaultLocale : attemptedLocale;
}

// "sv-XY" becomes "sv" and "en-XY" becomes "en-gb" unless the locale is supported, like "en"
function handleLocalesWithOverlap(attemptedLocale: string): string {

    if (attemptedLocale.indexOf('sv') !== -1) {
        return 'sv';
    }

    if (attemptedLocale.indexOf('en') && supportedLocale.indexOf(attemptedLocale) !== -1) {
        return 'en-gb';
    }

    return attemptedLocale;
}
