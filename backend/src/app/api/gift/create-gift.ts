import { Request, Response, Router, NextFunction } from "express";
import { body } from "express-validator";
import { IGiftDto } from "../../interface/gift";
import { validateRequest } from "../../middleware/request-validator";
import { requireAuth } from "../../middleware/require-auth";
import { GiftService } from "../../services";

const router = Router();

router.post(
  "/",
  requireAuth,
  [
    body("body").isString().notEmpty().withMessage("gift body must be defined"),
    body("user").customSanitizer((value, meta) => {
      // Extract userId from req.currentUser
      const req = meta.req as Request;
      return req.currentUser?._id;
    }),
  ],
  validateRequest,
  async (
    req: Request<any, any, IGiftDto>,
    res: Response,
    next: NextFunction
  ) => {
    const giftDto = req.body;

    try {
      const gift = await GiftService.createNewGift(giftDto);

      res.status(201).send({
        gift,
      });
    } catch (error) {
      console.error(error)
      next(error);
    }
  }
);

export { router as createGiftRouter };
