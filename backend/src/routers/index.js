import express from "express";
import authRouter from "./auth.router";
import taskRouter from "./task.router";
import { authMiddleware } from "../middlewares/auth.middleware";
const router = express.Router();

router.use("/auth", authRouter);
router.use("/task", authMiddleware, taskRouter);

export default router;
