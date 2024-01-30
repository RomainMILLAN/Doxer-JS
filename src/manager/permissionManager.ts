import {
  CommandInteraction,
  GuildMember,
  GuildMemberRoleManager,
} from "discord.js";
import sentry from "./sentry";
import { xMark } from "./enum/icon";
import { restrictionMemberEmbed } from "./embedBuilder";

export function isMemberOp(member: GuildMember): boolean {
  return (member.roles as GuildMemberRoleManager).cache.has(process.env.R_OP);
}

export function isMemberStaff(member: GuildMember): boolean {
  if (isMemberOp(member)) {
    return true;
  }

  return (member.roles as GuildMemberRoleManager).cache.has(
    process.env.R_STAFF
  );
}

/**
 * @param interaction interaction to check
 * @param command command to send to sentry if not authorized
 * @param title title of sentry if not authorized
 * @returns boolean true (authorized) | false (not authorized)
 */
export function slashCommandStaffRestriction(
  interaction: CommandInteraction,
  command: string,
  title: string
): boolean {
  if (isMemberStaff(interaction.member as GuildMember)) {
    return true;
  }

  slashCommandNotAuthorized(interaction, command, title);
  return false;
}

/**
 * @param interaction interaction to check
 * @param command command to send to sentry if not authorized
 * @param title title of sentry if not authorized
 * @returns boolean true (authorized) | false (not authorized)
 */
export function slashCommandOpRestriction(
  interaction: CommandInteraction,
  command: string,
  title: string
): boolean {
  if (isMemberOp(interaction.member as GuildMember)) {
    return true;
  }

  slashCommandNotAuthorized(interaction, command, title);
  return false;
}

/**
 * @param interaction interaction to check
 * @param command command to send to sentry if not authorized
 * @param title title of sentry if not authorized
 * @returns boolean true (authorized) | false (not authorized)
 */
export function isRestrictedOP(
  interaction: CommandInteraction,
  command: string,
  title: string
) {
  if (isMemberOp(interaction.member as GuildMember)) {
    return true;
  }

  slashCommandNotAuthorized(interaction, command, title);
  return false;
}

function slashCommandNotAuthorized(
  interaction: CommandInteraction,
  command: string,
  title: string
) {
  interaction.reply({
    embeds: [restrictionMemberEmbed()],
    ephemeral: true,
  });

  sentry(
    interaction.client,
    title,
    `${xMark} Action non authorisée (\`STAFF\`).`,
    interaction.user,
    command
  );
}
