import Joi from "joi";

export const validationSignup = Joi.object({
  username: Joi.string().trim().min(3).max(30).required().messages({
    "string.base": "username phải là chuỗi",
    "string.empty": "username không được để trống",
    "string.min": "username tối thiểu {#limit} ký tự",
    "string.max": "username tối đa {#limit} ký tự",
    "any.required": "username là bắt buộc",
  }),

  email: Joi.string().trim().lowercase().email().required().messages({
    "string.base": "email phải là chuỗi",
    "string.empty": "email không được để trống",
    "string.email": "email không hợp lệ",
    "any.required": "email là bắt buộc",
  }),

  password: Joi.string().min(6).max(128).required().messages({
    "string.base": "password phải là chuỗi",
    "string.empty": "password không được để trống",
    "string.min": "password tối thiểu {#limit} ký tự",
    "string.max": "password tối đa {#limit} ký tự",
    "any.required": "password là bắt buộc",
  }),

  firstName: Joi.string().trim().min(1).max(40).required().messages({
    "string.base": "firstName phải là chuỗi",
    "string.empty": "firstName không được để trống",
    "any.required": "firstName là bắt buộc",
  }),

  lastName: Joi.string().trim().min(1).max(40).required().messages({
    "string.base": "lastName phải là chuỗi",
    "string.empty": "lastName không được để trống",
    "any.required": "lastName là bắt buộc",
  }),

  dateOfBirth: Joi.string()
    .pattern(/^\d{4}-\d{2}-\d{2}$/)
    .required()
    .custom((value, helpers) => {
      const dob = new Date(value);
      if (Number.isNaN(dob.getTime())) {
        return helpers.error("any.custom", {
          message: "dateOfBirth không hợp lệ",
        });
      }

      // không được là ngày tương lai
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      dob.setHours(0, 0, 0, 0);

      if (dob > today) {
        return helpers.error("any.custom", {
          message: "dateOfBirth không được ở tương lai",
        });
      }

      return value;
    })
    .messages({
      "string.pattern.base": "dateOfBirth phải theo định dạng YYYY-MM-DD",
      "any.custom": "{{#message}}",
      "any.required": "dateOfBirth là bắt buộc",
    }),
}).prefs({
  abortEarly: false, // trả về tất cả lỗi
  stripUnknown: true, // loại bỏ field thừa
});

export const validationSignin = Joi.object({
  email: Joi.string().trim().lowercase().email().required().messages({
    "string.base": "email phải là chuỗi",
    "string.empty": "email không được để trống",
    "string.email": "email không hợp lệ",
    "any.required": "email là bắt buộc",
  }),

  password: Joi.string().required().messages({
    "string.base": "password phải là chuỗi",
    "string.empty": "password không được để trống",
    "any.required": "password là bắt buộc",
  }),
}).prefs({
  abortEarly: false, // trả tất cả lỗi
  stripUnknown: true, // bỏ field thừa
});
