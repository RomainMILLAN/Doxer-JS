"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.command = void 0;
const discord_js_1 = require("discord.js");
const sentry_1 = __importDefault(require("../../manager/sentry"));
const embedBuilder_1 = require("../../manager/embedBuilder");
const icon_1 = require("../../manager/enum/icon");
exports.command = {
    name: "room",
    data: new discord_js_1.SlashCommandBuilder()
        .setName("room")
        .setDescription("Crée une salle audio")
        .setDMPermission(false),
    execute: async (interaction) => {
        interaction.guild.channels.create({
            name: `🔉 • Sallon de ${interaction.user.displayName.toString()}`,
            type: discord_js_1.ChannelType.GuildVoice,
            parent: process.env.VC_CATEGORY,
            permissionOverwrites: [
                {
                    id: interaction.user.id,
                    allow: [
                        discord_js_1.PermissionsBitField.Flags.Administrator,
                        discord_js_1.PermissionsBitField.Flags.ViewChannel,
                        discord_js_1.PermissionsBitField.Flags.ManageChannels,
                        discord_js_1.PermissionsBitField.Flags.Connect,
                    ],
                }
            ]
        })
            .then((channel) => {
            interaction.reply({
                embeds: [
                    (0, embedBuilder_1.coloredEmbed)(`Création d'une salle audio`, `Votre salle audio a été créée (\`${channel.name.toString()}\`)`, 'Gold'),
                ],
                ephemeral: true,
            });
            (0, sentry_1.default)(interaction.client, "VoiceClick/Room", icon_1.whiteCheckMark + `Création d'une nouvelle salle audio (\`${channel.name.toString()}\`)`, interaction.user, `/room`);
        })
            .catch((error) => {
            interaction.reply({
                embeds: [
                    (0, embedBuilder_1.errorBuilder)(`Création d'une salle audio`, error.toString()),
                ],
                ephemeral: true,
            });
            (0, sentry_1.default)(interaction.client, "VoiceClick/Room", icon_1.xMark + `Erreur lors de la création d'une nouvelle salle audio`, interaction.user, `/room`);
        });
    },
};
