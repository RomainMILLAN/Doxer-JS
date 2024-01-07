import { Events, Message } from "discord.js";
import { BotEvent } from "../../types";
import { sendLog } from "../manager/consoleManager";
import { discordSentry } from "../manager/sentry";

const event: BotEvent = {
  name: Events.MessageCreate,
  async execute(message: Message) {
    if (message.author.bot) {
      return;
    }

    if (
      null == process.env.TC_DISCORD_SENTRY ||
      "" == process.env.TC_DISCORD_SENTRY
    ) {
      return;
    }

    if (null == process.env.APP_SENTRY || "FALSE" == process.env.APP_SENTRY) {
      return;
    }

    discordSentry(
      message.client,
      message.channel,
      message.content,
      message.member.user
    );
  },
};

export default event;
