import { Events, Message } from "discord.js";
import { BotEvent } from "../../types";
import { discordSentry } from "../manager/sentry";
import { isConfigureEnabled } from "../manager/configurationManager";

const event: BotEvent = {
  name: "discordSentryUpdateMessage",
  type: Events.MessageUpdate,
  async execute(oldMessage: Message, newMessage: Message) {
    if (!isConfigureEnabled(process.env.APP_SENTRY)) {
      return;
    }
    
    if (oldMessage.partial) oldMessage = await oldMessage.fetch();
    if (newMessage.partial) newMessage = await newMessage.fetch();

    if (newMessage.author.bot || !newMessage.editedAt) {
      return;
    }

    discordSentry(
      newMessage.client,
      newMessage.channel,
      "Update message",
      `${oldMessage.content} => ${newMessage.content}`,
      newMessage.member.user
    );
  },
};

export default event;
