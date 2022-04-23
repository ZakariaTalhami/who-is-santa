import { Request, Response, NextFunction } from "express";
import { HttpErrors } from "../error";
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
  if (!req.currentUser) throw new HttpErrors.HttpUnauthorizedError("Unauthorised");

  const user = await UserService.findUserById(req.currentUser._id);

  if (!user) throw new HttpErrors.HttpUnauthorizedError("Unauthorised");

  req.user = user;

  next();
};
