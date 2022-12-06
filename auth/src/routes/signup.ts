import express, { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import { User } from "../models/user";
import { RequestValidationError } from "@hpticketings/common";
import { BadRequestError } from "@hpticketings/common";
import jwt from "jsonwebtoken";
import { validateRequest } from "@hpticketings/common";

const router = express.Router();

router.post(
  "/api/users/signup",
  [
    body("email").isEmail().withMessage("Email must me valid"),
    body("password")
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage("password must be between 4-20 letter"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      throw new BadRequestError("Email already in use !");
    }

    const user = User.build({ email, password });
    await user.save();

    const userJwt = jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
      process.env.JWT_KEY!
    );

    req.session = {
      jwt: userJwt,
    };

    res.status(200).send(user);
  }
);

export { router as signUpRouter };
