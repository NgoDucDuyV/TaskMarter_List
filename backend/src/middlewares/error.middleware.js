export const errorMiddleware = (err, req, res, next) => {
  // Log lỗi chi tiết trong môi trường phát triển/ghi lại bằng logger chuyên nghiệp trong sản xuất
  console.error(err);

  let error = { ...err };
  error.message = err.message;

  // Xử lý lỗi Mongoose Bad ObjectId
  if (err.name === "CastError") {
    const message = `Resource not found with id of ${err.value}`;
    error = new ErrorResponse(message, 404);
  }

  // Xử lý lỗi Mongoose Duplicate Key
  if (err.code === 11000) {
    const message = `Duplicate field value entered`;
    error = new ErrorResponse(message, 400);
  }

  // Xử lý lỗi Mongoose Validation
  if (err.name === "ValidationError") {
    const message = Object.values(err.errors).map((val) => val.message);
    error = new ErrorResponse(message.join(", "), 400);
  }

  res.status(error.statusCode || 500).json({
    success: false,
    message: error.isOperational ? error.message : "Internal Server Error",
    // Chỉ gửi stack trace trong môi trường phát triển
    stack: process.env.NODE_ENV === "development" ? error.stack : undefined,
  });
};
