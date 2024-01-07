"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.discordSentry = exports.sentry = void 0;
const discord_js_1 = require("discord.js");
const consoleManager_1 = require("./consoleManager");
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
            (0, consoleManager_1.sendLog)(user.globalName + " | " + title + "/" + description);
        });
    });
}
exports.sentry = sentry;
function discordSentry(client, channel, description, user) {
    client.guilds.fetch(process.env.GUILD_ID).then(r => {
        r.channels.fetch(process.env.TC_DISCORD_SENTRY).then((c) => {
            const date = new Date();
            let day = date.getDate();
            let month = date.getMonth() + 1;
            let year = date.getFullYear();
            let hour = date.getHours();
            let min = date.getMinutes();
            var embed = new discord_js_1.EmbedBuilder()
                .setTitle(`📝 DISCORD SENTRY/Message`)
                .setDescription(`Message - ${user.toString()}\n > ${channel.toString()}\n > ${description}`)
                .setColor("White")
                .setFooter({
                text: `Le ${day}/${month}/${year} à ${hour}:${min}`
            });
            c.send({
                embeds: [
                    embed,
                ]
            });
            (0, consoleManager_1.sendLog)(user.globalName + " | " + description);
        });
    });
}
exports.discordSentry = discordSentry;
exports.default = sentry;
