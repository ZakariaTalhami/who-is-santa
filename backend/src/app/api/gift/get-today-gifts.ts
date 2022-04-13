import { Request, Response, Router } from "express";
import { GiftService } from "../../services";

const router = Router();

// TODO: paginate the request
router.get("/today", async (req: Request, res: Response) => {
  const giftList = await GiftService.getTodayGifts();

  res.status(200).send({
    data: giftList,
  });
});

export { router as getTodaysGiftsRouter };
