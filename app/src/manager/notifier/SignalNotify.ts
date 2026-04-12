export class SignalNotify {
  public host: string | undefined;
  public senderNumber: string | undefined;
  public receiver: string | undefined;

  public constructor(host?: string, sender?: string, receiver?: string) {
    this.setData(
      host,
      sender,
      receiver,
    );
  }

  public async send(message: string): Promise<Response | undefined> {
    if (!this.host || !this.senderNumber || !this.receiver) {
      return undefined;
    }

    const body = JSON.stringify({
      "message": message,
      "number": this.senderNumber,
      "recipients": [this.receiver]
    })

    const response = await fetch(this.host + "v2/send", {
      method: "POST",
      body: body,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    return response;
  }

  private setData(
    host?: string,
    sender?: string,
    receiver?: string,
  ) {
    if (host) {
      this.host = host;
    } else if (typeof process.env.SIGNAL_API_HOST === "string") {
      this.host = process.env.SIGNAL_API_HOST;
    }

    if (sender) {
      this.senderNumber = sender;
    } else if (typeof process.env.SIGNAL_API_SENDER_NUMBER === "string") {
      this.senderNumber = process.env.SIGNAL_API_SENDER_NUMBER;
    }

    if (receiver) {
      this.receiver = receiver;
    } else if (typeof process.env.SIGNAL_API_RECEIVER === "string") {
      this.receiver = process.env.SIGNAL_API_RECEIVER;
    }
  }
}
