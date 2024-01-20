import { Client, Events } from "discord.js";
import { BotEvent } from "../../types";
import sendUptime from "../manager/uptime";
import { colors, sendInfo } from "../manager/consoleManager";

const event: BotEvent = {
  name: Events.ClientReady,
  once: true,
  execute(client: Client) {
    sendUptime();
    sendInfo(
      `Client ready '${colors.bright}${client.user.tag}${colors.reset}' in mode ${colors.bright}${process.env.APP_ENV}${colors.reset}`
    );
  },
};

export default event;
