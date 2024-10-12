import { SlashCommandBuilder, Colors, EmbedBuilder } from "discord.js";
import { SlashCommand } from "../../../types";
import { sentry } from "../../manager/sentry";
import {
  interdictionMark,
  whiteCheckMark,
  xMark,
} from "../../manager/enum/icon";

export const command: SlashCommand = {
  name: "profil",
  data: new SlashCommandBuilder()
    .setName("profil")
    .setDescription("Affiche le profile d'un utilisateur")
    .addUserOption((option) =>
      option.setName("user").setDescription("Utilisateur").setRequired(true)
    ),
  execute: async (interaction) => {
    const user = interaction.options.getUser(`user`);

    if (!user) {
      interaction.reply({
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
        `DiscordProfiler/Profil`,
        xMark + ` Utilisateur indiqué non trouvée`,
        interaction.user,
        `/Profil user:`
      );

      return;
    }

    interaction.reply({
      embeds: [
        new EmbedBuilder()
          .setTitle(`:jigsaw: Profile de ${user.displayName}`)
          .setDescription(`Description de ${user.displayName}`)
          .addFields(
            {
              name: `__Identifiant:__`,
              value: `\`${user.id}\``,
            },
            {
              name: `__Nom:__`,
              value: `\`${user.globalName.toString()}\``,
            },
            {
              name: `__URL de l\'avatar:__`,
              value: `${user.avatarURL()}`,
            },
            {
              name: `__Couleur Hexadecimal:__`,
              value: `${
                user.hexAccentColor ?? `*Aucune couleur d\'accentuation*`
              }`,
            }
          )
          .setColor(Colors.Navy),
      ],
      ephemeral: true,
    });

    sentry(
      interaction.client,
      `DiscordProfiler/Avatar`,
      whiteCheckMark + ` Visualisation du profil de ${user.displayName}`,
      interaction.user,
      `/profil user:${user.globalName}`
    );
  },
};
