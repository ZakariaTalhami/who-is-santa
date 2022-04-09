import { Request, Response, Router } from "express";
import { IUserDto } from "../../interface/user";
import { UserService } from "../../services";

const router = Router();

router.post(
  "/register",
  async (req: Request<any, any, IUserDto>, res: Response) => {
    const userDTO: IUserDto = req.body;

    try {
      const user = await UserService.createNewUser(userDTO);
      res.status(201).send({
        user,
      });
    } catch (error) {
      const err = error as Error;

      res.status(500).send({
        message: err.message,
      });
    }
  }
);

export { router as userRegisterRouter };
