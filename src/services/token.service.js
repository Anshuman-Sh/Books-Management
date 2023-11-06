const jwt = require("jsonwebtoken");
const moment = require("moment");
const {
  TOKEN_TYPE,
  USER_TYPE,
} = require("../config/appConstants");
const { Token } = require("../models/index");
const config = require("../config/config");

const ObjectId = require("mongodb").ObjectId;

const generateToken = (data, secret = config.jwt.secret) => {
  const payload = {
    exp: data.tokenExpires.unix(),
    type: data.tokenType,
    id: data.tokenId,
    role: data.userType,
  };
  return jwt.sign(payload, secret);
};

const saveToken = async (data) => {
  const dataToBeSaved = {
    expires: data.tokenExpires.toDate(),
    type: data.tokenType,
    _id: data.tokenId,

    role: data.userType,
    token: data.token,
  };

  if (data.device) {
    dataToBeSaved.device = { type: data.deviceType, token: data.deviceToken };
  }

  if (data.userType === USER_TYPE.ADMIN) {
    dataToBeSaved.admin = data.user._id;
  }
  if (data.userType == USER_TYPE.USER) {
    dataToBeSaved.user = data.user._id;
  }

  const tokenDoc = await Token.create(dataToBeSaved);

  return tokenDoc;
};

const generateAuthToken = async (
  user,
  userType,
  // deviceToken,
  // deviceType,
) => {
  const tokenExpires = moment().add(config.jwt.accessExpirationMinutes, "days");
  var tokenId = new ObjectId();

  const accessToken = generateToken({
    tokenExpires,
    tokenType: TOKEN_TYPE.ACCESS,
    userType,
    tokenId,
  });

  await saveToken({
    token: accessToken,
    tokenExpires,
    tokenId,
    // deviceToken,
    // deviceType,
    tokenType: TOKEN_TYPE.ACCESS,
    userType,
    user,
  });

  return {
    token: accessToken,
    expires: tokenExpires.toDate(),
  };
};

module.exports = {
  generateAuthToken,
};
