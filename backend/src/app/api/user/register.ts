import { Request, Response, Router } from "express";
import { body } from "express-validator";
import { IUserDto } from "../../interface/user";
import { validateRequest } from "../../middleware/request-validator";
import { UserService } from "../../services";

const router = Router();

router.post(
  "/register",
  [
    body("email").isEmail().withMessage("email field must be a valid email"),
    body("username")
      .isString()
      .notEmpty()
      .withMessage("username field must be defined"),
    body("password")
      .isString()
      .notEmpty()
      .withMessage("password field must be defined")
      .isLength({
        min: 8,
      })
      // TODO: add password pattern check
      .withMessage("password field must have at least 8 characters"),
  ],
  validateRequest,
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
