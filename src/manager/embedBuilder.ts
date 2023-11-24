import { EmbedBuilder, ColorResolvable } from "discord.js";

export function errorBuilder(permission: string = null) {
    var embed = new EmbedBuilder()
        .setTitle("🚫 Accès refusé")
        .setDescription("Vous n'avez pas la permission d'utiliser cette commande.")
        .setColor("Red");

    if(null !== permission) {
        embed
            .addFields({
                name: 'Permission',
                value: `\`${permission}\``
            });
    }

    return embed;
}

export function coloredEmbed(title: string = null, description: string = null, color: string = null) {
    var embed = new EmbedBuilder()
        .setTitle(title)
        .setDescription(description)
        .setColor(color as ColorResolvable);

    return embed;
}

export default errorBuilder;