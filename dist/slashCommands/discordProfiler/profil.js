"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.command = void 0;
const discord_js_1 = require("discord.js");
const embedBuilder_1 = require("../../manager/embedBuilder");
const sentry_1 = require("../../manager/sentry");
const icon_1 = require("../../manager/enum/icon");
exports.command = {
    name: "profil",
    data: new discord_js_1.SlashCommandBuilder()
        .setName("profil")
        .setDescription("Affiche le profile d'un utilisateur")
        .setDMPermission(true)
        .addUserOption(option => option
        .setName("user")
        .setDescription("Utilisateur")
        .setRequired(true)),
    execute: async (interaction) => {
        var _a;
        const user = interaction.options.getUser('user');
        if (!user) {
            interaction.reply({
                embeds: [
                    (0, embedBuilder_1.coloredEmbed)('🚫 Utilisateur non trouvée', 'Vous devez indiquer un utilisateur valide ', discord_js_1.Colors.Red.toString())
                ],
                ephemeral: true,
            });
            (0, sentry_1.sentry)(interaction.client, 'DiscordProfiler/Profil', icon_1.xMark + ` Utilisateur indiqué non trouvée`, interaction.user, `/Profil user:`);
            return;
        }
        interaction.reply({
            embeds: [
                new discord_js_1.EmbedBuilder()
                    .setTitle(`:jigsaw: Profile de ${user.displayName}`)
                    .setDescription(`Description de ${user.displayName}`)
                    .addFields({
                    name: '__Identifiant:__',
                    value: `\`${user.id}\``,
                }, {
                    name: '__Nom:__',
                    value: `\`${user.globalName.toString()}\``,
                }, {
                    name: '__URL de l\'avatar:__',
                    value: `${user.avatarURL()}`,
                }, {
                    name: '__Couleur Hexadecimal:__',
                    value: `${(_a = user.hexAccentColor) !== null && _a !== void 0 ? _a : '*Aucune couleur d\'accentuation*'}`,
                })
                    .setColor(discord_js_1.Colors.Navy)
            ],
            ephemeral: true,
        });
        (0, sentry_1.sentry)(interaction.client, 'DiscordProfiler/Avatar', icon_1.whiteCheckMark + ` Visualisation de l'avatar de ${user.displayName}`, interaction.user, `/avatar user:${user.globalName}`);
    }
};
