import express from "express";
import { WeekDayModel } from "../models/WeekDay";
import { authenticateToken } from './loginRoutes';

const router = express.Router();

router.use(authenticateToken)

// Получить все дни
router.get("/", async (req, res) => {
  try {
    const timeRanges = await WeekDayModel.find();
    res.json(timeRanges);
  } catch (error) {
    res.status(500).json({ error: "Ошибка сервера" });
  }
});

// Обновить данные дня
router.patch("/:id", async (req, res) => {
  try {
    const weekDay = await WeekDayModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!weekDay) {
      res.status(404).json({ error: "Ошибка при обновлении" });
      return;
    }

    res.json(weekDay);
  } catch (error) {
    res.status(500).json({ error: "Ошибка при обновлении" });
  }
});

export default router;