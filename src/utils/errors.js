const { STATUS_CODES, ERROR_MESSAGES } = require("../config/appConstants");

class AuthFailedError extends Error {
  constructor(
    statusCode = STATUS_CODES.AUTH_FAILED,
    message = ERROR_MESSAGES.AUTHENTICATION_FAILED
  ) {
    super(message);

    Object.setPrototypeOf(this, AuthFailedError.prototype);

    this.statusCode = statusCode;
    this.name = this.constructor.name;
    this.logError = statusCode === STATUS_CODES.FORBIDDEN;
  }
}


class ValidationError extends Error {
  constructor(
    data,
    message = ERROR_MESSAGES.VALIDATION_FAILED,
    logError = true,
    statusCode = STATUS_CODES.VALIDATION_FAILED
  ) {
    super(message);
    Object.setPrototypeOf(this, ValidationError.prototype);
    this.name = this.constructor.name;
    this.message = message;
    this.data = data;
    this.logError = logError;
    this.statusCode = statusCode;
  }
}

class OperationalError extends Error {
  constructor(
    statusCode = STATUS_CODES,                          
    message = ERROR_MESSAGES,
    data,
    logError = true
  ) {
    super(message);

    Object.setPrototypeOf(this, OperationalError.prototype);
    this.name = "";
    this.data = data;
    this.statusCode = statusCode;
    this.logError = logError;
  }
}

class NotFoundError extends Error {
  constructor(
    statusCode = STATUS_CODES.NOT_FOUND,
    message = ERROR_MESSAGES.NOT_FOUND,
    logError = true
  ) {
    super(message);
    this.statusCode = statusCode;
    this.logError = logError;
  }
}


module.exports = { AuthFailedError, ValidationError, OperationalError, NotFoundError };
