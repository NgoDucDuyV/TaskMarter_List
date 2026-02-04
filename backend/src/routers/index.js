import express from "express";
import authRouter from "./auth.router";
import userRouter from "./user.router";
import taskRouter from "./task.router";
import groupRouter from "./taskGroup.router";
import teamRouter from "./team.router";
import teamInviteRouter from "./teamInvite.router";
import taskAssigneeRouter from "./taskAssignee.router";
import { authMiddleware } from "../middlewares/auth.middleware";
const router = express.Router();

router.use("/auth", authRouter);
router.use("/user", authMiddleware, userRouter);
router.use("/task", taskRouter);
router.use("/group", authMiddleware, groupRouter);
router.use("/team", authMiddleware, teamRouter);
router.use("/invite", teamInviteRouter); // Team invites (some public, some protected)
router.use("/assign", taskAssigneeRouter); // Task assignments

export default router;
