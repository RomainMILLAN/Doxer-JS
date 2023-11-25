"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.command = void 0;
const discord_js_1 = require("discord.js");
const sentry_1 = require("../../manager/sentry");
const embedBuilder_1 = __importStar(require("../../manager/embedBuilder"));
const icon_1 = require("../../manager/enum/icon");
exports.command = {
    name: "confirm",
    data: new discord_js_1.SlashCommandBuilder()
        .setName("confirm")
        .setDescription("Confirmer un utilisateur")
        .setDMPermission(false)
        .setDefaultMemberPermissions(discord_js_1.PermissionFlagsBits.ModerateMembers)
        .addUserOption(option => option
        .setName('user')
        .setDescription('Utilisateur à confirmer')
        .setRequired(true))
        .addRoleOption(option => option
        .setName('role')
        .setDescription('Rôle à attribuée')
        .setRequired(true))
        .addStringOption(option => option
        .setName('nickname')
        .setDescription('Pseudo à attribuer')
        .setRequired(false)),
    execute: async (interaction) => {
        const user = interaction.user;
        const roleStaffId = process.env.R_STAFF;
        const userSelect = interaction.guild.members.cache.get(interaction.options.get('user').value.toString());
        const roleSelect = interaction.options.get('role');
        let command = `/confirm user:${userSelect.id.toString()} role:${roleSelect.value.toString()}`;
        if (false == interaction.member.roles.cache.has(roleStaffId)) {
            interaction.reply({
                embeds: [
                    (0, embedBuilder_1.permErrorBuilder)('STAFF')
                ],
                ephemeral: true,
            });
            (0, sentry_1.sentry)(interaction.client, 'DiscordGuard/Confirm', icon_1.xMark + ' Permission manquante (\`STAFF\`)', user, `/confirm user:${userSelect.id.toString()} role:${roleSelect.value.toString()}`);
            return;
        }
        userSelect.roles.add(roleSelect.value.toString());
        if (null !== interaction.options.get('nickname')) {
            let nickname = interaction.options.get('nickname').value.toString();
            userSelect.setNickname(nickname);
            command += ` nickname:${nickname.toString()}`;
        }
        interaction.reply({
            embeds: [
                (0, embedBuilder_1.default)(`Confirmation d'utilisateur`, `L'utilisateur ${userSelect.toString()} à était confirmer avec le rôle \`${roleSelect.role.name}\``, discord_js_1.Colors.Green)
            ]
        });
        (0, sentry_1.sentry)(interaction.client, `DiscordGuard/Confirm`, icon_1.whiteCheckMark + ` Confirmation d'utilisateur (\`${userSelect.id.toString()}\` | \`${roleSelect.role.name}\`)`, user, command);
    }
};
