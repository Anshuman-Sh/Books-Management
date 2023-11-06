const Joi = require("joi");
const { JOI } = require("../config/appConstants");

exports.createBookVal = {
  body: Joi.object().keys({
    title: Joi.string().required(),
    author: Joi.string().required(),
    summary: Joi.string().required(),
  }),
};

exports.viewBooksVal = {
  query: Joi.object().keys({
    page: JOI.PAGE,
    limit: JOI.LIMIT,
  }),
};

exports.viewBookAndDeleteVal = {
  query: Joi.object().keys({
    bookId: JOI.OBJECTID,
  }),
};

exports.updateBookVal = {
  body: Joi.object().keys({
    bookId: JOI.OBJECTID,
    title: Joi.string(),
    author: Joi.string(),
    summary: Joi.string(),
  }),
};
