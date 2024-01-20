import * as dotenv from "dotenv";
import { sendDebug, sendError } from "./consoleManager";
import { kill } from "process";

export function initConfiguration() {
  dotenv.config();

  if (process.env.NODE_ENV != undefined) {
    const result = require("dotenv").config({
      path: ".env." + process.env.NODE_ENV,
    });

    process.env = {
      ...process.env,
      ...result.parsed,
    };
  }

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
}

export default initConfiguration;
