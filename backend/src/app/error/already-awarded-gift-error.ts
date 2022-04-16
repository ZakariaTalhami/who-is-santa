import { HttpError } from "./http-error";

export class UserAlreadyAwardedGiftError extends HttpError {
  constructor(userId: string) {
    super(400, `User ${userId} has already awarded the gift`);
  }
}
