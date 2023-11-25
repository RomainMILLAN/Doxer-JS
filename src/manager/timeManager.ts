export function getFormattedTime(timestamp, locale = 'fr-FR') {
    const date = new Date(timestamp);
    const options: Intl.DateTimeFormatOptions = { hour: 'numeric', minute: 'numeric' };
    return new Intl.DateTimeFormat(locale, options).format(date);
}

export default getFormattedTime;