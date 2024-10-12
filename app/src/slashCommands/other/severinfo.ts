import {
  ChannelType,
  PermissionsBitField,
  SlashCommandBuilder,
} from "discord.js";
import { SlashCommand } from "../../../types";
import { EmbedBuilder } from "@discordjs/builders";
import {
  crownMark,
  folderMark,
  userMark,
  vocalMark,
  whiteCheckMark,
  writeMark,
} from "../../manager/enum/icon";
import { slashCommandOpRestriction } from "../../manager/permissionManager";
import sentry from "../../manager/sentry";

export const command: SlashCommand = {
  name: "serverinfo",
  data: new SlashCommandBuilder()
    .setName("serverinfo")
    .setDescription("Affiche les informations du serveur")
    .setDefaultMemberPermissions(PermissionsBitField.Flags.ManageGuild),
  execute: async (interaction) => {
    if (!slashCommandOpRestriction(interaction, `/serverinfo`, `ServerInfo`))
      return;

    interaction.reply({
      embeds: [
        new EmbedBuilder()
          .setAuthor({
            name: interaction.guild.name,
            iconURL: interaction.guild.iconURL({ size: 256 }),
          })
          .addFields(
            {
              name: `${crownMark} Fondateur`,
              value: (await interaction.guild.fetchOwner()).user.tag,
              inline: true,
            },
            {
              name: `${userMark} Nombre de membres`,
              value: interaction.guild.memberCount.toString(),
              inline: true,
            },
            {
              name: `${writeMark} Nombre de salons textuels`,
              value: interaction.guild.channels.cache
                .filter((channel) => channel.type === ChannelType.GuildText)
                .size.toString(),
              inline: true,
            },
            {
              name: `${vocalMark} Nombre de salons vocaux`,
              value: interaction.guild.channels.cache
                .filter((channel) => channel.type === ChannelType.GuildVoice)
                .size.toString(),
              inline: true,
            },
            {
              name: `${folderMark} Nombre de categories`,
              value: interaction.guild.channels.cache
                .filter((channel) => channel.type === ChannelType.GuildCategory)
                .size.toString(),
              inline: true,
            },
            {
              name: `${userMark} Roles`,
              value: interaction.guild.roles.cache.size.toString(),
              inline: true,
            },
            {
              name: `${userMark} Liste des rôles`,
              value: interaction.guild.roles.cache.toJSON().join(", "),
            }
          ),
      ],
      ephemeral: true,
    });

    sentry(
      interaction.client,
      "Server Information",
      `${whiteCheckMark} Affichage des informations du serveur '${interaction.guild.name}'`,
      interaction.user,
      "/serverinfo"
    );

    return;
  },
};
