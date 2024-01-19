import { Client } from "discord.js";
import { readdirSync } from "fs";
import { join } from "path";
import { BotEvent } from "../../types";
import { sendDebug } from "../manager/consoleManager";

module.exports = (client: Client) => {
  let eventsDir = join(__dirname, "../events");
  readdirSync(eventsDir).forEach((file) => {
    if (!file.endsWith(".js")) {
      return;
    }

    const event: BotEvent = require(`${eventsDir}/${file}`).default;

    if (event.once == true) {
      client.once(event.name, (...args) => event.execute(...args));
    } else {
      client.on(event.name, (...args) => event.execute(...args));
    }

    sendDebug(`Event \x1b[4m${event.name}\x1b[0m charged`);
  });
};
