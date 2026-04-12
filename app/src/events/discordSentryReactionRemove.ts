import { Events, Message, MessageReaction, User } from "discord.js";
import { BotEvent } from "../../types";
import { discordSentry } from "../manager/sentry";
import isDiscordSentryBlacklisted from "../manager/discordSentryManager";
import { isConfigureEnabled } from "../manager/configurationManager";

const event: BotEvent = {
  name: "discordSentryReactionRemove",
  type: Events.MessageReactionRemove,
  async execute(reaction: MessageReaction, user: User) {
    if (!isConfigureEnabled(process.env.APP_SENTRY)) {
      return;
    }

    if (reaction.partial) {
			reaction = await reaction.fetch();
		}

    if (reaction.message.partial) {
      await reaction.message.fetch();
    }

    //@ts-ignore
    const message: Message = reaction.message;

    if (isDiscordSentryBlacklisted(message.channel.id)) {
      return;
    }

    discordSentry(
      message.client,
      message.channel,
      "Delete reaction",
      `Message : \`${message.content}\`\n > Reaction : \`${reaction.emoji}\``,
      user,
    );
  },
};

export default event;
