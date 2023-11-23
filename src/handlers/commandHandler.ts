import { Client, REST, Routes } from "discord.js";
import { readdirSync } from "fs";
import { join } from "path";
import { SlashCommand } from "../../types";
import { sendInfo, sendDebug } from "../manager/consoleManager";

module.exports = async (client: Client) => {

    const body = [];

    loadCommands(
        join(__dirname, "../slashCommands"),
        client
    );

    loadCommands(
        join(__dirname, "../slashCommands/discordProfiler"),
        client
    );

    const rest = new REST({
        version: '10'
    })
        .setToken(process.env.BOT_TOKEN);
    
    try {
        await rest.put(Routes.applicationCommands(process.env.APP_ID), { body: body });
    }catch(error) {
        console.error(error);
    }

} 

function loadCommands(slashCommandsDir: string, client: Client) {
    readdirSync(slashCommandsDir).forEach(file => {
        if(!file.endsWith(".js")) {
            return;
        }

        var command: SlashCommand = require(`${slashCommandsDir}/${file}`).command;

        client.slashCommands.set(command.name, command);

        sendDebug(`Command \x1b[4m${command.name}\x1b[0m charged`);
    });
}