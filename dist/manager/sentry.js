"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sentry = void 0;
const discord_js_1 = require("discord.js");
function sentry(client, title, description, member) {
    client.guilds.fetch(process.env.GUILD_ID).then(r => {
        r.channels.fetch(process.env.TC_SENTRY).then((c) => {
            c.send({
                embeds: [
                    new discord_js_1.EmbedBuilder()
                        .setTitle(`📝 SENTRY/${title})`)
                        .setDescription(`${title} - ${member.toString}\n > ${description}`)
                        .setColor("Orange")
                ]
            });
        });
    });
}
exports.sentry = sentry;
exports.default = sentry;
