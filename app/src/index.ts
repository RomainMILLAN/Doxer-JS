import {
  ActivityType,
  Client,
  Collection,
  GatewayIntentBits,
  Partials,
} from "discord.js";
import { readdirSync } from "fs";
import { join } from "path";
import { SlashCommand } from "../types";
import { discordSentryBlacklistInitialize } from "./manager/discordSentryManager";
import initConfiguration from "./manager/configurationManager";
import { APP_VERSION } from "./version";

initConfiguration();

discordSentryBlacklistInitialize();

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMessageTyping,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.GuildMembers,
  ],
  partials: [
    Partials.Message,
    Partials.Channel,
    Partials.Reaction,
  ],
  presence: {
    status: "online",
    activities: [
      {
        name: `v${APP_VERSION} - /info`,
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
