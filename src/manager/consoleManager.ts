import { time } from "console";
const date = new Date();

function prefixMessage() {
  if (process.env.APP_ENV == "DEV") {
    return "\x1b[46m[DEVELOPMENT]\x1b[0m";
  } else if (process.env.APP_ENV == "STAGING") {
    return "\x1b[41m[STAGING]\x1b[0m";
  } else {
    return "";
  }
}

export function sendInfo(body: string) {
  console.log(
    prefixMessage() +
      " " +
      "\x1b[1m[" +
      date.getDay() +
      "/" +
      (date.getMonth() + 1) +
      "/" +
      date.getFullYear() +
      "]\x1b[0m " +
      "\x1b[46mINFO\x1b[0m " +
      body
  );
}

export function sendDebug(body: string) {
  if (null == process.env.APP_DEBUGING || "false" == process.env.APP_DEBUGING) {
    return;
  }

  console.log(
    prefixMessage() +
      " " +
      "\x1b[1m[" +
      date.getDay() +
      "/" +
      (date.getMonth() + 1) +
      "/" +
      date.getFullYear() +
      "]\x1b[0m " +
      "\x1b[45mDEBUG\x1b[0m " +
      body
  );
}

export function sendError(body: string) {
  console.log(
    prefixMessage() +
      " " +
      "\x1b[1m[" +
      date.getDay() +
      "/" +
      (date.getMonth() + 1) +
      "/" +
      date.getFullYear() +
      "]\x1b[0m " +
      "\x1b[41mERROR\x1b[0m " +
      body
  );
}

export function sendConsole(body: string) {
  console.log(
    prefixMessage() +
      " " +
      "\x1b[1m[" +
      date.getDate() +
      "/" +
      (date.getMonth() + 1) +
      "/" +
      date.getFullYear() +
      "]\x1b[0m " +
      body
  );
}

export function sendLog(body: string) {
  console.log(
    prefixMessage() +
      " " +
      "\x1b[1m[" +
      date.getDay() +
      "/" +
      (date.getMonth() + 1) +
      "/" +
      date.getFullYear() +
      "]\x1b[0m " +
      "\x1b[43mLOG\x1b[0m " +
      body
  );
}

export function sendDiscordSentryLog(body: string) {
  console.log(
    prefixMessage() +
      " " +
      "\x1b[1m[" +
      date.getDay() +
      "/" +
      (date.getMonth() + 1) +
      "/" +
      date.getFullYear() +
      "]\x1b[0m " +
      "\x1b[43mDISCORD SENTRY LOG\x1b[0m " +
      body
  );
}

export default sendInfo;
