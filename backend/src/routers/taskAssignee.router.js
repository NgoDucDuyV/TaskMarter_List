import express from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { validateRequest } from "../middlewares/validateRequest.js";
import * as taskAssigneeController from "../Controllers/taskAssignee.controller.js";
import Joi from "joi";

const assignSchema = Joi.object({
  userId: Joi.string()
    .pattern(/^[0-9a-f]{24}$/)
    .required()
    .messages({
      "string.pattern.base": "UserId không hợp lệ",
      "any.required": "UserId là bắt buộc",
    }),
});

const bulkAssignSchema = Joi.object({
  userIds: Joi.array()
    .items(
      Joi.string()
        .pattern(/^[0-9a-f]{24}$/)
        .messages({
          "string.pattern.base": "UserId không hợp lệ",
        }),
    )
    .min(0)
    .max(50)
    .required()
    .messages({
      "array.min": "Phải có ít nhất 0 user",
      "array.max": "Tối đa 50 users",
      "any.required": "userIds là bắt buộc",
    }),
});

const router = express.Router();

// C.1. Giao việc
router.post(
  "/:taskId/assign",
  authMiddleware,
  validateRequest(assignSchema),
  taskAssigneeController.assignMember,
);

// C.2. Bỏ giao việc
router.delete(
  "/:taskId/assign/:assigneeId",
  authMiddleware,
  taskAssigneeController.unassignMember,
);

// C.3. Lấy danh sách assignees
router.get(
  "/:taskId/assignees",
  authMiddleware,
  taskAssigneeController.getTaskAssignees,
);

// C.4. Cập nhật hàng loạt
router.put(
  "/:taskId/assignees",
  authMiddleware,
  validateRequest(bulkAssignSchema),
  taskAssigneeController.updateTaskAssignees,
);

export default router;
