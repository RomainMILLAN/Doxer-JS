import {
  ChannelType,
  Guild,
  PermissionsBitField,
  TextChannel,
  User,
} from "discord.js";
import { labelMark } from "./enum/icon";

export function createTicketChannelText(user: User, guild: Guild) {
  return guild.channels.create({
    name: `${labelMark}-ticket-${user.username}`,
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

export function deleteTicketChannelText(channel: TextChannel, user: User) {
  channel.delete(`Ticket close by ${user.tag}`);
}
