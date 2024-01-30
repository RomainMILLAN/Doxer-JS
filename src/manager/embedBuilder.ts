import { EmbedBuilder } from "discord.js";
import { interdictionMark } from "./enum/icon";

export function restrictionMemberEmbed(
  permission: string | null = null,
  description: string = `Vous n'avez pas la permission d'utiliser cette commande.`
) {
  var embed = new EmbedBuilder()
    .setTitle(`${interdictionMark} Accès refusé`)
    .setDescription(description)
    .setColor("Red");

  if (null !== permission) {
    embed.addFields({
      name: "Permission",
      value: `\`${permission}\``,
    });
  }

  return embed;
}

export function coloredEmbed(
  title: string = null,
  description: string = null,
  color = null
) {
  var embed = new EmbedBuilder()
    .setTitle(title)
    .setDescription(description)
    .setColor(color);

  return embed;
}

export default coloredEmbed;
