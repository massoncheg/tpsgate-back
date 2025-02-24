import express from "express";

import { isAfter, isBefore, parse, format } from "date-fns";
import { WeekDayModel } from "../models/WeekDay";
import { TZDate } from "@date-fns/tz";
const router = express.Router();

const weekDays = [
  "Понедельник",
  "Вторник",
  "Среда",
  "Четверг",
  "Пятница",
  "Суббота",
  "Воскресенье",
];
const todayIs = weekDays[0];

// Примечание - Сначала сделал реализацию TZDate, но сам путался тк по умолчанию использовался какой-то усреднённый часовой пояс
function checkTime(
  startTime: string,
  endTime: string,
  timeZone = "Europe/Moscow"
): boolean {
  // Текущее время в указанном часовом поясе
  const now = new TZDate(new Date(), timeZone);

  // Парсим время начала и окончания в указанном часовом поясе
  const startDate = new TZDate(parse(startTime, "HH:mm", now), timeZone);
  const endDate = new TZDate(parse(endTime, "HH:mm", now), timeZone);

  // Проверяем, находится ли текущее время между startDate и endDate
  return isAfter(now, startDate) && isBefore(now, endDate);
}
async function getTodaysTimeRange() {
  const weekDay = await WeekDayModel.findOne({ title: todayIs });

  if (!weekDay) return null;
  return weekDay.timeRange;
}
// Получаем попадаем ли мы в расписание
router.get("/", async (req, res) => {
  try {
    const range = await getTodaysTimeRange();
    if (!range) {
      throw new Error("Нет такого дня");
    }
    const { startTime, endTime } = range;
    if (checkTime(startTime, endTime)) {
      res.status(200).json({ message: "Проходите!" });
      return;
    }

    res.status(403).json({ error: "Отказано в доступе!" });
  } catch (error) {
    res.status(500).json({ error: "Ошибка сервера" });
  }
});

export default router;
