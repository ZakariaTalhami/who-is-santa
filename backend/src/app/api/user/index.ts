import { Router } from "express";
import { userLoginRouter } from "./login";
import { userRegisterRouter } from "./register";

const BASE_USER_ROUTE = "/user";

const userRouter = Router();

userRouter.use(BASE_USER_ROUTE, userRegisterRouter);
userRouter.use(BASE_USER_ROUTE, userLoginRouter);

export default userRouter;
