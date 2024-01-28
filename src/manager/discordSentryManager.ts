import { isConfigure } from "./configurationManager";
import { sendDebug } from "./consoleManager";

let channelBlacklist: string[] = [];

export function discordSentryBlacklistInitialize() {
  if (!isConfigure(process.env.DISCORD_SENTRY_BLACKLIST)) {
    return;
  }

  const blacklistInString = process.env.DISCORD_SENTRY_BLACKLIST;
  channelBlacklist = blacklistInString.split(",");
  sendDebug("DiscordSentry channel(s) blacklist: " + channelBlacklist);
}

export function isDiscordSentryBlacklisted(channelId: string): boolean {
  if (!isConfigure(process.env.DISCORD_SENTRY_BLACKLIST)) {
    return;
  }

  return channelBlacklist.includes(channelId.toLocaleLowerCase());
}

export default isDiscordSentryBlacklisted;
