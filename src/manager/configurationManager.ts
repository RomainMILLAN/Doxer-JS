import * as dotenv from "dotenv";
import { colors, sendDebug, sendError } from "./consoleManager";
import { kill } from "process";

export function initConfiguration() {
  dotenv.config();

  sendDebug("Starting in " + process.env.APP_ENV + " mode.");

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

  sendDebug(`Application ${colors.underscore}debuging${colors.reset} is ${process.env.APP_DEBUGING}.`);
  sendDebug(`Application ${colors.underscore}sentry${colors.reset} is ${process.env.APP_SENTRY}.`);
}

export function isDiscordSentryEnabled() {
  if (
    process.env.TC_DISCORD_SENTRY !== null &&
    process.env.TC_DISCORD_SENTRY !== "" &&
    process.env.TC_DISCORD_SENTRY !== undefined &&
    process.env.APP_SENTRY !== null &&
    process.env.APP_SENTRY !== "" &&
    process.env.APP_SENTRY !== undefined &&
    process.env.APP_SENTRY.toLowerCase() === "true"
  ) {
    return true;
  }

  return false;
}

export default initConfiguration;
