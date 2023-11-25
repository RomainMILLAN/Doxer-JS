"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.command = void 0;
const discord_js_1 = require("discord.js");
const icon_1 = require("../../manager/enum/icon");
const embedBuilder_1 = require("../../manager/embedBuilder");
const sentry_1 = __importDefault(require("../../manager/sentry"));
exports.command = {
    name: "adminer",
    data: new discord_js_1.SlashCommandBuilder()
        .setName("adminer")
        .setDescription("Si tu ne sais pas à quoi sa sert, ne l'utilise pas")
        .setDefaultMemberPermissions(discord_js_1.PermissionFlagsBits.Administrator)
        .setDMPermission(false),
    execute: async (interaction) => {
        const roleOpId = process.env.R_OP;
        if (false == interaction.member.roles.cache.has(roleOpId)) {
            interaction.reply({
                embeds: [
                    (0, embedBuilder_1.permErrorBuilder)('OP')
                ],
                ephemeral: true,
            });
            (0, sentry_1.default)(interaction.client, 'Adminer', icon_1.xMark + ' Permission manquante', interaction.user, `/adminer`);
            return;
        }
        var embed = new discord_js_1.EmbedBuilder()
            .setTitle("⚙️ Informations administrateurs")
            .setDescription("Informatiion administrateur sur le bot.")
            .addFields({
            name: "🔗 Code",
            value: "[Lien vers Github](https://github.com/RomainMILLAN/Doxer-JS)",
        }, {
            name: "🧾 Ticket",
            value: "Pour toute demande de support, merci de créer un ticket [ici](https://romainmillan.fr/ticket)",
        });
        if ('' != process.env.RM_CLIENT_ID && '' != process.env.RM_PROJECT_ID) {
            embed
                .addFields({
                name: "🆔 Identifiant",
                value: `${process.env.RM_CLIENT_ID}`,
            }, {
                name: "🤐 Mot de passe",
                value: `${process.env.RM_PROJECT_ID}`,
            });
        }
        interaction.reply({
            embeds: [
                embed,
            ],
        });
        (0, sentry_1.default)(interaction.client, 'Adminer', icon_1.whiteCheckMark + ' Visualisation des données administrateurs', interaction.user, `/admin`);
    },
};
