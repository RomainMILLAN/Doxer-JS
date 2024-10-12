import {
  SlashCommandBuilder,
  Colors,
  EmbedBuilder,
  GuildMemberRoleManager,
  User,
  GuildMember,
  PermissionsBitField,
} from "discord.js";
import { SlashCommand } from "../../../types";
import { sentry } from "../../manager/sentry";
import { whiteCheckMark, xMark } from "../../manager/enum/icon";
import {
  isMember,
  isMemberStaff,
  slashCommandStaffRestriction,
} from "../../manager/permissionManager";
import { isConfigure } from "../../manager/configurationManager";

export const command: SlashCommand = {
  name: "confirm",
  data: new SlashCommandBuilder()
    .setName("confirm")
    .setDescription("Confirmer un utilisateur")
    .setDefaultMemberPermissions(PermissionsBitField.Flags.ModerateMembers)
    .addUserOption((option) =>
      option
        .setName("user")
        .setDescription("Utilisateur à confirmer")
        .setRequired(true)
    )
    .addRoleOption((option) =>
      option
        .setName("role")
        .setDescription("Rôle à attribuée")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("nickname")
        .setDescription("Pseudo à attribuer")
        .setRequired(false)
    ),
  execute: async (interaction) => {
    const user: User = interaction.user;
    const userSelect: GuildMember = interaction.guild.members.cache.get(
      interaction.options.get("user").value.toString()
    );
    const roleSelect: any = interaction.options.get("role");

    let command: string = `/confirm user:${userSelect.id.toString()} role:${roleSelect.value.toString()}`;
    let nickname: string | null = null;
    let confirmDescription = `L'utilisateur ${userSelect.toString()} a été confirmé avec le rôle ${
      roleSelect.role
    }`;

    if (null !== interaction.options.get("nickname")) {
      nickname = interaction.options.get("nickname").value.toString();
      command += ` nickname:${nickname.toString()}`;
    }

    if (
      !slashCommandStaffRestriction(
        interaction,
        command,
        "DiscordGuard/Confirm"
      )
    ) {
      return;
    }

    if (isMemberCannotConfirmed(userSelect)) {
      interaction.reply({
        embeds: [
          new EmbedBuilder()
            .setTitle(`${xMark} Confirmation d'utilisateur`)
            .setDescription(
              `L'utilisateur ${userSelect.toString()} à déjà était confirmer`
            )
            .setColor(Colors.Red),
        ],
      });

      sentry(
        interaction.client,
        `DiscordGuard/Confirm`,
        `${xMark} Confirmation d'un utilisateur déjà confirmé impossible (\`${userSelect.id.toString()}\` | \`${
          roleSelect.role.name
        }\`)`,
        user,
        command
      );

      return;
    }

    if(isConfigure(process.env.R_MEMBER)) {
      (userSelect.roles as GuildMemberRoleManager).add(
        process.env.R_MEMBER
      );
    }

    (userSelect.roles as GuildMemberRoleManager).add(
      roleSelect.value.toString()
    );

    if (null !== nickname) {
      userSelect.setNickname(nickname);
      confirmDescription += ` et le pseudo \`${nickname}\``;
    }

    interaction.reply({
      embeds: [
        new EmbedBuilder()
          .setTitle(`Confirmation d'utilisateur`)
          .setDescription(confirmDescription)
          .setColor(Colors.Green),
      ],
    });

    sentry(
      interaction.client,
      `DiscordGuard/Confirm`,
      whiteCheckMark +
        ` Confirmation d'utilisateur (\`${userSelect.id.toString()}\` | \`${
          roleSelect.role.name
        }\`)`,
      user,
      command
    );
  },
};

/**
 * @param member member to check
 * @returns boolean true (member can't confirm) | false (member is confirmable)
 */
function isMemberCannotConfirmed(member: GuildMember): boolean {
  return isMember(member) || isMemberStaff(member);
}
