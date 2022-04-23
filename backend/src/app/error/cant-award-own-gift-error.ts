import { HttpError } from "./http-error";

export class UserAwardOwnGiftError extends HttpError {
  constructor() {
    super(400, `Users can not award their own gifts`);
  }
}
