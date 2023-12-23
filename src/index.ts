import {
  ActivityType,
  Client,
  Collection,
  GatewayIntentBits,
} from "discord.js";
import * as dotenv from "dotenv";
import { readdirSync } from "fs";
import { join } from "path";
import { SlashCommand } from "../types";
import { kill } from "process";
import { sendError } from "./manager/consoleManager";

dotenv.config();

if (process.env.NODE_ENV != undefined) {
  const result = require("dotenv").config({
    path: ".env." + process.env.NODE_ENV,
  });

  process.env = {
    ...process.env,
    ...result.parsed,
  };
}

console.log(process.env.APP_ENV);

if (
  process.env.APP_ENV != "PROD" &&
  process.env.APP_ENV != "STAGING" &&
  process.env.APP_ENV != "DEV"
) {
  sendError(
    "Invalid APP_ENV value. Please set APP_ENV to PROD, STAGING or DEV."
  );
  kill(process.pid, "SIGTERM");
}

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
  ],
  presence: {
    status: "online",
    activities: [
      {
        name: "/info",
        type: ActivityType.Watching,
      },
    ],
  },
});

client.slashCommands = new Collection<string, SlashCommand>();

const handlersDirs = join(__dirname, "./handlers");

readdirSync(handlersDirs).forEach((file) => {
  require(`${handlersDirs}/${file}`)(client);
});

client.login(process.env.BOT_TOKEN);
