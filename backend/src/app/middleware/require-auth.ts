import { Request, Response, NextFunction } from "express";
import { HttpUnauthorizedError } from "../error/http-unauthorized-error";
import { IUserTokenPayload } from "../interface/user";
import { decodeToken } from "../utils/jwt-token-utils";

declare global {
  namespace Express {
    interface Request {
      currentUser?: IUserTokenPayload;
    }
  }
}
export const requireAuth = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.token) {
    throw new HttpUnauthorizedError("Unauthorised");
  }

  try {
    req.currentUser = decodeToken<IUserTokenPayload>(req.token);
  } catch (error) {
    throw new HttpUnauthorizedError("Unauthorised");
  }

  next();
};
