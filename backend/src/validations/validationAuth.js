import Joi from "Joi";

// Schema cho signup với thông điệp lỗi rõ ràng
export const validationSignup = Joi.object({
  email: Joi.string().required().email().messages({
    "string.base": "Email phải là chuỗi",
    "string.empty": "Email không được để trống",
    "string.email": "Email không hợp lệ",
    "any.required": "Email là bắt buộc",
  }),

  passwordHash: Joi.string().required().min(6).messages({
    "string.base": "Mật khẩu phải là chuỗi",
    "string.empty": "Mật khẩu không được để trống",
    "string.min": "Mật khẩu phải có ít nhất {#limit} ký tự",
    "any.required": "Mật khẩu là bắt buộc",
  }),

  username: Joi.string().required().messages({
    "string.base": "Tên người dùng phải là chuỗi",
    "string.empty": "Tên người dùng không được để trống",
    "any.required": "Tên người dùng là bắt buộc",
  }),
});
