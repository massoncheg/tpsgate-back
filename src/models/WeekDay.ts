import mongoose from "mongoose";

export interface TimeRange {
  startTime: string;
  endTime: string;
}

export interface WeekDay {
  title: string;
  timeRange: TimeRange;
}

const WeekDaySchema = new mongoose.Schema<WeekDay>({
  title: {
    type: String,
    required: true,
  },
  timeRange: {
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
  },
});

export const WeekDayModel = mongoose.model("WeekDay", WeekDaySchema);
