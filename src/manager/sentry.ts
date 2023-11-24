import { Client, EmbedBuilder, GuildMember, TextChannel, User } from "discord.js";

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
        })
    })
}

export default sentry;