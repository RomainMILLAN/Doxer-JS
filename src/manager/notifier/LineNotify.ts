export class LineNotify {
  public readonly token: string;

  public constructor(token?: string) {
    if (token) this.token = token;
    else if (typeof process.env.LINE_NOTIFY_TOKEN === "string")
      this.token = process.env.LINE_NOTIFY_TOKEN;
  }

  public async send(body): Promise<Response> {
    if (this.token === undefined || this.token === null || this.token === "")
      return;

    const response = await fetch("https://notify-api.line.me/api/notify", {
      method: "POST",
      body: body,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Bearer ${this.token}`,
      },
    });

    return response;
  }
}
