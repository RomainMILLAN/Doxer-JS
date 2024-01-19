import { LineNotify } from "./notifier/LineNotify";
import { DiscordNotify } from "./notifier/DiscordNotify";

export async function sendUptime() {
  if (process.env.APP_ENV !== "PROD") return;

  sendLineUptime();
  sendDiscordUptime();
}

function sendLineUptime() {
  const lineNotify = new LineNotify();
  const body = "message=✅ DoxerJS connecté";

  lineNotify.send(body);
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
}

export default sendUptime;
