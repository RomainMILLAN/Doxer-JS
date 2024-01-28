import { Events, Message } from "discord.js";
import { BotEvent } from "../../types";
import { discordSentry } from "../manager/sentry";
import isDiscordSentryBlacklisted from "../manager/discordSentryManager";
import { isConfigureEnabled } from "../manager/configurationManager";

const event: BotEvent = {
  name: "discordSentrySendMessage",
  type: Events.MessageCreate,
  async execute(message: Message) {
    if (!isConfigureEnabled(process.env.APP_SENTRY)) {
      return;
    }

    if (message.author.bot) {
      return;
    }

    if (isDiscordSentryBlacklisted(message.content.toLocaleLowerCase())) {
      return;
    }

    discordSentry(
      message.client,
      message.channel,
      "New message",
      message.content,
      message.member.user
    );
  },
};

export default event;
