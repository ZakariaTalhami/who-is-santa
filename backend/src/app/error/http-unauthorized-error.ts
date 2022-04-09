import { HttpError } from "./http-error";

export class HttpUnauthorizedError extends HttpError {
  constructor(message: string) {
    super(401, message);
  }
}
