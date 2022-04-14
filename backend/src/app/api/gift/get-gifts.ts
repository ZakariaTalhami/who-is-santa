import { Request, Response, Router } from "express";
import { query } from "express-validator";
import { GiftService } from "../../services";

const router = Router();

// TODO: paginate the request
router.get(
  "/",
  [
    query("startDate").isISO8601().toDate(),
    query("endDate").isISO8601().toDate(),
  ],
  async (
    req: Request<any, any, any, { startDate?: Date; endDate?: Date }>,
    res: Response
  ) => {
    // TODO: validate dates
    const { startDate, endDate } = req.query;

    const giftList = await GiftService.getGiftsByDateRange({
      createdAtStart: startDate,
      createdAtEnd: endDate,
    });

    res.status(200).send({
      data: giftList,
    });
  }
);

export { router as getGiftsRouter };
