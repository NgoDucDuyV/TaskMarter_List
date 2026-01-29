import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./libs/db.js";
import router from "./routers/index.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// middlewares
app.use(cors());
app.use(express.json());

// test API
app.get("/", (req, res) => {
  res.json({ message: "Task Manager API running 🚀" });
});
// API
app.use("/api", router);
// start server
connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`✅ Server running at http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ DB connect failed:", err);
    process.exit(1);
  });
