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

// Добавить новый день
router.post("/", async (req, res) => {
  try {
    
    const { id, title, timeRange } = req.body;
    const newTimeRange = new WeekDayModel({ id, title, timeRange });
    await newTimeRange.save();
    res.status(201).json(newTimeRange);
  } catch (error) {
    res.status(500).json({ error: "Ошибка при сохранении" });
  }
});

// Обновить данные утки по ID
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

// Удалить утку по ID
router.delete("/:id", async (req, res) => {
  try {
    await WeekDayModel.findByIdAndDelete(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ error: "Ошибка при удалении" });
  }
});

export default router;