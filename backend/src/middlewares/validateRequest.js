import Joi from "joi";
export const validateRequest = (schema) => {
  return (req, res, next) => {
    const { error, value } = schema.validate(req.body, {
      abortEarly: false,
      stripUnknown: true,
    });

    if (error) {
      return res.status(400).json({
        error: "Dữ liệu không hợp lệ",
        details: error.details.map((err) => err.message),
      });
    }

    // replace body with validated/stripped value
    req.body = value;
    next();
  };
};
