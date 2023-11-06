const express = require("express");
const { auth } = require("../middlewares/auth");
const bookController = require("../controllers/book.controller");
const bookValidation = require("../validations/book.validation");
const { validate } = require("../middlewares/validate");
const { USER_TYPE } = require("../config/appConstants");
const router = express.Router();

router.post(
  "/create",
  auth(USER_TYPE.USER),
  validate(bookValidation.createBookVal),
  bookController.createBook
);

router.get(
  "/viewBooks",
  auth(USER_TYPE.USER),
  validate(bookValidation.viewBooksVal),
  bookController.viewBooks
);

router.get(
  "/viewBook",
  auth(USER_TYPE.USER),
  validate(bookValidation.viewBookAndDeleteVal),
  bookController.viewBook
);

router.put(
  "/update",
  auth(USER_TYPE.USER),
  validate(bookValidation.updateBookVal),
  bookController.updateBook
);

router.delete(
  "/delete",
  auth(USER_TYPE.USER),
  validate(bookValidation.viewBookAndDeleteVal),
  bookController.deleteBook
);

module.exports = router;
