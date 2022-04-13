import { Router } from "express";
import { createGiftRouter } from "./create-gift";

const BASE_USER_ROUTE = "/gifts";

const giftRouter = Router();

giftRouter.use(BASE_USER_ROUTE, createGiftRouter);

export default giftRouter;
