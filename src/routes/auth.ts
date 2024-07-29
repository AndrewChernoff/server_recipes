import { NextFunction, Router } from "express";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../models/user";
import { validateAuthFields } from "../middleware/authValidation";
import { handleValidationError } from "../middleware/handleValidationError";

export const authRouter = Router({});

authRouter.post(
  "/register",
  validateAuthFields,
  handleValidationError,

  async (req: Request, res: Response) => {

    const { name, password } = req.body;

    const userDB = await User.findOne({ name });

    if (userDB) {
      res.status(400).send({ message: "User exists" });
    }

    bcrypt.genSalt(10, function (err, salt) {
      bcrypt.hash(password, salt, function (err, hash) {
        if (err) throw err;

        new User({ name, passwordHash: hash }).save();

        res.status(200).send({ message: "Registered Successfully!" });
      });
    });
  }
);

authRouter.post("/login", validateAuthFields, handleValidationError, async (req: Request, res: Response) => {

  const { name, password } = req.body;

  const userDB: any = await User.findOne({ name });

  if (!userDB) {
    return res.status(400).send({ message: "Пользователь не найден!" });
  }

  const passwordMatch = await bcrypt.compare(password, userDB.passwordHash);

  if (passwordMatch) {
    userDB.passwordHash = undefined;

    const token = jwt.sign({ userId: userDB._id }, "secret", {
      expiresIn: "1h",
    });

    res.status(200).send({ data: { token, ...userDB._doc } });
  } else {
    res.status(400).send({ message: "Пароль неверный!" });
  }
});
