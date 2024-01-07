import { send } from "process";
import { sendDebug } from "./consoleManager";

let blacklist: string[] = [];

export function discordSentryBlacklistInitialize() {
    const blacklistInString = process.env.DISCORD_SENTRY_BLACKLIST;
    blacklist = blacklistInString.split(",");
    sendDebug("DiscordSentry words blacklist: " + blacklist);
}

export function isDiscordSentryBlacklisted(word: string): boolean {
    return blacklist.includes(word.toLocaleLowerCase());
}