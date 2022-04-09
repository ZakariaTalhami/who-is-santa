import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";

export const validateRequest =  (req: Request, res: Response, next: NextFunction) => {
    var errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).send({
            message: "Invalid request body",
            errors: errors.array()
        });
    }

    next();
};