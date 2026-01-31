import Joi from "joi";

export const createTaskValidation = Joi.object({
  title: Joi.string().min(3).max(255).required(),
  description: Joi.string().max(1000).allow(null, ''),
  status: Joi.string().valid("todo", "in_progress", "done", "blocked").default("todo"),
  priority: Joi.string().valid("low", "medium", "high", "urgent").default("medium"),
  startDate: Joi.date().allow(null),
  dueDate: Joi.date().allow(null),
  ownerUserId: Joi.string().regex(/^[0-9a-fA-F]{24}$/).allow(null), // Assuming MongoDB ObjectId format
  teamId: Joi.string().regex(/^[0-9a-fA-F]{24}$/).allow(null),
  groupId: Joi.string().regex(/^[0-9a-fA-F]{24}$/).allow(null),
  folderId: Joi.string().regex(/^[0-9a-fA-F]{24}$/).allow(null),
  parentTaskId: Joi.string().regex(/^[0-9a-fA-F]{24}$/).allow(null),
});

export const updateTaskValidation = Joi.object({
  title: Joi.string().min(3).max(255).optional(),
  description: Joi.string().max(1000).allow(null, '').optional(),
  status: Joi.string().valid("todo", "in_progress", "done", "blocked").optional(),
  priority: Joi.string().valid("low", "medium", "high", "urgent").optional(),
  startDate: Joi.date().allow(null).optional(),
  dueDate: Joi.date().allow(null).optional(),
  ownerUserId: Joi.string().regex(/^[0-9a-fA-F]{24}$/).allow(null).optional(),
  teamId: Joi.string().regex(/^[0-9a-fA-F]{24}$/).allow(null).optional(),
  groupId: Joi.string().regex(/^[0-9a-fA-F]{24}$/).allow(null).optional(),
  folderId: Joi.string().regex(/^[0-9a-fA-F]{24}$/).allow(null).optional(),
  parentTaskId: Joi.string().regex(/^[0-9a-fA-F]{24}$/).allow(null).optional(),
  isArchived: Joi.boolean().optional(),
});
