import { UserLogin, UserLoginModel } from "../models/UserData";
import express from "express";
import { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";

import jwt from "jsonwebtoken";
dotenv.config();

const router = express.Router();
const SECRET_KEY = process.env.JWT_SECRET_KEY;

if (!SECRET_KEY) throw new Error("server doesn't have secret key in .env");

// Авторизация пользователя
router.post("/", async (req, res) => {
  try {
    const { email, password } = req.body as UserLogin;

    const user = UserLoginModel.findOne({ email, password });

    if (!user) {
      res.status(401).json({ error: "Неверные учетные данные" });
      return;
    }

    // Генерация токена
    const token = jwt.sign({ email }, SECRET_KEY, { expiresIn: "24h" });

    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ error: "Ошибка сервера" });
  }
});
router.get("/validate", async (req, res) => {
  try {
    const token = req.header("Authorization")?.split(" ")[1];

    if (!token) {
      res.status(400).json({ error: "В запросе не было токена" });
      return;
    }

    jwt.verify(token, SECRET_KEY, (err: jwt.VerifyErrors | null) => {
      if (err) {
        res.status(403).json({ error: "Недействительный токен" });
        return;
      }
      res.status(200).json({ valid: true });
    });
  } catch (error) {
    res.status(500).json({ error: "Ошибка сервера" });
  }
});

// Middleware для проверки токена
export const authenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.header("Authorization")?.split(" ")[1];

  if (!token) {
    res.status(401).json({ error: "Отказано в доступе" });
    return;
  }

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) {
      res.status(403).json({ error: "Недействительный токен" });
      return;
    }
    next();
  });
};

export default router;
