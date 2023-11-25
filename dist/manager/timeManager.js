"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFormattedTime = void 0;
function getFormattedTime(timestamp, locale = 'fr-FR') {
    const date = new Date(timestamp);
    const options = { hour: 'numeric', minute: 'numeric' };
    return new Intl.DateTimeFormat(locale, options).format(date);
}
exports.getFormattedTime = getFormattedTime;
exports.default = getFormattedTime;
