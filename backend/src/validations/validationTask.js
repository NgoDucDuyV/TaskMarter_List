import Joi from "joi";
export const taskValidationCreateSchema = Joi.object({
  title: Joi.string().required().min(1).max(200).trim().messages({
    "string.empty": "Tiêu đề không được để trống",
    "string.min": "Tiêu đề phải có ít nhất 1 ký tự",
    "string.max": "Tiêu đề không được vượt quá 200 ký tự",
    "any.required": "Tiêu đề là bắt buộc",
  }),

  description: Joi.string().allow("", null).max(1000).trim().messages({
    "string.max": "Mô tả không được vượt quá 1000 ký tự",
  }),

  priority: Joi.string()
    .valid("low", "medium", "high", "urgent")
    .default("medium")
    .messages({
      "any.only": "Độ ưu tiên phải là: low, medium hoặc high",
    }),

  startDate: Joi.date().iso().messages({
    "date.base": "Ngày bắt đầu phải là định dạng ngày hợp lệ",
    "date.format": "Ngày bắt đầu phải theo định dạng ISO 8601",
  }),

  dueDate: Joi.date().iso().min(Joi.ref("startDate")).messages({
    "date.base": "Ngày kết thúc phải là định dạng ngày hợp lệ",
    "date.format": "Ngày kết thúc phải theo định dạng ISO 8601",
    "date.min": "Ngày kết thúc phải sau ngày bắt đầu",
  }),
});

// Schema for updates (allow partial updates, including status)
export const taskValidationUpdateSchema = Joi.object({
  title: Joi.string().min(1).max(200).trim().messages({
    "string.min": "Tiêu đề phải có ít nhất 1 ký tự",
    "string.max": "Tiêu đề không được vượt quá 200 ký tự",
  }),

  description: Joi.string().allow("", null).max(1000).trim().messages({
    "string.max": "Mô tả không được vượt quá 1000 ký tự",
  }),

  priority: Joi.string().valid("low", "medium", "high", "urgent").messages({
    "any.only": "Độ ưu tiên phải là: low, medium hoặc high",
  }),

  startDate: Joi.date().iso().messages({
    "date.base": "Ngày bắt đầu phải là định dạng ngày hợp lệ",
    "date.format": "Ngày bắt đầu phải theo định dạng ISO 8601",
  }),

  dueDate: Joi.date().iso().min(Joi.ref("startDate")).messages({
    "date.base": "Ngày kết thúc phải là định dạng ngày hợp lệ",
    "date.format": "Ngày kết thúc phải theo định dạng ISO 8601",
    "date.min": "Ngày kết thúc phải sau ngày bắt đầu",
  }),

  status: Joi.string()
    .valid("todo", "in_progress", "blocked", "done")
    .messages({
      "any.only":
        "Trạng thái phải là một trong: todo, in_progress, blocked, done",
    }),
}).min(1); // require at least one field to update
