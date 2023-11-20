"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const uptime_1 = __importDefault(require("../manager/uptime"));
const consoleManager_1 = require("../manager/consoleManager");
const event = {
    name: discord_js_1.Events.ClientReady,
    once: true,
    execute(client) {
        (0, uptime_1.default)();
        (0, consoleManager_1.sendDebug)(`Client ready '\x1b[1m${client.user.tag}\x1b[0m'`);
    }
};
exports.default = event;
