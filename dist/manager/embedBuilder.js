"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorBuilder = void 0;
const discord_js_1 = require("discord.js");
function errorBuilder(permission = null) {
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
exports.errorBuilder = errorBuilder;
exports.default = errorBuilder;
