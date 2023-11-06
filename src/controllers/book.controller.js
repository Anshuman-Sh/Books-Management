const { catchAsync } = require("../utils/universalFunction");
const bookServices = require("../services/book.services");
const { formatData } = require("../utils/formatResponse");
const { STATUS_CODES, SUCCESS_MESSAGES } = require("../config/appConstants");
const { successResponse } = require("../utils/Response");

const createBook = catchAsync(async (req, res) => {
  const book = await bookServices.createBook(req.token.user._id, req.body);
  return successResponse(
    req,
    res,
    STATUS_CODES.CREATED,
    SUCCESS_MESSAGES.CREATED,
    book
  );
});

const viewBooks = catchAsync(async (req, res) => {
  const books = await bookServices.viewBooks(req.token.user._id, req.query);

  const formatedBooks = await books.map((book) => {
    return formatData(book, req.headers.timezone);
  });

  return successResponse(
    req,
    res,
    STATUS_CODES.SUCCESS,
    SUCCESS_MESSAGES.SUCCESS,
    formatedBooks
  );
});

const viewBook = catchAsync(async (req, res) => {
  const book = await bookServices.viewBook(
    req.token.user._id,
    req.query.bookId
  );

  const formatedBook = await formatData(book, req.headers.timezone);
  return successResponse(
    req,
    res,
    STATUS_CODES.SUCCESS,
    SUCCESS_MESSAGES.SUCCESS,
    formatedBook
  );
});

const updateBook = catchAsync(async (req, res) => {
  await bookServices.updateBook(
    req.token.user._id,
    req.body
  );
  return successResponse(
    req,
    res,
    STATUS_CODES.SUCCESS,
    SUCCESS_MESSAGES.UPDATED
  );
});

const deleteBook = catchAsync(async (req, res) => {
  await bookServices.deleteBook(
    req.token.user._id,
    req.query.bookId
  );

  return successResponse(
    req,
    res,
    STATUS_CODES.SUCCESS,
    SUCCESS_MESSAGES.DELETED,
  );
});

module.exports = { createBook, viewBooks, viewBook, updateBook, deleteBook };
