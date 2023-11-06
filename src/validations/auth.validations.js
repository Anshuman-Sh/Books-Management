const Joi = require("joi");
const { JOI } = require("../config/appConstants");

exports.signupVal = {
  body: Joi.object().keys({
    firstName: Joi.string().required(),
    email: JOI.EMAIL,
    password: JOI.PASSWORD,
  }),
};

exports.loginVal = {
  body: Joi.object().keys({
    email: JOI.EMAIL,
    password: JOI.PASSWORD,
  }),
};
