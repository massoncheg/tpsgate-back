import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import timeRoutes from './routes/timeRoutes';
import loginRoutes from './routes/loginRoutes';
import openRoutes from './routes/isOpenRoutes';


dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 3000;

// Подключение к MongoDB
mongoose
  .connect(process.env.MONGO_URI as string)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Используем маршруты
app.use('/weekdays', timeRoutes);
app.use('/login', loginRoutes);
app.use('/open', openRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
