const {
  STATUS_CODES,
  MESSAGES,
  ERROR_MESSAGES,
} = require("../config/appConstants");
const {
  AuthFailedError,
  ValidationError,
  NotFoundError,
  OperationalError,
} = require("./errors");

const successResponse = (
  req,
  res,
  statusCode = STATUS_CODES,
  message = MESSAGES,
  data
) => {
  const result = {
    statusCode,
    message: res.__(message),
    data,
  };
  return res.status(statusCode).json(result);
};

const errorResponse = (error, req, res) => {
  let statusCode =
    error.code ||
    error.statusCode ||
    error.response?.status ||
    STATUS_CODES.ERROR;

  const logError = error.logError ?? true;

  //@ts-ignore
  //const reqId = req["reqId"];

  if (statusCode === STATUS_CODES.ERROR) {
    // This clips the constructor invocation from the stack trace.
    // It's not absolutely essential, but it does make the stack trace a little nicer.
    Error.captureStackTrace(error, error.constructor);
  }

  if (logError) {
    //let initiator = errorLine(error);
    // console.error(error);
    // logger.error((reqId) => {
    //   `${reqId}, initiator=>${initiator}, Stack=>${error.stack}`;
    // });
  }

  if (statusCode === STATUS_CODES.ERROR) {
    //TODO: ****  Production Error need to add notifications
    return res.status(statusCode).json({
      statusCode,
      message: res.__(ERROR_MESSAGES.SERVER_ERROR),
      // data: {},
    });
  }

  const message =
    error instanceof NotFoundError ||
    error instanceof ValidationError ||
    error instanceof OperationalError ||
    error instanceof AuthFailedError
      ? res.__(error.message)
      : error.toString();

  return res.status(statusCode || STATUS_CODES.ERROR).json({
    statusCode: statusCode || STATUS_CODES.ERROR,
    message,
    data: error.data,
  });
};

module.exports = { successResponse, errorResponse };
