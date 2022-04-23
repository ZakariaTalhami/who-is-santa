import { HttpError } from "./http-error";

export class UserCantAwardOwnGiftError extends HttpError {
  constructor() {
    super(400, `Users can not award their own gifts`);
  }
}
