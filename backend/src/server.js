import express from "express";
import dotenv from "dotenv";
import cors from "cors";
// import helmet from "helmet"; // Thêm helmet
// import morgan from "morgan"; // Thêm morgan
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
app.use(cors(corsOptions));
app.use(express.json());

// test API
app.get("/", (req, res) => {
  res.json({ message: "Task Manager API running 🚀" });
});
// API
app.use("/api", router);

// Error handling middleware
app.use(errorMiddleware);

// #region agent log
fetch('http://127.0.0.1:7242/ingest/3cfdf1a4-7538-4a6c-8ec0-23aed9a53701',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'src/server.js:33',message:'Attempting to connect to DB and start server',timestamp:Date.now(),sessionId:'debug-session',hypothesisId:'A'})}).catch(()=>{});
// #endregion
// start server
connectDB()
  .then(() => {
    // #region agent log
fetch('http://127.0.0.1:7242/ingest/3cfdf1a4-7538-4a6c-8ec0-23aed9a53701',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'src/server.js:36',message:'DB connected, attempting to start server',data:{port:PORT},timestamp:Date.now(),sessionId:'debug-session',hypothesisId:'D'})}).catch(()=>{});
// #endregion
    app.listen(PORT, () => {
      // #region agent log
fetch('http://127.0.0.1:7242/ingest/3cfdf1a4-7538-4a6c-8ec0-23aed9a53701',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'src/server.js:38',message:'Server started successfully',data:{port:PORT},timestamp:Date.now(),sessionId:'debug-session',hypothesisId:'D'})}).catch(()=>{});
// #endregion
      console.log(`✅ Server running at http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    // #region agent log
fetch('http://127.0.0.1:7242/ingest/3cfdf1a4-7538-4a6c-8ec0-23aed9a53701',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'src/server.js:43',message:'DB connection failed',data:{error:err.message},timestamp:Date.now(),sessionId:'debug-session',hypothesisId:'C'})}).catch(()=>{});
// #endregion
    console.error("❌ DB connect failed:", err);
    process.exit(1);
  });

process.on('uncaughtException', (err) => {
  // #region agent log
  fetch('http://127.0.0.1:7242/ingest/3cfdf1a4-7538-4a6c-8ec0-23aed9a53701',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'src/server.js:50',message:'Uncaught Exception',data:{error:err.message,stack:err.stack},timestamp:Date.now(),sessionId:'debug-session',hypothesisId:'C'})}).catch(()=>{});
  // #endregion
  console.error('Uncaught Exception:', err);
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  // #region agent log
  fetch('http://127.0.0.1:7242/ingest/3cfdf1a4-7538-4a6c-8ec0-23aed9a53701',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'src/server.js:58',message:'Unhandled Rejection',data:{reason:reason,promise:promise},timestamp:Date.now(),sessionId:'debug-session',hypothesisId:'C'})}).catch(()=>{});
// #endregion
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  process.exit(1);
});
