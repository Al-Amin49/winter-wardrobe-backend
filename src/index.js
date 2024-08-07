import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./db/index.js";
import userRoutes from './routes/user.routes.js';
import clotheRoutes from './routes/clothe.routes.js';
import testimonialRoute from './routes/testimonial.routes.js';
import communityRoutes from './routes/communityPost.routes.js';
import volunteerRoutes from './routes/volunteer.routes.js';
import donateRoutes from './routes/donate.routes.js';
import cookieParser from 'cookie-parser';
dotenv.config();
const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
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
app.use('/api/v1/communities', communityRoutes);
app.use('/api/v1/volunteers', volunteerRoutes);
app.use('/api/v1/donate', donateRoutes);

app.get("/", (req, res) => {
  res.json({ msg: "hello world" });
});
app.listen(process.env.PORT || 8001, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
