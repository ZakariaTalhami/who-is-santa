import { Request, Response, NextFunction } from "express";
import { HttpUnauthorizedError } from "../error/http-unauthorized-error";
import { IUserDoc } from "../model/user";
import { UserService } from "../services";

declare global {
  namespace Express {
    interface Request {
      user?: IUserDoc;
    }
  }
}

export const loadUserInfo = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.currentUser) throw new HttpUnauthorizedError("Unauthorised");

  const user = await UserService.findUserById(req.currentUser._id);

  if (!user) throw new HttpUnauthorizedError("Unauthorised");

  req.user = user;

  next();
};
