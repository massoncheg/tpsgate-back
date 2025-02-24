import express from "express";
import { Request, Response, NextFunction } from "express";

import jwt from "jsonwebtoken";

const router = express.Router();

const SECRET_KEY = "your_secret_key"; // Лучше вынести в .env

// Жестко заданные пользователи
const users = [
  { email: "user1@some.com", password: "0000" },
  { email: "user2@some.com", password: "0000" },
];

// Авторизация пользователя
router.post("/", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Проверяем, есть ли пользователь в списке
    const user = users.find(
      (u) => u.email === email && u.password === password
    );

    if (!user) {
      res.status(401).json({ error: "Неверные учетные данные" });
      return;
    }

    // Генерация токена
    const token = jwt.sign({ email }, SECRET_KEY, { expiresIn: "1h" });

    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ error: "Ошибка сервера" });
  }
});
router.post("/validate", async (req, res) => {
  try {
    const { token } = req.body;
    
    if (!token) {
      res.status(400).json({ error: "В запросе не было токена" });
      return;
    }
    jwt.verify(token, SECRET_KEY, (err: jwt.VerifyErrors | null) => {
      if (err) {
        res.status(403).json({ error: "Недействительный токен" });
        return;
      }
      res.status(200).send();
    });
  } catch (error) {
    res.status(500).json({ error: "Ошибка сервера" });
  }
});

// Middleware для проверки токена (если понадобится)
export const authenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(req.header("Authorization"));
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
