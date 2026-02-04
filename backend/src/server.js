import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import { connectDB } from "./libs/db.js";
import router from "./routers";
import { errorMiddleware } from "./middlewares/error.middleware.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// Configure CORS
const corsOptions = {
  origin: process.env.CORS_ORIGIN || "http://localhost:5173", // Thay thế bằng domain frontend của bạn
  credentials: true,
};
app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));

// test API
app.get("/", (req, res) => {
  res.json({ message: "Task Manager API running 🚀" });
});
// API
app.use("/api", router);

// Error handling middleware
app.use(errorMiddleware);

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`✅ Server running at http://localhost:${PORT}`);
  });
});
