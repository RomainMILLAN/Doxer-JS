import { Channel, Client, EmbedBuilder, GuildMember, TextChannel, User } from "discord.js";
import { sendDiscordSentryLog, sendLog } from "./consoleManager";

export function sentry(client: Client, title: string, description: string, user: User, command: string|null = null) {
    client.guilds.fetch(process.env.GUILD_ID).then(r => {
        r.channels.fetch(process.env.TC_SENTRY).then((c: TextChannel) => {
            var embed = new EmbedBuilder()
                        .setTitle(`📝 SENTRY/${title}`)
                        .setDescription(
                            `${title} - ${user.toString()}\n > ${description}`
                        )
                        .setColor("Orange");
            
            if(null !== command) {
                embed
                    .addFields({
                        name: 'Commande',
                        value: `\`${command}\``,
                    })
            }

            c.send({
                embeds: [
                    embed,
                ]
            });
            sendLog(user.globalName + " | " + title + "/" + description);
        })
    })
}

export function discordSentry(client: Client, channel: Channel, description: string, user: User) {
    client.guilds.fetch(process.env.GUILD_ID).then(r => {
        r.channels.fetch(process.env.TC_DISCORD_SENTRY).then((c: TextChannel) => {
            const date = new Date();
            let day = date.getDate();
            let month = date.getMonth() + 1;
            let year = date.getFullYear();
            let hour = date.getHours();
            let min = date.getMinutes();

            var embed = new EmbedBuilder()
                        .setTitle(`📝 DISCORD SENTRY/Message`)
                        .setDescription(
                            `Message - ${user.toString()}\n > ${channel.toString()}\n > ${description}`
                        )
                        .setColor("White")
                        .setFooter({
                            text: `Le ${day}/${month}/${year} à ${hour}:${min}` 
                        });
            
            c.send({
                embeds: [
                    embed,
                ]
            });
            sendDiscordSentryLog(user.globalName + " | " + description);
        })
    })
}

export default sentry;