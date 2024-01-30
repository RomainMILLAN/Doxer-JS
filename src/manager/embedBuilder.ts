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
