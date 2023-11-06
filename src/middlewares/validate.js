const Joi = require("joi");
const { pick } = require("../utils/universalFunction");
const { ValidationError } = require("../utils/errors");
const config = require("../config/config");

const validate = (schema) => (req, res, next) => {
  const validSchema = pick(schema, ["params", "query", "body", "files"]);
  const object = pick(req, Object.keys(validSchema));
  const { value, error } = Joi.compile(validSchema)
    .prefs({ errors: { label: "key" } })
    .validate(object);

  if (error) {
    console.error(error);
    let errorMessage = error.details
      .map((details) => details.message)
      .join(", ")
      .replace(/"/g, "");

    //  return next(new ApiError("en", errorMessage));
    return next(new ValidationError(errorMessage));
  }
  Object.assign(req, value);
  return next();
};

const validateView = (schema) => (req, res, next) => {
  const validSchema = pick(schema, ["params", "query", "body", "files"]);
  const object = pick(req, Object.keys(validSchema));
  const { value, error } = Joi.compile(validSchema)
    .prefs({ errors: { label: "key" } })
    .validate(object);

  if (error) {
    // console.log(error, "..................error", "\n", value, "value.............");
    const errorMessage = error.details
      .map((details) => details.message)
      .join(", ");

    return res.render("commonMessage", {
      title: "Some thing went wrong",
      errorMessage,
      projectName: config.projectName,
    });
  }
  Object.assign(req, value);
  return next();
};

module.exports = {
  validate,
  validateView,
};
