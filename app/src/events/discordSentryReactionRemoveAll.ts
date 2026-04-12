import { Collection, Events, Message, MessageReaction } from "discord.js";
import { BotEvent } from "../../types";
import { discordSentry } from "../manager/sentry";
import isDiscordSentryBlacklisted from "../manager/discordSentryManager";
import { isConfigureEnabled } from "../manager/configurationManager";

const event: BotEvent = {
  name: "discordSentryReactionRemoveAll",
  type: Events.MessageReactionRemoveAll,
  async execute(message: Message, reactions: Collection<string, MessageReaction>) {
    if (!isConfigureEnabled(process.env.APP_SENTRY)) {
      return;
    }

    if (message.partial) {
      message = await message.fetch();
    }

    if (isDiscordSentryBlacklisted(message.channel.id)) {
      return;
    }

    const reactionList = reactions.map((r) => r.emoji.toString()).join(", ");

    discordSentry(
      message.client,
      message.channel,
      "Delete all reactions",
      `Message : \`${message.content}\`\n > Reactions : \`${reactionList}\``,
      null,
    );
  },
};

export default event;
