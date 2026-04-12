import {
  ChatInputCommandInteraction,
  Collection,
  CommandInteraction,
  SlashCommandBuilder,
  SlashCommandOptionsOnlyBuilder,
  SlashCommandSubcommandsOnlyBuilder,
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

      OPEN_WEATHER_API: string;
      WEATHER_DEFAULT_CITY: string;
      DISCORD_SENTRY_BLACKLIST: string;
      C_TICKET: string;
      W_SSID: string;
      W_PASSWORD: string;

      APP_ENV: string;
      APP_DEBUGING: string;
      APP_SENTRY: string;
      
      DISCORD_WEBHOOK_URL: string;
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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  execute: (...args: any[]) => void | Promise<void>;
}

export interface SlashCommand {
  name: string;
  data: SlashCommandBuilder | SlashCommandOptionsOnlyBuilder | SlashCommandSubcommandsOnlyBuilder;
  execute: (interaction: ChatInputCommandInteraction) => Promise<void>;
}
