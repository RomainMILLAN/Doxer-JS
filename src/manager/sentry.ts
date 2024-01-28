import { Channel, Client, EmbedBuilder, TextChannel, User } from "discord.js";
import { sendDiscordSentryLog, sendLog } from "./consoleManager";
import {
  getCurrentFormattedDateString,
  getCurrentFormattedTimeString,
} from "./timeManager";
import { isConfigure } from "./configurationManager";

function isSentryEnabled(): boolean {
  if (
    isConfigure(process.env.APP_SENTRY) && 
    process.env.APP_SENTRY.toLocaleLowerCase() === "true"
  ) {
    return true;
  }

  return false;
}

export function sentry(
  client: Client,
  title: string,
  description: string,
  user: User,
  command: string | null = null
) {
  if (
    !isConfigure(process.env.TC_SENTRY) ||
    !isSentryEnabled()
  )
    return;

  client.guilds.fetch(process.env.GUILD_ID).then((r) => {
    r.channels.fetch(process.env.TC_SENTRY).then((c: TextChannel) => {
      var embed = new EmbedBuilder()
        .setTitle(`📝 SENTRY/${title}`)
        .setDescription(`${title} - ${user.toString()}\n > ${description}`)
        .setColor("Orange")
        .setFooter({
          text: `Le ${getCurrentFormattedDateString()} à ${getCurrentFormattedTimeString()}`,
        });

      if (null !== command) {
        embed.addFields({
          name: "Commande",
          value: `\`${command}\``,
        });
      }

      c.send({
        embeds: [embed],
      });
      sendLog(user.globalName + " | " + title + "/" + description);
    });
  });
}

export function discordSentry(
  client: Client,
  channel: Channel,
  type: string,
  description: string,
  user: User
) {
  if (
    !isConfigure(process.env.TC_SENTRY) ||
    !isSentryEnabled()
  )
    return;

  client.guilds.fetch(process.env.GUILD_ID).then((r) => {
    r.channels.fetch(process.env.TC_DISCORD_SENTRY).then((c: TextChannel) => {
      var embed = new EmbedBuilder()
        .setTitle(`📝 DISCORD SENTRY/Message`)
        .setDescription(
          `${type} - ${user.toString()}\n > ${channel.toString()}\n > ${description}`
        )
        .setColor("Orange")
        .setFooter({
          text: `Le ${getCurrentFormattedDateString()} à ${getCurrentFormattedTimeString()}`,
        });

      c.send({
        embeds: [embed],
      });
      sendDiscordSentryLog(user.globalName + " | " + description);
    });
  });
}

export default sentry;
