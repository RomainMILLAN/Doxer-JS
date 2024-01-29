import {
  SlashCommandBuilder,
  Colors,
  EmbedBuilder,
  TextChannel,
} from "discord.js";
import { SlashCommand } from "../../../types";
import sentry from "../../manager/sentry";
import { sendDebug } from "../../manager/consoleManager";
import coloredEmbed from "../../manager/embedBuilder";

export const command: SlashCommand = {
  name: "poll",
  data: new SlashCommandBuilder()
    .setName("poll")
    .setDescription("Crée un sondage")
    .setDMPermission(false)
    .addStringOption((option) =>
      option
        .setName("question")
        .setDescription("La question du sondage")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("choix")
        .setDescription(
          "Les choix du sondage (Exemple: `:x:, :white_check_mark:`)"
        )
        .setRequired(false)
    ),
  execute: async (interaction) => {
    const question = interaction.options.get("question").value;
    let choicesText = "✅, ❌";

    if (interaction.options.get("choix") !== null) {
      choicesText = String(interaction.options.get("choix").value);
    }

    let choices = choicesText.split(", ");

    let footerText = "Plusieurs choix sont possibles pour ce sondage: ";
    choices.forEach((element) => {
      footerText += element + " ";
    });

    interaction.reply({
      embeds: [
        coloredEmbed(
          `Sondage ❓`,
          `Votre sondage (\`${question}\`) à était crée avec succès.`,
          Colors.Green
        ),
      ],
      ephemeral: true,
    });

    const currentTextChannel = interaction.channel as TextChannel;
    currentTextChannel
      .send({
        embeds: [
          new EmbedBuilder()
            .setTitle(`Sondage de ${interaction.user.displayName} ❓`)
            .setThumbnail(interaction.user.avatarURL())
            .setDescription(`${question}`)
            .setFooter({ text: footerText })
            .setColor(Colors.Blue),
        ],
      })
      .then((message) => {
        choices.forEach((element) => {
          message.react(element);
        });
      });

    sentry(
      interaction.client,
      "PollExclamer/Poll",
      `Création d'un sondage (\`${question}\`)`,
      interaction.user,
      `/poll question:${question} choices:${choicesText}`
    );
  },
};
