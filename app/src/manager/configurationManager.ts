import * as dotenv from "dotenv";
import { mkdirSync } from "fs";
import { colors, sendDebug, sendError } from "./consoleManager";
import { kill } from "process";

export function initConfiguration() {
  dotenv.config();
  mkdirSync("./logs", { recursive: true });

  sendDebug("Starting in " + process.env.APP_ENV + " mode.");

  const requiredEnvVars = ["APP_ID", "BOT_TOKEN", "GUILD_ID", "APP_ENV"];
  const missing = requiredEnvVars.filter((key) => !process.env[key]);
  if (missing.length > 0) {
    sendError(`Missing required environment variables: ${missing.join(", ")}`);
    kill(process.pid, "SIGTERM");
  }

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

  sendDebug(
    `Application ${colors.underscore}debuging${colors.reset} is ${process.env.APP_DEBUGING}.`
  );
  sendDebug(
    `Application ${colors.underscore}sentry${colors.reset} is ${process.env.APP_SENTRY}.`
  );
}

export function isConfigureEnabled(environment: string) {
  if (isConfigure(environment) && environment.toLowerCase() === "true") {
    return true;
  }

  return false;
}

export function isConfigure(environment: string) {
  if (environment !== null && environment !== undefined && environment !== "") {
    return true;
  }

  return false;
}

export function isSentryEnabled(): boolean {
  if (
    isConfigure(process.env.APP_SENTRY) &&
    process.env.APP_SENTRY.toLocaleLowerCase() === "true"
  ) {
    return true;
  }

  return false;
}

export default initConfiguration;
