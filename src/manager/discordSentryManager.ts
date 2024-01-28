import { isConfigure } from "./configurationManager";
import { sendDebug } from "./consoleManager";

let blacklist: string[] = [];

function isDiscordSentryBlacklistEnabled() {
  if (
    isConfigure(process.env.DISCORD_SENTRY_BLACKLIST)
  ) {
    return true;
  }
  return false;
}

export function discordSentryBlacklistInitialize() {
  if (!isDiscordSentryBlacklistEnabled()) {
    return;
  }

  const blacklistInString = process.env.DISCORD_SENTRY_BLACKLIST;
  blacklist = blacklistInString.split(",");
  sendDebug("DiscordSentry words blacklist: " + blacklist);
}

export function isDiscordSentryBlacklisted(word: string): boolean {
  if (!isDiscordSentryBlacklistEnabled()) {
    return;
  }

  return blacklist.includes(word.toLocaleLowerCase());
}

export default isDiscordSentryBlacklisted;
