import express from "express";
import authRouter from "./auth.router";
import taskRouter from "./task.router"
const router = express.Router();

router.use("/auth", authRouter);
router.use("/task", taskRouter);

export default router;
