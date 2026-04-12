export class DiscordNotify {
  public readonly webhookUrl: string | undefined;

  public constructor(webhookUrl?: string) {
    if (webhookUrl) this.webhookUrl = webhookUrl;
    else if (typeof process.env.DISCORD_WEBHOOK_URL === "string")
      this.webhookUrl = process.env.DISCORD_WEBHOOK_URL;
  }

  public async send(body: Record<string, unknown>): Promise<Response | undefined> {
    if (!this.webhookUrl) return undefined;

    const response = await fetch(this.webhookUrl, {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    return response;
  }
}
