import {
  Collection,
  CommandInteraction,
  SlashCommandBuilder,
  SlashCommand,
} from "discord.js";

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      BOT_TOKEN: string;
      APP_ID: string;
      GUILD_ID: string;
      R_OP: string;
      R_STAFF: string;
      TC_SENTRY: string;
      TC_DISCORD_SENTRY: string;
      VC_CATEGORY: string;
      OPEN_WEATHER_API: string;
      WEATHER_DEFAULT_CITY: string;
      DISCORD_SENTRY_BLACKLIST: string;
      APP_ENV: string;
      APP_DEBUGING: string;
      APP_SENTRY: string;
      DISCORD_WEBHOOK_URL: string;
    }
  }
}

declare module "discord.js" {
  export interface Client {
    slashCommands: Collection<string, SlashCommand>;
  }
}

export interface BotEvent {
  name: string;
  once?: boolean | false;
  execute: (...args) => void;
}

export interface SlashCommand {
  name: string;
  data: SlashCommandBuilder | any;
  execute: (interaction: CommandInteraction) => Promise<void>;
}
