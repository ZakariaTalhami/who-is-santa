import { NextFunction, Request, Response, Router } from "express";
import { EAwardTypes } from "../../enum";
import { UserAlreadyAwardedGiftError } from "../../error/already-awarded-gift-error";
import { UserAwardOwnGiftError } from "../../error/cant-award-own-gift-error";
import { InsufficientBalaneError } from "../../error/insufficient-balance-error";
import { HttpNotFoundError } from "../../error/not-found-http-error";
import { hasBalance } from "../../middleware/has-balance";
import { loadUserInfo } from "../../middleware/load-user-info";
import { requireAuth } from "../../middleware/require-auth";
import { GiftService, UserAwardGiftService, UserService } from "../../services";

const router = Router();

type AwardParams = {
  giftId: string;
};

type AwardRequestBody = {
  type: EAwardTypes;
};

router.post(
  "/:giftId/award",
  requireAuth,
  loadUserInfo,
  hasBalance(),
  async (
    req: Request<AwardParams, any, AwardRequestBody>,
    res: Response,
    next: NextFunction
  ) => {
    const { giftId } = req.params;
    const { type } = req.body;
    const userId = req.currentUser?._id as string;

    // find gift
    const gift = await GiftService.findGiftById(giftId);
    if (!gift) return  next(new HttpNotFoundError(`Gift ${giftId} not found`));

    // check if gift is owned by user
    if(gift.user === userId) {
      return next(new UserAwardOwnGiftError())
    }

    // check if already awarded
    if (await UserAwardGiftService.hasUserAwardedGift(userId, giftId)) {
      return next(new UserAlreadyAwardedGiftError(userId))
    }

    // Decrease Balance of user
    if (!(await UserService.decreaseUserBalance(userId, type))) {
      return next(new InsufficientBalaneError(userId));
    }

    // Award the gift
    await GiftService.awardGift(giftId, type);

    // Create award gift record
    const userAwardedGift = await UserAwardGiftService.trackUserAwardedGift(
      userId,
      giftId,
      type
    );

    res.send(userAwardedGift);
  }
);

export { router as awardGiftRouter };
