"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const dotenv = __importStar(require("dotenv"));
const fs_1 = require("fs");
const path_1 = require("path");
const process_1 = require("process");
const consoleManager_1 = require("./manager/consoleManager");
dotenv.config();
if (process.env.NODE_ENV != undefined) {
    const result = require("dotenv").config({
        path: ".env." + process.env.NODE_ENV,
    });
    process.env = Object.assign(Object.assign({}, process.env), result.parsed);
}
console.log(process.env.APP_ENV);
if (process.env.APP_ENV != "PROD" &&
    process.env.APP_ENV != "STAGING" &&
    process.env.APP_ENV != "DEV") {
    (0, consoleManager_1.sendError)("Invalid APP_ENV value. Please set APP_ENV to PROD, STAGING or DEV.");
    (0, process_1.kill)(process.pid, "SIGTERM");
}
const client = new discord_js_1.Client({
    intents: [
        discord_js_1.GatewayIntentBits.Guilds,
        discord_js_1.GatewayIntentBits.GuildMessages,
        discord_js_1.GatewayIntentBits.MessageContent,
        discord_js_1.GatewayIntentBits.GuildMembers,
    ],
    presence: {
        status: "online",
        activities: [
            {
                name: "/info",
                type: discord_js_1.ActivityType.Watching,
            },
        ],
    },
});
client.slashCommands = new discord_js_1.Collection();
const handlersDirs = (0, path_1.join)(__dirname, "./handlers");
(0, fs_1.readdirSync)(handlersDirs).forEach((file) => {
    require(`${handlersDirs}/${file}`)(client);
});
client.login(process.env.BOT_TOKEN);
