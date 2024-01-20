import { LineNotify } from "./notifier/LineNotify";
import { DiscordNotify } from "./notifier/DiscordNotify";
import { colors, sendDebug } from "./consoleManager";

export async function sendUptime() {
  if (process.env.APP_ENV !== "PROD") return;

  sendLineUptime();
  sendDiscordUptime();
}

function sendLineUptime() {
  const lineNotify = new LineNotify();
  const body = "message=✅ DoxerJS connecté";

  lineNotify.send(body);
  sendDebug(
    "Uptime: " + colors.underscore + "Line" + colors.reset + " notify send"
  );
}

async function sendDiscordUptime() {
  const discordNotify = new DiscordNotify();
  const body = {
    embeds: [
      {
        title: "📊 Service connexion",
        color: "65280",
        fields: [
          {
            name: "Service name",
            value: "Doxer JS",
          },
          {
            name: "State",
            value: "Bot connecté ✅",
          },
        ],
      },
    ],
  };

  discordNotify.send(body);
  sendDebug(
    "Uptime: " + colors.underscore + "Discord" + colors.reset + " notify send"
  );
}

export default sendUptime;
