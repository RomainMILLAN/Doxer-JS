"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isDiscordSentryBlacklisted = exports.discordSentryBlacklistInitialize = void 0;
const consoleManager_1 = require("./consoleManager");
let blacklist = [];
function discordSentryBlacklistInitialize() {
    const blacklistInString = process.env.DISCORD_SENTRY_BLACKLIST;
    blacklist = blacklistInString.split(",");
    (0, consoleManager_1.sendDebug)("DiscordSentry words blacklist: " + blacklist);
}
exports.discordSentryBlacklistInitialize = discordSentryBlacklistInitialize;
function isDiscordSentryBlacklisted(word) {
    return blacklist.includes(word.toLocaleLowerCase());
}
exports.isDiscordSentryBlacklisted = isDiscordSentryBlacklisted;
