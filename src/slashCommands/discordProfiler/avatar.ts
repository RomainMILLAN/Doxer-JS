import { SlashCommandBuilder, Colors, EmbedBuilder } from "discord.js";
import { SlashCommand } from "../../../types";
import { coloredEmbed } from "../../manager/embedBuilder";
import sentry from "../../manager/sentry";
import { interdictionMark, windowMark } from "../../manager/enum/icon";

export const command: SlashCommand = {
  name: "avatar",
  data: new SlashCommandBuilder()
    .setName("avatar")
    .setDescription("Affiche l'avatar d'un utilisateur")
    .setDMPermission(true)
    .addUserOption((option) =>
      option.setName("user").setDescription("Utilisateur").setRequired(true)
    ),
  execute: async (interaction) => {
    const user = interaction.options.getUser("user");

    if (!user) {
      interaction.reply({
        embeds: [
          coloredEmbed(
            `${interdictionMark} Utilisateur non trouvée`,
            "Vous devez indiquer un utilisateur valide ",
            Colors.Red.toString()
          ),
        ],
        ephemeral: true,
      });

      sentry(
        interaction.client,
        "DiscordProfiler/Avatar",
        "Utilisateur indiqué non trouvée",
        interaction.user,
        `/avatar user:${user.id}`
      );

      return;
    }

    interaction.reply({
      embeds: [
        new EmbedBuilder()
          .setTitle(`${windowMark} Avatar de ${user.displayName}`)
          .setDescription(
            `Cliquez [ici](${user
              .avatarURL()
              .toString()}) pour l\'afficher en grand`
          )
          .setImage(user.avatarURL().toString())
          .setColor(Colors.Navy),
      ],
    });

    sentry(
      interaction.client,
      "DiscordProfiler/Avatar",
      `Visualisation de l'avatar de ${user.displayName}`,
      interaction.user,
      `/avatar user:${user.globalName}`
    );
  },
};
