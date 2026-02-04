import express from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import { validateRequest } from "../middlewares/validateRequest";
import {
  taskGroupCreateSchema,
  taskGroupUpdateSchema,
} from "../validations/validationGroup";
import {
  CreateTaskGroup,
  GetTaskGroups,
  GetTaskGroupById,
  UpdateTaskGroup,
  DeleteTaskGroup,
} from "../Controllers/taskGroup.controller";

const router = express.Router();

// list groups (optionally by teamId)
router.get("/", authMiddleware, GetTaskGroups);

router.get("/:id", authMiddleware, GetTaskGroupById);

router.post(
  "/",
  authMiddleware,
  validateRequest(taskGroupCreateSchema),
  CreateTaskGroup,
);

router.put(
  "/:id",
  authMiddleware,
  validateRequest(taskGroupUpdateSchema),
  UpdateTaskGroup,
);

router.delete("/:id", authMiddleware, DeleteTaskGroup);

export default router;
