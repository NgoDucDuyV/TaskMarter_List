class ErrorResponse extends Error {
  constructor(message, statusCode, errorCode = null) {
    super(message);
    this.statusCode = statusCode;
    this.errorCode = errorCode;
    this.isOperational = true; // Mark as operational error

    Error.captureStackTrace(this, this.constructor);
  }
}

export default ErrorResponse;