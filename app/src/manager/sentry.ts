import { Channel, Client, EmbedBuilder, User } from "discord.js";
import { sendDiscordSentryLog, sendError, sendLog } from "./consoleManager";
import {
  getCurrentFormattedDateString,
  getCurrentFormattedTimeString,
} from "./timeManager";
import { isConfigure, isSentryEnabled } from "./configurationManager";
import { writeMark } from "./enum/icon";

export async function sentry(
  client: Client,
  title: string,
  description: string,
  user: User,
  command: string | null = null
) {
  if (!isConfigure(process.env.TC_SENTRY) || !isSentryEnabled()) return;

  try {
    const guild = await client.guilds.fetch(process.env.GUILD_ID);
    const c = await guild.channels.fetch(process.env.TC_SENTRY);
    if (!c?.isTextBased()) return;

    const embed = new EmbedBuilder()
      .setTitle(`${writeMark} SENTRY/${title}`)
      .setDescription(`${title} - ${user.toString()}\n > ${description}`)
      .setColor("Orange")
      .setFooter({
        text: `Le ${getCurrentFormattedDateString()} à ${getCurrentFormattedTimeString()}`,
      })
      .setTimestamp();

    if (null !== command) {
      embed.addFields({
        name: "Commande",
        value: `\`${command}\``,
      });
    }

    await c.send({ embeds: [embed] });
  } catch (e) {
    sendError(`Sentry error: ${e}`);
  }

  sendLog(`${user.globalName}(${user.id}) | ${title}: ${description} (${command})`);
}

export async function discordSentry(
  client: Client,
  channel: Channel,
  type: string,
  description: string,
  user: User | null,
) {
  if (!isConfigure(process.env.TC_SENTRY) || !isSentryEnabled()) return;

  const userDisplay = user ? user.toString() : "Inconnu";

  try {
    const guild = await client.guilds.fetch(process.env.GUILD_ID);
    const c = await guild.channels.fetch(process.env.TC_DISCORD_SENTRY);
    if (!c?.isTextBased()) return;

    const embed = new EmbedBuilder()
      .setTitle(`${writeMark} DISCORD SENTRY/${type.toUpperCase()}`)
      .setDescription(
        `${type} - ${userDisplay}\n > ${channel.toString()}\n > ${description}`
      )
      .setColor("Orange")
      .setFooter({
        text: `Le ${getCurrentFormattedDateString()} à ${getCurrentFormattedTimeString()}`,
      })
      .setTimestamp();

    await c.send({ embeds: [embed] });
  } catch (e) {
    sendError(`Discord sentry error: ${e}`);
  }

  const userLog = user ? `${user.globalName}(${user.id})` : "Inconnu";
  sendDiscordSentryLog(`${userLog} | [${type}] ${channel.toString()}: ${description}`);
}

export default sentry;
