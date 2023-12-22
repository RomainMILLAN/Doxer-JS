"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const consoleManager_1 = require("../manager/consoleManager");
const sentry_1 = require("../manager/sentry");
const event = {
    name: discord_js_1.Events.MessageCreate,
    async execute(message) {
        if (message.author.bot) {
            return;
        }
        if (null == process.env.TC_DISCORD_SENTRY ||
            "" == process.env.TC_DISCORD_SENTRY) {
            return;
        }
        if (null == process.env.APP_SENTRY || "FALSE" == process.env.APP_SENTRY) {
            return;
        }
        (0, consoleManager_1.sendLog)(message.author.globalName + " | " + message.content);
        (0, sentry_1.discordSentry)(message.client, message.channel, message.content, message.member.user);
    },
};
exports.default = event;
