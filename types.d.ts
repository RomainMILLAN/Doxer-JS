import { Collection, CommandInteraction, SlashCommandBuilder, SlashCommand } from "discord.js"

declare global {
    namespace NodeJS {
        interface ProcessEnv {
            BOT_TOKEN: string,
            APP_ID: string,
            GUILD_ID: string,
            R_OP: string,
            R_STAFF: string,
            TC_SENTRY: string,
            VC_CATEGORY: string,
            OPEN_WEATHER_API: string,
            WEATHER_DEFAULT_CITY: string,
            APP_ENV: string,
            APP_DEBUGING: string,
            DISCORD_WEBHOOK_URL: string,
            RM_CLIENT_ID: string,
            RM_PROJECT_ID: string,
        }
    }
}

declare module "discord.js" {
    export interface Client {
        slashCommands: Collection<string, SlashCommand>
    }
}

export interface BotEvent {
    name: string,
    once ?: boolean | false,
    execute: (...args) => void
}

export interface SlashCommand {
    name: string,
    data: SlashCommandBuilder | any,
    async execute: (interaction: CommandInteraction) => Promise<void>
}