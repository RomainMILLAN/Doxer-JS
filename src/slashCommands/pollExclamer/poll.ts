import { SlashCommandBuilder, Colors, EmbedBuilder } from "discord.js";
import { SlashCommand } from "../../../types";
import sentry from "../../manager/sentry";

export const command: SlashCommand = {
    name: "poll",
    data: new SlashCommandBuilder()
        .setName("poll")
        .setDescription("Crée un sondage")
        .setDMPermission(false)
        .addStringOption(option => 
            option
                .setName('question')
                .setDescription('La question du sondage')
                .setRequired(true)
        ),
    execute: async (interaction) => {
        const question = interaction.options.get('question').value;

        interaction.reply({
            embeds: [
                new EmbedBuilder()
                    .setTitle(`Sondage :question:`)
                    .setDescription(`${question}`)
                    .setColor(Colors.Blue)
            ],
            fetchReply: true,
        }).then((message) => {
            message.react("✅");
            message.react("❌");
        })

        sentry(
            interaction.client,
            'PollExclamer/Poll',
            `Création d'un sondage (\`${question}\`)`,
            interaction.user,
            `/poll question:${question}`,
        )
    }
}