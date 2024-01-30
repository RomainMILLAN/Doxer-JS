import {
  SlashCommandBuilder,
  Colors,
  EmbedBuilder,
  ChannelType,
  PermissionsBitField,
} from "discord.js";
import { SlashCommand } from "../../../types";
import sentry from "../../manager/sentry";
import { coloredEmbed } from "../../manager/embedBuilder";
import { whiteCheckMark, xMark } from "../../manager/enum/icon";

export const command: SlashCommand = {
  name: "room",
  data: new SlashCommandBuilder()
    .setName("room")
    .setDescription(
      "Crée une salle audio (NE PAS UTILISER, TOUS LES USERS PEUVENT LES VOIR / REJOINDRE)"
    )
    .setDMPermission(false),
  execute: async (interaction) => {
    interaction.guild.channels
      .create({
        name: `🔉 • Sallon de ${interaction.user.displayName.toString()}`,
        type: ChannelType.GuildVoice,
        parent: process.env.VC_CATEGORY,
        permissionOverwrites: [
          {
            id: interaction.user.id,
            allow: [
              PermissionsBitField.Flags.Administrator,
              PermissionsBitField.Flags.ViewChannel,
              PermissionsBitField.Flags.ManageChannels,
              PermissionsBitField.Flags.Connect,
            ],
          },
        ],
      })
      .then((channel) => {
        interaction.reply({
          embeds: [
            coloredEmbed(
              `Création d'une salle audio`,
              `Votre salle audio a été créée (\`${channel.name.toString()}\`)`,
              "Gold"
            ),
          ],
          ephemeral: true,
        });

        sentry(
          interaction.client,
          "VoiceClick/Room",
          whiteCheckMark +
            `Création d'une nouvelle salle audio (\`${channel.name.toString()}\`)`,
          interaction.user,
          `/room`
        );
      })
      .catch((error) => {
        interaction.reply({
          embeds: [
            new EmbedBuilder()
              .setTitle(`${xMark} Création d'une salle audio`)
              .setDescription(error.toString())
              .setColor(Colors.Red),
          ],
          ephemeral: true,
        });

        sentry(
          interaction.client,
          "VoiceClick/Room",
          xMark + `Erreur lors de la création d'une nouvelle salle audio`,
          interaction.user,
          `/room`
        );
      });
  },
};
