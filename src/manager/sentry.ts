import { APIInteractionGuildMember, Client, EmbedBuilder, GuildMember, TextChannel } from "discord.js";

export function sentry(client: Client, title: string, description: string, member: GuildMember | APIInteractionGuildMember) {
    client.guilds.fetch(process.env.GUILD_ID).then(r => {
        r.channels.fetch(process.env.TC_SENTRY).then((c: TextChannel) => {
            c.send({
                embeds: [
                    new EmbedBuilder()
                        .setTitle(`📝 SENTRY/${title})`)
                        .setDescription(
                            `${title} - ${member.toString}\n > ${description}`
                        )
                        .setColor("Orange")
                ]
            });
        })
    })
}

export default sentry;