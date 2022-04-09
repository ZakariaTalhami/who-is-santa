import { Router } from "express";
import userRouter from "./user";

const BASE_ROUTE = "/api";

const mainRouter = Router();

mainRouter.use(BASE_ROUTE, userRouter);

export default mainRouter;
