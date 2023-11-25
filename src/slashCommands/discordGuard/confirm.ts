import { SlashCommandBuilder, Colors, EmbedBuilder, PermissionFlagsBits, GuildMemberRoleManager } from "discord.js";
import { SlashCommand } from "../../../types";
import { sentry } from "../../manager/sentry";
import coloredEmbed, { permErrorBuilder } from "../../manager/embedBuilder";
import { whiteCheckMark, xMark } from "../../manager/enum/icon";

export const command: SlashCommand = {
    name: "confirm",
    data: new SlashCommandBuilder()
        .setName("confirm")
        .setDescription("Confirmer un utilisateur")
        .setDMPermission(false)
        .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers)
        .addUserOption(option => 
            option
                .setName('user')
                .setDescription('Utilisateur à confirmer')
                .setRequired(true),
        )
        .addRoleOption(option => 
            option
                .setName('role')
                .setDescription('Rôle à attribuée')
                .setRequired(true),
        )
        .addStringOption(option =>
            option
                .setName('nickname')
                .setDescription('Pseudo à attribuer')
                .setRequired(false),
        ),
    execute: async (interaction) => {
        const user = interaction.user;
        const roleStaffId = process.env.R_STAFF;
        const userSelect = interaction.guild.members.cache.get(interaction.options.get('user').value.toString());
        const roleSelect = interaction.options.get('role');
        let command = `/confirm user:${userSelect.id.toString()} role:${roleSelect.value.toString()}`;

        if (false == (interaction.member.roles as GuildMemberRoleManager).cache.has(roleStaffId)) {
            interaction.reply({
                embeds: [
                    permErrorBuilder('STAFF')
                ],
                ephemeral: true,
            });
    
            sentry(
                interaction.client,
                'DiscordGuard/Confirm',
                xMark + ' Permission manquante (\`STAFF\`)',
                user,
                `/confirm user:${userSelect.id.toString()} role:${roleSelect.value.toString()}`,
            )
    
            return;
        }

        (userSelect.roles as GuildMemberRoleManager).add(roleSelect.value.toString());

        if(null !== interaction.options.get('nickname')) {
            let nickname = interaction.options.get('nickname').value.toString();

            userSelect.setNickname(nickname);
            command += ` nickname:${nickname.toString()}`;
        }

        interaction.reply({
            embeds: [
                coloredEmbed(
                    `Confirmation d'utilisateur`,
                    `L'utilisateur ${userSelect.toString()} à était confirmer avec le rôle \`${roleSelect.role.name}\``,
                    Colors.Green,
                )
            ]
        });

        sentry(
            interaction.client,
            `DiscordGuard/Confirm`,
            whiteCheckMark + ` Confirmation d'utilisateur (\`${userSelect.id.toString()}\` | \`${roleSelect.role.name}\`)`,
            user,
            command,
        )
    }
}