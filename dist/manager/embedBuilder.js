"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.coloredEmbed = exports.errorBuilder = exports.permErrorBuilder = void 0;
const discord_js_1 = require("discord.js");
function permErrorBuilder(permission = null) {
    var embed = new discord_js_1.EmbedBuilder()
        .setTitle("🚫 Accès refusé")
        .setDescription("Vous n'avez pas la permission d'utiliser cette commande.")
        .setColor("Red");
    if (null !== permission) {
        embed
            .addFields({
            name: 'Permission',
            value: `\`${permission}\``
        });
    }
    return embed;
}
exports.permErrorBuilder = permErrorBuilder;
function errorBuilder(title = null, description = null) {
    return coloredEmbed(`🚫 ${title}`, description, "Red");
}
exports.errorBuilder = errorBuilder;
function coloredEmbed(title = null, description = null, color = null) {
    var embed = new discord_js_1.EmbedBuilder()
        .setTitle(title)
        .setDescription(description)
        .setColor(color);
    return embed;
}
exports.coloredEmbed = coloredEmbed;
exports.default = coloredEmbed;
