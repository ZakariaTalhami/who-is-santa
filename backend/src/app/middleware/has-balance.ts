import { Request, Response, NextFunction } from "express";
import { HttpUnauthorizedError } from "../error/http-unauthorized-error";
import { InsufficientBalaneError } from "../error/insufficient-balance-error";

export const hasBalance = (awardTypeBodyKey: string = "type") => {
  return async (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) return next(new HttpUnauthorizedError("Unauthorised"));

    const awardType = req.body[awardTypeBodyKey];
 
    if (!req.user.hasBalance(awardType))
      return next(new InsufficientBalaneError(req.user.id));

    next();
  };
};
