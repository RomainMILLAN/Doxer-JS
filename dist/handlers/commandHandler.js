"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const fs_1 = require("fs");
const path_1 = require("path");
const consoleManager_1 = require("../manager/consoleManager");
module.exports = async (client) => {
    const body = [];
    loadCommands((0, path_1.join)(__dirname, "../slashCommands"), client);
    loadCommands((0, path_1.join)(__dirname, "../slashCommands/discordProfiler"), client);
    const rest = new discord_js_1.REST({
        version: '10'
    })
        .setToken(process.env.BOT_TOKEN);
    try {
        await rest.put(discord_js_1.Routes.applicationCommands(process.env.APP_ID), { body: body });
    }
    catch (error) {
        console.error(error);
    }
};
function loadCommands(slashCommandsDir, client) {
    (0, fs_1.readdirSync)(slashCommandsDir).forEach(file => {
        if (!file.endsWith(".js")) {
            return;
        }
        var command = require(`${slashCommandsDir}/${file}`).command;
        client.slashCommands.set(command.name, command);
        (0, consoleManager_1.sendDebug)(`Command \x1b[4m${command.name}\x1b[0m charged`);
    });
}
