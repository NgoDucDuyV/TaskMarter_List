import express from "express";
import {
  CreateTask,
  DeleteTask,
  GetAllTasks,
  GetAllTasksUser,
  GetTaskById,
  UpdateTask,
} from "../Controllers/task.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { userIdParamSchema } from "../validations/user.param.schema";
// import { validateRequest } from "../middlewares/validateRequest";
// import { createTaskValidation } from "../validations/validationTask";
// import { GetAllTasks } from "../Controllers/task.controller";
import { validateParams } from "../middlewares/validate.middleware";
import { validateRequest } from "../middlewares/validateRequest";
import {
  taskValidationCreateSchema,
  taskValidationUpdateSchema,
} from "../validations/validationTask";
const router = express.Router();

router.get("/", authMiddleware, GetAllTasksUser);

// chiết tiết task
router.get("/:id", GetTaskById);

router.post(
  "/",
  authMiddleware,
  validateRequest(taskValidationCreateSchema),
  CreateTask,
);
router.put(
  "/:id",
  authMiddleware,
  validateRequest(taskValidationUpdateSchema),
  UpdateTask,
);
router.delete("/:id", authMiddleware, DeleteTask);

export default router;
