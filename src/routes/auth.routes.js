const express = require("express");
const authControllers = require("../controllers/auth.controller");
const authValidations = require("../validations/auth.validations");
const { auth } = require("../middlewares/auth");
const { USER_TYPE } = require("../config/appConstants");
const { validate } = require("../middlewares/validate");
const router = express.Router();

router.post(
  "/signup",
  validate(authValidations.signupVal),
  authControllers.signup
);

router.post(
  "/login",
  validate(authValidations.loginVal),
  authControllers.login
);

router.put("/logout", auth(USER_TYPE.USER), authControllers.logout);

module.exports = router;
