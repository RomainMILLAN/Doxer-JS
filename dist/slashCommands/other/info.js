"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.command = void 0;
const discord_js_1 = require("discord.js");
const sentry_1 = require("../../manager/sentry");
const icon_1 = require("../../manager/enum/icon");
exports.command = {
    name: "info",
    data: new discord_js_1.SlashCommandBuilder()
        .setName("info")
        .setDescription("Affiche les informations du bot")
        .setDMPermission(true),
    execute: async (interaction) => {
        interaction.reply({
            embeds: [
                new discord_js_1.EmbedBuilder()
                    .setTitle(`🤖 Doxer JS`)
                    .setDescription(`Bot développer par [Romain MILLAN](https://romainmillan.fr).\nCe bot permet l'utilisation de commande pour simplifier la configuration et la modération sur des serveurs discords`)
                    .addFields({
                    name: "🔗 Code",
                    value: "[Lien vers Github](https://github.com/RomainMILLAN/Doxer-JS)",
                }),
            ],
            ephemeral: true,
        });
        (0, sentry_1.sentry)(interaction.client, "Informations", icon_1.whiteCheckMark + " Affichage des informations du bot", interaction.user, '/info');
        return;
    },
};
