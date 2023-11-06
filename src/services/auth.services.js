const { STATUS_CODES, ERROR_MESSAGES } = require("../config/appConstants");
const { User, Token } = require("../models/index");
const { AuthFailedError } = require("../utils/errors");

const signup = async (body) => {
  if (await User.findOne({ email: body.email })) {
    throw new AuthFailedError(
      STATUS_CODES.AUTH_FAILED,
      ERROR_MESSAGES.EMAIL_ALREADY_EXIST
    );
  }

  return User.create({
    firstName: body.firstName,
    email: body.email,
    password: body.password,
  });
};

const login = async (body) => {
  const userDoc = await User.findOne({ email: body.email });

  if (!userDoc) {
    throw new AuthFailedError(
      STATUS_CODES.AUTH_FAILED,
      ERROR_MESSAGES.USER_NOT_FOUND
    );
  }

  if (!(await userDoc.isPasswordMatch(body.password))) {
    throw new OperationalError(
      STATUS_CODES.ACTION_FAILED,
      ERROR_MESSAGES.WRONG_PASSWORD
    );
  }

  return userDoc;
};

const logout = async (tokenId) => {
  return Token.updateOne({ _id: tokenId }, { isDeleted: true });
};

module.exports = { signup, login, logout };
