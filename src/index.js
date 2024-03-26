import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./db/index.js";
import userRoutes from './routes/user.routes.js';
import clotheRoutes from './routes/clothe.routes.js';
import testimonialRoute from './routes/testimonial.routes.js';
import cookieParser from 'cookie-parser';
dotenv.config();
const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser())

//config db
connectDB();

//define routes
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/clothes', clotheRoutes);
app.use('/api/v1/testimonial', testimonialRoute);

app.get("/", (req, res) => {
  res.json({ msg: "hello world" });
});
app.listen(process.env.PORT || 8001, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
