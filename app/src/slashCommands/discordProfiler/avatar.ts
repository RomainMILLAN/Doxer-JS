import { SlashCommandBuilder, Colors, EmbedBuilder } from "discord.js";
import { SlashCommand } from "../../../types";
import sentry from "../../manager/sentry";
import { interdictionMark, windowMark } from "../../manager/enum/icon";

export const command: SlashCommand = {
  name: "avatar",
  data: new SlashCommandBuilder()
    .setName("avatar")
    .setDescription("Affiche l'avatar d'un utilisateur")
    .addUserOption((option) =>
      option.setName("user").setDescription("Utilisateur").setRequired(true)
    ),
  execute: async (interaction) => {
    const user = interaction.options.get('user')?.user;

    if (!user) {
      await interaction.reply({
        embeds: [
          new EmbedBuilder()
            .setTitle(`${interdictionMark} Utilisateur non trouvée`)
            .setDescription(`Vous devez indiquer un utilisateur valide`)
            .setColor(Colors.Red),
        ],
        ephemeral: true,
      });

      sentry(
        interaction.client,
        "DiscordProfiler/Avatar",
        "Utilisateur indiqué non trouvée",
        interaction.user,
        `/avatar user:${interaction.options.get('user')?.value ?? 'unknown'}`
      );

      return;
    }

    const avatarUrl = user.avatarURL() ?? user.defaultAvatarURL;

    await interaction.reply({
      embeds: [
        new EmbedBuilder()
          .setTitle(`${windowMark} Avatar de ${user.displayName}`)
          .setDescription(
            `Cliquez [ici](${avatarUrl}) pour l\'afficher en grand`
          )
          .setImage(avatarUrl)
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
