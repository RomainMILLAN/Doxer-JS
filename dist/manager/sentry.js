"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sentry = void 0;
const discord_js_1 = require("discord.js");
function sentry(client, title, description, user, command = null) {
    client.guilds.fetch(process.env.GUILD_ID).then(r => {
        r.channels.fetch(process.env.TC_SENTRY).then((c) => {
            var embed = new discord_js_1.EmbedBuilder()
                .setTitle(`📝 SENTRY/${title}`)
                .setDescription(`${title} - ${user.toString()}\n > ${description}`)
                .setColor("Orange");
            if (null !== command) {
                embed
                    .addFields({
                    name: 'Commande',
                    value: `\`${command}\``,
                });
            }
            c.send({
                embeds: [
                    embed,
                ]
            });
        });
    });
}
exports.sentry = sentry;
exports.default = sentry;
