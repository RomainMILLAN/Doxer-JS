const date = new Date();

export const colors = {
  reset: "\x1b[0m",
  bright: "\x1b[1m",
  dim: "\x1b[2m",
  underscore: "\x1b[4m",
  blink: "\x1b[5m",
  reverse: "\x1b[7m",
  hidden: "\x1b[8m",

  fg: {
    black: "\x1b[30m",
    red: "\x1b[31m",
    green: "\x1b[32m",
    yellow: "\x1b[33m",
    blue: "\x1b[34m",
    magenta: "\x1b[35m",
    cyan: "\x1b[36m",
    white: "\x1b[37m",
    gray: "\x1b[90m",
    crimson: "\x1b[38m",
  },
  bg: {
    black: "\x1b[40m",
    red: "\x1b[41m",
    green: "\x1b[42m",
    yellow: "\x1b[43m",
    blue: "\x1b[44m",
    magenta: "\x1b[45m",
    cyan: "\x1b[46m",
    white: "\x1b[47m",
    gray: "\x1b[100m",
    crimson: "\x1b[48m",
  },
};

function prefixEnvironmentStage() {
  if (process.env.APP_ENV == "DEV") {
    return colors.bg.cyan + "[DEVELOPMENT]" + colors.reset;
  } else if (process.env.APP_ENV == "STAGING") {
    return colors.bg.red + "[STAGING]" + colors.reset;
  } else {
    return "";
  }
}

function prefixTimestampTemplated() {
  return (
    colors.bright +
    "[" +
    date.getDay() +
    "/" +
    (date.getMonth() + 1) +
    "/" +
    date.getFullYear() +
    " " +
    date.getHours() +
    ":" +
    date.getMinutes() +
    "]" +
    colors.reset +
    " "
  );
}

export function sendInfo(body: string) {
  console.log(
    prefixEnvironmentStage() +
      " " +
      prefixTimestampTemplated() +
      colors.bg.cyan +
      "INFO" +
      colors.reset +
      " " +
      body
  );
}

export function sendDebug(body: string) {
  if (
    null == process.env.APP_DEBUGING ||
    undefined == process.env.APP_DEBUGING ||
    "false" == process.env.APP_DEBUGING.toLocaleLowerCase()
  ) {
    return;
  }

  console.log(
    prefixEnvironmentStage() +
      " " +
      prefixTimestampTemplated() +
      "\x1b[45mDEBUG\x1b[0m " +
      body
  );
}

export function sendError(body: string) {
  console.log(
    prefixEnvironmentStage() +
      " " +
      prefixTimestampTemplated() +
      colors.bg.red +
      "ERROR" +
      colors.reset +
      " " +
      body
  );
}

export function sendConsole(body: string) {
  console.log(
    prefixEnvironmentStage() + " " + this.prefixTimestampTemplated() + body
  );
}

export function sendLog(body: string) {
  console.log(
    prefixEnvironmentStage() +
      " " +
      prefixTimestampTemplated() +
      colors.bg.yellow +
      "LOG" +
      colors.reset +
      " " +
      body
  );
}

export function sendDiscordSentryLog(body: string) {
  console.log(
    prefixEnvironmentStage() +
      " " +
      prefixTimestampTemplated() +
      colors.bg.yellow +
      "DISCORD SENTRY LOG" +
      colors.reset +
      " " +
      body
  );
}

export default sendInfo;
