import Joi from "joi";

export const userIdParamSchema = Joi.object({
  userId: Joi.string()
    .pattern(/^[0-9a-fA-F]{24}$/)
    .required()
    .messages({
      "any.required": "userId là bắt buộc",
      "string.pattern.base": "userId không hợp lệ",
    }),
});
