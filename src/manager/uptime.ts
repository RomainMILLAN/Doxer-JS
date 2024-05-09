import { colors, sendDebug } from "./consoleManager";
import { statisticMark, whiteCheckMark } from "./enum/icon";
import { DiscordNotify } from "./notifier/DiscordNotify";
import { LineNotify } from "./notifier/LineNotify";
import { SignalNotify } from "./notifier/SignalNotify";

export async function sendUptime() {
  if (process.env.APP_ENV === `DEV`) return;

  sendLineUptime();
  sendSignalUptime();
  sendDiscordUptime();
}

function sendLineUptime() {
  const lineNotify = new LineNotify();
  const body = `message=${whiteCheckMark} ${process.env.SERVICE_NAME}(DoxerJS) connecté`;

  lineNotify.send(body);
  sendDebug(`Uptime: ${colors.underscore}Line${colors.reset} notify send`);
}

function sendSignalUptime() {
  const signalNotify = new SignalNotify();
  const message = `✅ ${process.env.SERVICE_NAME}(DoxerJS) connecté`;

  signalNotify.send(message);
  sendDebug(`Uptime: ${colors.underscore}Signal${colors.reset} notify send`);
}

async function sendDiscordUptime() {
  const discordNotify = new DiscordNotify();
  const body = {
    embeds: [
      {
        title: `${statisticMark} Service connexion`,
        color: `65280`,
        fields: [
          {
            name: `Service name`,
            value: `${process.env.SERVICE_NAME}`,
          },
          {
            name: `Project name`,
            value: `Doxer JS`,
          },
          {
            name: `State`,
            value: `Bot connecté ${whiteCheckMark}`,
          },
        ],
      },
    ],
  };

  discordNotify.send(body);
  sendDebug(
    `Uptime: ` + colors.underscore + `Discord` + colors.reset + ` notify send`
  );
}

export default sendUptime;
