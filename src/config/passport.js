const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const { Token } = require("../models/index");
const config = require("../config/config")

const jwtOptions = {
  secretOrKey: config.jwt.secret,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};

const jwtverify = async (payload, next) => {
  
  // console.log(payload, "Payload");

  const profile = await Token.findOne({
    _id: payload.id,
    isDeleted: false,
  }).populate({path: payload.role}).lean();
  // console.log(profile, "Details.................");

  const func = (profile, error) => {
    if (error) {
      return error;
    } else {
      return next(null, profile);
    }
  };
  func(profile);
};

const jwtStrategy = new JwtStrategy(jwtOptions, jwtverify);

module.exports = {
  jwtStrategy,
};
