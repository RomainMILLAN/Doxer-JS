import { Events, Message } from "discord.js";
import { BotEvent } from "../../types";
import { discordSentry } from "../manager/sentry";
import { isConfigureEnabled } from "../manager/configurationManager";

const event: BotEvent = {
  name: "discordSentryDeleteMessage",
  type: Events.MessageDelete,
  async execute(message: Message) {
    if (!isConfigureEnabled(process.env.APP_SENTRY)) {
      return;
    }

    if (message.author.bot) {
      return;
    }

    discordSentry(
      message.client,
      message.channel,
      "Delete message",
      message.content,
      message.member.user
    );
  },
};

export default event;
