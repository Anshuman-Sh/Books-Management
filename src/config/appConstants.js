const Joi = require("joi");
const { objectId } = require("../validations/custom.validation");

const JOI = {
  EMAIL: Joi.string().email().lowercase().trim().required(),
  PASSWORD: Joi.string().min(6).required(),
  OBJECTID: Joi.string().custom(objectId).required(),
  PAGE: Joi.number().default(0),
  LIMIT: Joi.number()
}

const USER_TYPE = {
  USER: "user",
};

const STATUS_CODES = {
  SUCCESS: 200,
  CREATED: 201,
  ACTION_PENDING: 202,
  ACTION_COMPLETE: 204,

  VALIDATION_FAILED: 400,
  ACTION_FAILED: 400,
  AUTH_FAILED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  UNPROCESSABLE: 422,
  TOO_MANY_REQUESTS: 429,

  ERROR: 500,
  BAD_GATEWAY: 502,
  SERVICE_UNAVAIABLE: 503,
  GATEWAY_TIMEOUT: 504,
};

const SUCCESS_MESSAGES = {
  CREATED: "Created successfully",
  LOGIN_SUCCESS: "Successfully logged In",
  LOGOUT_SUCCESS: "Successfully logged Out",
  AUTHENTICATED: "Authenticated user",
  AUTH_FAILED: "Authentication failed, please enter valid credentails",
  DELETED: "Deleted successfully",
  UPDATED: "Updated successfully",
  SUCCESS: "Success",
};

const DATE_FORMAT = "YYYY-MM-DD";

const ERROR_MESSAGES = {
  BOOK_NOT_FOUND: "Book not found",
  TOKEN_EXPIRES: "Token expired",
  NOT_FOUND: "Not found",
  ROUTE_NOT_FOUND: "Incorrect route",
  EMAIL_ALREADY_EXIST: "Please try with other email, already in use",
  VALIDATION_FAILED: "Validation Failed, Kindly check your parameters",
  SERVER_ERROR: "Something went wrong, Please try again.",
  AUTHENTICATION_FAILED: "Please authenticate",
  UNAUTHORIZED: "You are not authorized to perform this action",
  ACCOUNT_NOT_EXIST: "Account does not exist",
  WRONG_PASSWORD: "Password is Incorrect",
  ACCOUNT_DELETED: "Your account has been deleted by Admin",
  ACCOUNT_BLOCKED: "Your account has been blocked by Admin",
  USER_NOT_FOUND: "User not found",
};

const TOKEN_TYPE = {
  ACCESS: "Access",
};

const DEVICE_TYPE = {
  IPHONE: "IPhone",
  ANDROID: "Android",
  WEB: "Web",
};

module.exports = {
  DATE_FORMAT,
  DEVICE_TYPE,
  TOKEN_TYPE,
  ERROR_MESSAGES,
  SUCCESS_MESSAGES,
  STATUS_CODES,
  USER_TYPE,
  JOI
};
