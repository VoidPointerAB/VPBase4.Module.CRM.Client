/* eslint-disable no-useless-escape */

export const DateFormat = 'YYYY/MM/DD';
export const DateFormatRegex = new RegExp(`^\\d{4}\/?\\d{2}\/?\\d{2}$`);

export const TimeFormat = 'HH:mm';
export const TimeFormatRegex = new RegExp(`^\\d{2}:\\d{2}$$`);

export const DateTimeFormat = 'YYYY/MM/DD HH:mm';
export const DateTimeFormatRegex = new RegExp(`^\\d{4}\/?\\d{2}\/?\\d{2} \\d{2}:\\d{2}$`);