const { catchAsync } = require("../utils/universalFunction");
const authServices = require("../services/auth.services");
const tokenServices = require("../services/token.service");
const { successResponse } = require("../utils/Response");
const {
  STATUS_CODES,
  SUCCESS_MESSAGES,
  USER_TYPE,
} = require("../config/appConstants");

const signup = catchAsync(async (req, res) => {
  const user = await authServices.signup(req.body);
  const token = await tokenServices.generateAuthToken(user, USER_TYPE.USER);

  return successResponse(
    req,
    res,
    STATUS_CODES.CREATED,
    SUCCESS_MESSAGES.CREATED,
    { token: token, user: user }
  );
});

const login = catchAsync(async (req, res) => {
  const user = await authServices.login(req.body);
  const token = await tokenServices.generateAuthToken(user, USER_TYPE.USER);

  return successResponse(
    req,
    res,
    STATUS_CODES.SUCCESS,
    SUCCESS_MESSAGES.LOGIN_SUCCESS,
    { token: token }
  );
});

const logout = catchAsync(async (req, res) => {
  await authServices.logout(req.token._id);

  return successResponse(
    req,
    res,
    STATUS_CODES.SUCCESS,
    SUCCESS_MESSAGES.LOGOUT_SUCCESS
  );
});

module.exports = { signup, login, logout };
