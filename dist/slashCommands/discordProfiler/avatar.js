"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.command = void 0;
const discord_js_1 = require("discord.js");
const embedBuilder_1 = require("../../manager/embedBuilder");
const sentry_1 = __importDefault(require("../../manager/sentry"));
exports.command = {
    name: "avatar",
    data: new discord_js_1.SlashCommandBuilder()
        .setName("avatar")
        .setDescription("Affiche l'avatar d'un utilisateur")
        .setDMPermission(true)
        .addUserOption(option => option
        .setName("user")
        .setDescription("Utilisateur")
        .setRequired(true)),
    execute: async (interaction) => {
        const user = interaction.options.getUser('user');
        if (!user) {
            interaction.reply({
                embeds: [
                    (0, embedBuilder_1.coloredEmbed)('🚫 Utilisateur non trouvée', 'Vous devez indiquer un utilisateur valide ', discord_js_1.Colors.Red.toString())
                ],
                ephemeral: true,
            });
            (0, sentry_1.default)(interaction.client, 'DiscordProfiler/Avatar', 'Utilisateur indiqué non trouvée', interaction.user, `/avatar user:`);
            return;
        }
        interaction.reply({
            embeds: [
                new discord_js_1.EmbedBuilder()
                    .setTitle(`🪟 Avatar de ${user.displayName}`)
                    .setDescription(`Cliquez [ici](${user.avatarURL().toString()}) pour l\'afficher en grand`)
                    .setImage(user.avatarURL().toString())
                    .setColor(discord_js_1.Colors.Navy)
            ]
        });
        (0, sentry_1.default)(interaction.client, 'DiscordProfiler/Avatar', `Visualisation de l'avatar de ${user.displayName}`, interaction.user, `/avatar user:${user.globalName}`);
    }
};
