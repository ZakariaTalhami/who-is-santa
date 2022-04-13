import { Router } from "express";
import giftRouter from "./gift";
import userRouter from "./user";

const BASE_ROUTE = "/api";

const mainRouter = Router();

mainRouter.use(BASE_ROUTE, userRouter);
mainRouter.use(BASE_ROUTE, giftRouter);

export default mainRouter;
