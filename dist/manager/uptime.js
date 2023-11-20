"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendUptime = void 0;
async function sendUptime() {
    if (process.env.APP_ENV !== 'PROD')
        return;
    const discordWebhookUrl = process.env.DISCORD_WEBHOOK_URL;
    if (discordWebhookUrl === "")
        return;
    const body = {
        embeds: [
            {
                title: "📊 Service connexion",
                color: "65280",
                fields: [
                    {
                        name: "Service name",
                        value: "EDT UM"
                    },
                    {
                        name: "State",
                        value: "Bot connecté ✅"
                    }
                ]
            }
        ]
    };
    await fetch(discordWebhookUrl, {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
        },
    });
}
exports.sendUptime = sendUptime;
exports.default = sendUptime;
