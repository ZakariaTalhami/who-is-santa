import { Router } from "express";
import { createGiftRouter } from "./create-gift";
import { getGiftsRouter } from "./get-gifts";
import { getTodaysGiftsRouter } from "./get-today-gifts";

const BASE_USER_ROUTE = "/gifts";

const giftRouter = Router();

giftRouter.use(BASE_USER_ROUTE, createGiftRouter);
giftRouter.use(BASE_USER_ROUTE, getTodaysGiftsRouter);
giftRouter.use(BASE_USER_ROUTE, getGiftsRouter);

export default giftRouter;
