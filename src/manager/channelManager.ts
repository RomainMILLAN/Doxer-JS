import { ChannelType, Guild, PermissionsBitField, User } from "discord.js";

export function createTicketChannelText(user: User, guild: Guild) {
  return guild.channels.create({
    name: `🏷️-ticket-${user.username}`,
    type: ChannelType.GuildText,
    parent: process.env.C_TICKET,
    permissionOverwrites: [
      {
        id: guild.id,
        deny: [PermissionsBitField.Flags.ViewChannel],
      },
      {
        id: user.id,
        allow: [
          PermissionsBitField.Flags.ViewChannel,
          PermissionsBitField.Flags.SendMessages,
          PermissionsBitField.Flags.AddReactions,
          PermissionsBitField.Flags.ReadMessageHistory,
          PermissionsBitField.Flags.AttachFiles,
          PermissionsBitField.Flags.ManageMessages,
        ],
      },
      {
        id: process.env.R_STAFF,
        allow: [PermissionsBitField.Flags.Administrator],
      },
      {
        id: process.env.R_OP,
        allow: [PermissionsBitField.Flags.Administrator],
      },
    ],
  });
}
