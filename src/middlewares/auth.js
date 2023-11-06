const passport = require("passport");
const { AuthFailedError, NotFoundError } = require("../utils/errors");
const { STATUS_CODES, ERROR_MESSAGES } = require("../config/appConstants");

const verifyCallBack =
  (req, resolve, reject, role) => async (err, token, info) => {

    // console.log(token, "TokenDocument.........................");
    // console.log(info, "info.........................");

    if(info){
      return reject(
        new AuthFailedError(
          STATUS_CODES.AUTH_FAILED,
          ERROR_MESSAGES.AUTHENTICATION_FAILED
        )
      );
    }

    if (err || !token) {
      return reject(
        new AuthFailedError(
          STATUS_CODES.AUTH_FAILED,
          ERROR_MESSAGES.TOKEN_EXPIRES
        )
      );
    }

    if (role && token.role != role) {
      return reject(
        new AuthFailedError(
          STATUS_CODES.AUTH_FAILED,
          ERROR_MESSAGES.AUTHENTICATION_FAILED
        )
      );
    }

    req.token = token;
    return resolve();
  };

const auth = (role) => async (req, res, next) => {
  return new Promise(async (resolve, reject) => {
    await passport.authenticate(
      "jwt",
      { session: false },
      verifyCallBack(req, resolve, reject, role)
    )(req, res, next);
  })
    .then(() => next())
    .catch((err) => next(err));
};

module.exports = { auth };
