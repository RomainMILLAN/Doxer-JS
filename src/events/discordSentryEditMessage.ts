import { Events, Message } from "discord.js";
import { BotEvent } from "../../types";
import { discordSentry } from "../manager/sentry";
import { isDiscordSentryEnabled } from "../manager/configurationManager";

const event: BotEvent = {
  name: "discordSentryEditMessage",
  type: Events.MessageUpdate,
  async execute(oldMessage: Message, newMessage: Message) {
    console.log(oldMessage, newMessage);
    if (!isDiscordSentryEnabled()) {
      return;
    }

    if (newMessage.author.bot) {
      return;
    }

    if (!oldMessage.editedAt) {
      return;
    }

    discordSentry(
      newMessage.client,
      newMessage.channel,
      "Edit message",
      `${oldMessage.content} -> ${newMessage.content}`,
      newMessage.member.user
    );
  },
};

export default event;