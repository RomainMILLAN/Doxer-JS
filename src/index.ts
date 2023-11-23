import { ActivityType, Client, Collection, GatewayIntentBits } from "discord.js";
import * as dotenv from "dotenv";
import { readdirSync } from "fs";
import { join } from "path";
import { SlashCommand } from "../types";

dotenv.config();

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers,
    ],
    presence: {
        status: 'online',
        activities: [{
            name: '/info',
            type: ActivityType.Watching
        }]
    }
});

client.slashCommands = new Collection<string, SlashCommand>();

const handlersDirs = join(__dirname, "./handlers")

readdirSync(handlersDirs).forEach(file => {
    require(`${handlersDirs}/${file}`)(client);
})

client.login(process.env.BOT_TOKEN);