"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.command = void 0;
const discord_js_1 = require("discord.js");
const consoleManager_1 = require("../manager/consoleManager");
exports.command = {
    name: "edt",
    data: new discord_js_1.SlashCommandBuilder()
        .setName("edt")
        .setDescription("Affiche l'emploi du temp d'un groupe")
        .addStringOption((option) => {
        return option
            .setName("groupe")
            .setDescription("Classe de l'emploi du temp")
            .setRequired(true)
            .addChoices({
            name: "INFO S6",
            value: "1"
        }, {
            name: "INFO Q5",
            value: "2"
        }, {
            name: "INFO G5",
            value: "3"
        });
    })
        .addStringOption((option) => {
        return option
            .setName("date")
            .setDescription("Date de l'emploi du temp")
            .setRequired(false);
    }),
    execute: async (interaction) => {
        const groupe = interaction.options.get("groupe").value.toString();
        const dashboardUrl = process.env.DASHBOARD_URL;
        var date = "";
        if (interaction.options.get("date") === null) {
            const nowDate = new Date();
            date = nowDate.getDate() + '/' + (nowDate.getMonth() + 1) + '/' + nowDate.getFullYear();
        }
        else {
            date = interaction.options.get("date").value.toString();
        }
        let embedDescription = `Liste des cours: \n`;
        let url = dashboardUrl + '/api/edt/class/day/' + groupe + "/" + date;
        (0, consoleManager_1.sendDebug)(url);
        fetch(url).then(response => {
            if (response.status == 503) {
                interaction.reply({
                    embeds: [
                        new discord_js_1.EmbedBuilder()
                            .setTitle(`📚 EDT UM`)
                            .setDescription(`Service en maintenance (*Status code: ${response.status}*)`)
                            .setColor("Red")
                    ],
                    ephemeral: true
                });
                return;
            }
            if (response.status != 200 && response.status != 503) {
                interaction.reply({
                    embeds: [
                        new discord_js_1.EmbedBuilder()
                            .setTitle(`📚 EDT UM`)
                            .setDescription(`Erreur de serveur interne (*Status code: ${response.status}*)\n Merci de le referre au créateur.`)
                            .setColor("Red")
                    ],
                    ephemeral: true
                });
                return;
            }
            response.json().then(json => {
                if (json.length == 0) {
                    embedDescription += `*Aucun cours aujourd'hui*`;
                }
                let index = 0;
                while (index < json.length) {
                    const startDate = new Date(json[index]['dtstart']);
                    const startHours = startDate.getHours() + (Math.abs(startDate.getTimezoneOffset()) / 60);
                    const startMinutes = (startDate.getMinutes() < 10 ? '0' : '') + startDate.getMinutes();
                    const endDate = new Date(json[index]['dtend']);
                    const endHours = endDate.getHours() + (Math.abs(endDate.getTimezoneOffset()) / 60);
                    const endMinutes = (endDate.getMinutes() < 10 ? '0' : '') + endDate.getMinutes();
                    //■ [1488] WEBER MARIE LAURE Intro GSI - 08:30/10:30
                    embedDescription += `■ **${json[index]['name']}** - \`${startHours}:${startMinutes}\`/\`${endHours}:${endMinutes}\` \n`;
                    index++;
                }
                (0, consoleManager_1.sendDebug)(embedDescription);
                interaction.reply({
                    embeds: [
                        new discord_js_1.EmbedBuilder()
                            .setTitle(`📚 Cours du (${date})`)
                            .setAuthor({
                            name: "EDT UM"
                        })
                            .setDescription(embedDescription)
                            .setColor("Purple")
                    ],
                    ephemeral: true
                });
                return;
            });
        });
    }
};
