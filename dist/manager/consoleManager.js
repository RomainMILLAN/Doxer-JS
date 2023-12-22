"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendLog = exports.sendConsole = exports.sendError = exports.sendDebug = exports.sendInfo = void 0;
const date = new Date();
function prefixMessage() {
    if (process.env.APP_ENV == "DEV") {
        return "\x1b[46m[DEVELOPMENT]\x1b[0m";
    }
    else if (process.env.APP_ENV == "STAGING") {
        return "\x1b[41m[STAGING]\x1b[0m";
    }
    else {
        return "";
    }
}
function sendInfo(body) {
    console.log(prefixMessage() +
        " " +
        "\x1b[1m[" +
        date.getDay() +
        "/" +
        (date.getMonth() + 1) +
        "/" +
        date.getFullYear() +
        "]\x1b[0m " +
        "\x1b[46mINFO\x1b[0m " +
        body);
}
exports.sendInfo = sendInfo;
function sendDebug(body) {
    if (null == process.env.APP_DEBUGING || "false" == process.env.APP_DEBUGING) {
        return;
    }
    console.log(prefixMessage() +
        " " +
        "\x1b[1m[" +
        date.getDay() +
        "/" +
        (date.getMonth() + 1) +
        "/" +
        date.getFullYear() +
        "]\x1b[0m " +
        "\x1b[45mDEBUG\x1b[0m " +
        body);
}
exports.sendDebug = sendDebug;
function sendError(body) {
    console.log(prefixMessage() +
        " " +
        "\x1b[1m[" +
        date.getDay() +
        "/" +
        (date.getMonth() + 1) +
        "/" +
        date.getFullYear() +
        "]\x1b[0m " +
        "\x1b[41mERROR\x1b[0m " +
        body);
}
exports.sendError = sendError;
function sendConsole(body) {
    console.log(prefixMessage() +
        " " +
        "\x1b[1m[" +
        date.getDate() +
        "/" +
        (date.getMonth() + 1) +
        "/" +
        date.getFullYear() +
        "]\x1b[0m " +
        body);
}
exports.sendConsole = sendConsole;
function sendLog(body) {
    console.log(prefixMessage() +
        " " +
        "\x1b[1m[" +
        date.getDay() +
        "/" +
        (date.getMonth() + 1) +
        "/" +
        date.getFullYear() +
        "]\x1b[0m " +
        "\x1b[43mLOG\x1b[0m " +
        body);
}
exports.sendLog = sendLog;
exports.default = sendInfo;
