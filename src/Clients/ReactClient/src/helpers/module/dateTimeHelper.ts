import { getLocale } from './localeHelper';

interface ILocaleFormat {
    date: string,
    dateRegex: RegExp,
    time: string,
    timeRegex: RegExp,
    dateTime: string,
    dateTimeRegex: RegExp,
}

type DateTimeDataKey = 'date' | 'dateRegex' | 'time' | 'timeRegex' | 'dateTime' | 'dateTimeRegex'

export const serverDateFormat = 'YYYY/MM/DD';
export const serverTimeFormat = 'HH:mm';
export const serverDateTimeFormat = `${serverDateFormat} ${serverTimeFormat}`;

const localeFormats: { [key: string]: ILocaleFormat } = {
    'en': {
        date: 'MM/DD/YYYY',
        dateRegex: new RegExp(`^\\d{4}/?\\d{2}/?\\d{2}$`),
        time: 'HH:mm',
        timeRegex: new RegExp(`^\\d{2}:\\d{2}$$`),
        dateTime: 'MM/DD/YYYY HH:mm',
        dateTimeRegex: new RegExp(`^\\d{4}/?\\d{2}/?\\d{2} \\d{2}:\\d{2}$`),
    },
    'en-gb': {
        date: 'DD/MM/YYYY',
        dateRegex: new RegExp(`^\\d{4}/?\\d{2}/?\\d{2}$`),
        time: 'HH:mm',
        timeRegex: new RegExp(`^\\d{2}:\\d{2}$$`),
        dateTime: 'DD/MM/YYYY HH:mm',
        dateTimeRegex: new RegExp(`^\\d{4}/?\\d{2}/?\\d{2} \\d{2}:\\d{2}$`),
    },
    'sv': {
        date: 'YYYY-MM-DD',
        dateRegex: new RegExp(`^\\d{2}-?\\d{2}-?\\d{4}$`),
        time: 'HH:mm',
        timeRegex: new RegExp(`^\\d{2}:\\d{2}$$`),
        dateTime: 'YYYY-MM-DD HH:mm',
        dateTimeRegex: new RegExp(`^\\d{2}-?\\d{2}-?\\d{4} \\d{2}:\\d{2}$`),
    },
}

export function getDateFormat(locale?: string): string {
    return getDateTimeData('date', locale);
}

export function getDateRegex(locale?: string): RegExp {
    return getDateTimeData('dateRegex', locale);
}

export function getTimeFormat(locale?: string): string {
    return getDateTimeData('time', locale);
}

export function getTimeRegex(locale?: string): RegExp {
    return getDateTimeData('timeRegex', locale);
}

export function getDateTimeFormat(locale?: string): string {
    return getDateTimeData('dateTime', locale);
}

export function getDateTimeRegex(locale?: string): RegExp {
    return getDateTimeData('dateTimeRegex', locale);
}

function getDateTimeData(dataKey: DateTimeDataKey, locale?: string): any {
    if (locale && localeFormats[locale]) {
        return localeFormats[locale][dataKey];
    } else if (locale) {
        console.warn(`Locale ${locale} is not supported, using default.`);
    }

    return localeFormats[getLocale()][dataKey];
}
