import { EmbedBuilder } from "discord.js";

export function permErrorBuilder(permission: string = null) {
  var embed = new EmbedBuilder()
    .setTitle("🚫 Accès refusé")
    .setDescription("Vous n'avez pas la permission d'utiliser cette commande.")
    .setColor("Red");

  if (null !== permission) {
    embed.addFields({
      name: "Permission",
      value: `\`${permission}\``,
    });
  }

  return embed;
}

export function errorBuilder(title: string = null, description: string = null) {
  return coloredEmbed(`🚫 ${title}`, description, "Red");
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
