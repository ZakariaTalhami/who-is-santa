import { HttpError } from "./http-error";

export class UserAlreadyGiftTodayError extends HttpError {
  constructor(userId: string) {
    super(400, `User ${userId} has already gifted today`);
  }
}
