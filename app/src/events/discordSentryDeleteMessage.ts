import { Events, Message } from "discord.js";
import { BotEvent } from "../../types";
import { discordSentry } from "../manager/sentry";
import isDiscordSentryBlacklisted from "../manager/discordSentryManager";
import { isConfigureEnabled } from "../manager/configurationManager";

const event: BotEvent = {
  name: "discordSentryDeleteMessage",
  type: Events.MessageDelete,
  async execute(message: Message) {
    if (!isConfigureEnabled(process.env.APP_SENTRY)) {
      return;
    }

    if (message.partial) {
      try {
        message = await message.fetch();
      } catch {
        return;
      }
    }

    if (isDiscordSentryBlacklisted(message.channel.id)) {
      return;
    }

    discordSentry(
      message.client,
      message.channel,
      "Delete message",
      message.content,
      message.member?.user ?? message.author ?? null
    );
  },
};

export default event;
