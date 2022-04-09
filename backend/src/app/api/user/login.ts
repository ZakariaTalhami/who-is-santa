import { Request, Response, Router } from "express";
import { IUserLoginDto } from "../../interface/user";
import { UserService } from "../../services";

const router = Router();

router.post(
  "/login",
  async (req: Request<any, any, IUserLoginDto>, res: Response) => {
    const userLoginData = req.body;

    try {
      const token = await UserService.loginUser(userLoginData);

      res.status(200).send({
        token,
      });
    } catch (error) {
      const err = error as Error;

      res.status(500).send({
        message: err.message,
      });
    }
  }
);

export { router as userLoginRouter };
