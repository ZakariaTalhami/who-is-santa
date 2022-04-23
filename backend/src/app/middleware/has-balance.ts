import { Request, Response, NextFunction } from "express";
import { HttpErrors } from "../error";

export const hasBalance = (awardTypeBodyKey: string = "type") => {
  return async (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) return next(new HttpErrors.HttpUnauthorizedError("Unauthorised"));

    const awardType = req.body[awardTypeBodyKey];
 
    if (!req.user.hasBalance(awardType))
      return next(new HttpErrors.InsufficientBalaneError(req.user.id));

    next();
  };
};
