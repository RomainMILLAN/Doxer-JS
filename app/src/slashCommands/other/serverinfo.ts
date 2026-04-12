import {
  ChannelType,
  MessageFlags,
  PermissionsBitField,
  SlashCommandBuilder,
} from "discord.js";
import { SlashCommand } from "../../../types";
import { EmbedBuilder } from "discord.js";
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

    const guild = interaction.guild;
    if (!guild) return;

    await interaction.reply({
      embeds: [
        new EmbedBuilder()
          .setAuthor({
            name: guild.name,
            iconURL: guild.iconURL({ size: 256 }) ?? undefined,
          })
          .addFields(
            {
              name: `${crownMark} Fondateur`,
              value: (await guild.fetchOwner()).user.tag,
              inline: true,
            },
            {
              name: `${userMark} Nombre de membres`,
              value: guild.memberCount.toString(),
              inline: true,
            },
            {
              name: `${writeMark} Nombre de salons textuels`,
              value: guild.channels.cache
                .filter((channel) => channel.type === ChannelType.GuildText)
                .size.toString(),
              inline: true,
            },
            {
              name: `${vocalMark} Nombre de salons vocaux`,
              value: guild.channels.cache
                .filter((channel) => channel.type === ChannelType.GuildVoice)
                .size.toString(),
              inline: true,
            },
            {
              name: `${folderMark} Nombre de categories`,
              value: guild.channels.cache
                .filter((channel) => channel.type === ChannelType.GuildCategory)
                .size.toString(),
              inline: true,
            },
            {
              name: `${userMark} Roles`,
              value: guild.roles.cache.size.toString(),
              inline: true,
            },
            {
              name: `${userMark} Liste des rôles`,
              value: guild.roles.cache.toJSON().join(", "),
            }
          ),
      ],
      flags: [MessageFlags.Ephemeral],
    });

    sentry(
      interaction.client,
      "Server Information",
      `${whiteCheckMark} Affichage des informations du serveur '${guild.name}'`,
      interaction.user,
      "/serverinfo"
    );

    return;
  },
};
