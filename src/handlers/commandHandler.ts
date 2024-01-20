import { Client, REST, Routes } from "discord.js";
import { colors, sendDebug } from "../manager/consoleManager";
import { SlashCommand } from "../../types";
const path = require("node:path");
const fs = require("node:fs");

module.exports = async (client: Client) => {
  const commands = [];
  const foldersPath = path.join(__dirname, "../slashCommands");
  const commandFolders = fs.readdirSync(foldersPath);

  for (const folder of commandFolders) {
    const commandsPath = path.join(foldersPath, folder);
    const commandFiles = fs
      .readdirSync(commandsPath)
      .filter((file) => file.endsWith(".js"));

    for (const file of commandFiles) {
      const filePath = path.join(commandsPath, file);
      const command: SlashCommand = require(`${filePath}`).command;

      commands.push(command.data.toJSON());
      client.slashCommands.set(command.name, command);
      sendDebug(
        `Command ${colors.underscore}${command.name}${colors.reset} charged`
      );
    }
  }

  const rest = new REST().setToken(process.env.BOT_TOKEN);
  try {
    await rest.put(
      Routes.applicationGuildCommands(process.env.APP_ID, process.env.GUILD_ID),
      { body: commands }
    );
  } catch (error) {
    console.error(error);
  }
};
