import { HttpError } from "./http-error";

export class HttpNotFoundError extends HttpError {
  constructor(message: string) {
    super(404, message);
  }
}
