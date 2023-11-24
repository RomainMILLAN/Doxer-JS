"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const consoleManager_1 = require("../manager/consoleManager");
const path = require('node:path');
const fs = require('node:fs');
module.exports = async (client) => {
    const commands = [];
    const foldersPath = path.join(__dirname, '../slashCommands');
    const commandFolders = fs.readdirSync(foldersPath);
    for (const folder of commandFolders) {
        const commandsPath = path.join(foldersPath, folder);
        const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
        for (const file of commandFiles) {
            const filePath = path.join(commandsPath, file);
            const command = require(`${filePath}`).command;
            commands.push(command.data.toJSON());
            client.slashCommands.set(command.name, command);
            (0, consoleManager_1.sendDebug)(`Command \x1b[4m${command.name}\x1b[0m charged`);
        }
    }
    const rest = new discord_js_1.REST().setToken(process.env.BOT_TOKEN);
    try {
        await rest.put(discord_js_1.Routes.applicationGuildCommands(process.env.APP_ID, process.env.GUILD_ID), { body: commands });
    }
    catch (error) {
        console.error(error);
    }
};
