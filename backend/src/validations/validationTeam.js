import Joi from "joi";

export const teamCreateSchema = Joi.object({
  name: Joi.string().min(2).max(100).required().messages({
    "string.empty": "Name is required",
    "any.required": "Name is required",
  }),
  visibility: Joi.string().valid("private", "public").default("private"),
});

export const teamUpdateSchema = Joi.object({
  name: Joi.string().min(2).max(100),
  visibility: Joi.string().valid("private", "public"),
});

export const addMemberSchema = Joi.object({
  userId: Joi.string()
    .pattern(/^[0-9a-f]{24}$/)
    .required()
    .messages({
      "string.pattern.base": "UserId không hợp lệ",
      "any.required": "UserId là bắt buộc",
    }),
  role: Joi.string()
    .valid("admin", "member", "guest")
    .default("member")
    .messages({
      "any.only": "Role phải là một trong: admin, member, guest",
    }),
});

export const updateMemberSchema = Joi.object({
  role: Joi.string()
    .valid("admin", "member", "guest")
    .required()
    .messages({
      "any.only": "Role phải là một trong: admin, member, guest",
      "any.required": "Role là bắt buộc",
    }),
});
