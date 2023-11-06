const rateLimit = require("express-rate-limit");
const { NotFoundError } = require("../utils/errors");
const { errorResponse } = require("../utils/Response");
const { ERROR_MESSAGES, STATUS_CODES } = require("../config/appConstants");

const errorHandler = (error, req, res, next) => {
  return errorResponse(error, req, res);
};

const routeNotFoundHandler = (req, res, next) => {
  return errorResponse(
    new NotFoundError(STATUS_CODES.NOT_FOUND, ERROR_MESSAGES.ROUTE_NOT_FOUND),
    req,
    res
  );
};

// const requestHandler = (req, res, next) => {
//   //@ts-ignore
//   req["reqId"] = uuidv4();
//   //  Setting Language incase a header come
//   res.setLocale(req.get("languageCode") || "en");
//   next();
// };

const authLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 3,
  message: {
    statusCode: 429,
    errorMessage:
      "You are doing that too much. Please try again after one minute.",
  },
  skipSuccessfulRequests: true,
});

module.exports = {
  errorHandler,
  routeNotFoundHandler,
  authLimiter,
  // requestHandler,
};
