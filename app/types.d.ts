import {
  Collection,
  CommandInteraction,
  SlashCommandBuilder,
  SlashCommand,
} from "discord.js";

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      APP_ID: string;
      BOT_TOKEN: string;
      GUILD_ID: string;
      R_OP: string;
      R_STAFF: string;
      R_MEMBER: string;
      TC_SENTRY: string;
      TC_DISCORD_SENTRY: string;
      VC_CATEGORY: string;
      OPEN_WEATHER_API: string;
      WEATHER_DEFAULT_CITY: string;
      DISCORD_SENTRY_BLACKLIST: string;
      C_TICKET: string;
      W_SSID: string;
      W_PASSWORD: string;

      APP_ENV: string;
      APP_DEBUGING: string;
      APP_SENTRY: string;
      
      SERVICE_NAME: string;
      SIGNAL_API_HOST: string;
      SIGNAL_API_SENDER_NUMBER: string;
      SIGNAL_API_RECEIVER: string;
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
  type: string;
  once?: boolean | false;
  execute: (...args) => void;
}

export interface SlashCommand {
  name: string;
  data: SlashCommandBuilder | any;
  execute: (interaction: CommandInteraction) => Promise<void>;
}
