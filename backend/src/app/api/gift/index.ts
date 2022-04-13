import { Router } from "express";
import { createGiftRouter } from "./create-gift";
import { getTodaysGiftsRouter } from "./get-today-gifts";

const BASE_USER_ROUTE = "/gifts";

const giftRouter = Router();

giftRouter.use(BASE_USER_ROUTE, createGiftRouter);
giftRouter.use(BASE_USER_ROUTE, getTodaysGiftsRouter);

export default giftRouter;
