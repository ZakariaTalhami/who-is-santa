import { Request, Response, NextFunction } from "express";
import { HttpError } from "../error/http-error";

export const HttpErrorHandlerMiddleware = async (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof HttpError) {
    res.status(err.getStatusCode());
    res.send(err.toJSON());
  } else {
    next();
  }
};
