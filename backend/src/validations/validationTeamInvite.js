import Joi from "joi";

export const createInviteSchema = Joi.object({
  email: Joi.string().trim().lowercase().email().required().max(255).messages({
    "string.empty": "Email không được để trống",
    "string.email": "Email không hợp lệ",
    "any.required": "Email là bắt buộc",
    "string.max": "Email không được vượt quá 255 ký tự",
  }),

  role: Joi.string()
    .valid("admin", "member", "guest")
    .default("member")
    .messages({
      "any.only": "Role phải là một trong: admin, member, guest",
    }),

  expiresInDays: Joi.number().min(1).max(30).default(7).messages({
    "number.min": "Thời hạn mời phải tối thiểu 1 ngày",
    "number.max": "Thời hạn mời không được vượt quá 30 ngày",
  }),
});

export const acceptInviteSchema = Joi.object({
  token: Joi.string().required().messages({
    "string.empty": "Token không được để trống",
    "any.required": "Token là bắt buộc",
  }),

  teamId: Joi.string()
    .pattern(/^[0-9a-f]{24}$/)
    .required()
    .messages({
      "string.pattern.base": "TeamId không hợp lệ",
      "any.required": "TeamId là bắt buộc",
    }),
});

export const declineInviteSchema = Joi.object({
  token: Joi.string().required().messages({
    "string.empty": "Token không được để trống",
    "any.required": "Token là bắt buộc",
  }),
});
