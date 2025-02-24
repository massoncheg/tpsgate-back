import express from "express";

import { isAfter, isBefore, parse, format } from "date-fns";
import { WeekDayModel } from "../models/WeekDay";
const router = express.Router();

const baseDate = "2000-01-01"; // Используем фиктивный день

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

// function parseTime(time: string): Date {
//   return parse(time, "HH:mm", new Date());
// }
function checkTime(startTime: string, endTime: string): boolean {
  // Текущее время в формате HH:mm
  const now = new Date();

  const currentTimeStr = format(now, "HH:mm");
  const baseDate = format(now, "yyyy-MM-dd");

  // Так как у нас абстрактный день недели берём фиктивную
  console.log(baseDate);

  const startDate = parse(`${baseDate} ${startTime}`, "yyyy-MM-dd HH:mm", now);
  const endDate = parse(`${baseDate} ${endTime}`, "yyyy-MM-dd HH:mm", now);
  const currentDate = parse(
    `${baseDate} ${currentTimeStr}`,
    "yyyy-MM-dd HH:mm",
    now
  );

  console.log(currentTimeStr);
  console.log(startTime, endTime);
  console.log(startDate, endDate);
  console.log(currentDate);

  return isAfter(currentDate, startDate) && isBefore(currentDate, endDate);
}
async function getTodaysTimeRange() {
  // const weekDay = await WeekDayModel.findOne({ title: todayIs });
  const weekDay = { timeRange: { startTime: "00:00", endTime: "23:00" } };
  if (!weekDay) return null;
  return weekDay.timeRange;
}
// Получаем попадаем ли мы в расписанием
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

    res.status(403).json({ error: "Отказано в доступе" });
  } catch (error) {
    res.status(500).json({ error: "Ошибка сервера" });
  }
});

export default router;
