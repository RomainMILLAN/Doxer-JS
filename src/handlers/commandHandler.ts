import { Client, REST, Routes } from "discord.js";
import { readdirSync } from "fs";
import { join } from "path";
import { SlashCommand } from "../../types";
import sendInfo from "../manager/consoleManager";

module.exports = async (client: Client) => {

    const body = [];
    let slashCommandsDir = join(__dirname, "../slashCommands");

    readdirSync(slashCommandsDir).forEach(file => {
        if(!file.endsWith(".js")) {
            return;
        }

        const command: SlashCommand = require(`${slashCommandsDir}/${file}`).command;

        body.push(command.data.toJSON());
        client.slashCommands.set(command.name, command);

        sendInfo(`Command \x1b[4m${command.name}\x1b[0m charged`);
    });

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