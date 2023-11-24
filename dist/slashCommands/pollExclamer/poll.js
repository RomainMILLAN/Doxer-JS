"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.command = void 0;
const discord_js_1 = require("discord.js");
const sentry_1 = __importDefault(require("../../manager/sentry"));
exports.command = {
    name: "poll",
    data: new discord_js_1.SlashCommandBuilder()
        .setName("poll")
        .setDescription("Crée un sondage")
        .setDMPermission(false)
        .addStringOption(option => option
        .setName('question')
        .setDescription('La question du sondage')
        .setRequired(true)),
    execute: async (interaction) => {
        const question = interaction.options.get('question').value;
        interaction.reply({
            embeds: [
                new discord_js_1.EmbedBuilder()
                    .setTitle(`Sondage :question:`)
                    .setDescription(`${question}`)
                    .setColor(discord_js_1.Colors.Blue)
            ],
            fetchReply: true,
        }).then((message) => {
            message.react("✅");
            message.react("❌");
        });
        (0, sentry_1.default)(interaction.client, 'PollExclamer/Poll', `Création d'un sondage (\`${question}\`)`, interaction.user, `/poll question:${question}`);
    }
};
