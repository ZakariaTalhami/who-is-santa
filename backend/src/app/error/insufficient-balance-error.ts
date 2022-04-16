import { HttpError } from "./http-error";

export class InsufficientBalaneError  extends HttpError {
  constructor(userId: string) {
    super(400, `User ${userId} has insufficient balance to perform operation`);
  }
}
