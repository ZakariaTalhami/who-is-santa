import { Request, Response, Router } from "express";
import { body } from "express-validator";
import { IUserLoginDto } from "../../interface/user";
import { validateRequest } from "../../middleware/request-validator";
import { UserService } from "../../services";

const router = Router();

router.post(
  "/login",
  [
    body("email").isEmail().withMessage("email field must be a valid email"),
    body("password")
      .isString()
      .notEmpty()
      .withMessage("password field must be defined"),
  ],
  validateRequest,
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
