export class HttpError extends Error {
  private statusCode: number;
  protected statusMessage?: string;

  constructor(statusCode: number, message: string) {
    super(message);

    this.statusCode = statusCode;
  }

  getStatusCode() {
    return this.statusCode;
  }

  getStatusMessage() {
    return this.statusCode;
  }

  getMessage() {
    return this.message;
  }

  toJSON() {
    return {
      statusCode: this.getStatusCode(),
      statusMessage: this.getStatusMessage(),
      error: {
        message: this.message,
        trace: this.stack,
      },
    };
  }
}
