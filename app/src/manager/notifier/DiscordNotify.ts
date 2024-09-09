export class DiscordNotify {
  public readonly webhookUrl: string;

  public constructor(webhookUrl?: string) {
    if (webhookUrl) this.webhookUrl = webhookUrl;
    else if (typeof process.env.DISCORD_WEBHOOK_URL === "string")
      this.webhookUrl = process.env.DISCORD_WEBHOOK_URL;
  }

  public async send(body): Promise<Response> {
    if (
      this.webhookUrl === undefined ||
      this.webhookUrl === "" ||
      this.webhookUrl === null
    )
      return;

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
