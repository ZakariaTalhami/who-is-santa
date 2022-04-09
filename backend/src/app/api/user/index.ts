import { Router } from "express";
import { userRegisterRouter } from "./register";

const BASE_USER_ROUTE = "/user";

const userRouter = Router();

userRouter.use(BASE_USER_ROUTE, userRegisterRouter);

export default userRouter;
