import {
  SlashCommandBuilder,
  Colors,
  EmbedBuilder,
  TextChannel,
} from "discord.js";
import { SlashCommand } from "../../../types";
import sentry from "../../manager/sentry";
import coloredEmbed from "../../manager/embedBuilder";
import { questionMark, whiteCheckMark, xMark } from "../../manager/enum/icon";

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
    let choicesText = `${whiteCheckMark}, ${xMark}`;

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
          `Sondage ${questionMark}`,
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
            .setTitle(
              `Sondage de ${interaction.user.displayName} ${questionMark}`
            )
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
