import Joi from "joi";

export const taskGroupCreateSchema = Joi.object({
  teamId: Joi.string().required().messages({
    "any.required": "teamId is required",
  }),
  name: Joi.string().required().min(1).max(200).trim().messages({
    "string.empty": "Tên nhóm không được để trống",
    "string.min": "Tên nhóm phải có ít nhất 1 ký tự",
    "string.max": "Tên nhóm không được vượt quá 200 ký tự",
    "any.required": "Tên nhóm là bắt buộc",
  }),
  description: Joi.string().allow("", null).max(1000).trim(),
});

export const taskGroupUpdateSchema = Joi.object({
  name: Joi.string().min(1).max(200).trim(),
  description: Joi.string().allow("", null).max(1000).trim(),
}).min(1);
