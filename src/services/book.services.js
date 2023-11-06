const { STATUS_CODES, ERROR_MESSAGES } = require("../config/appConstants");
const { Book } = require("../models/index");
const { NotFoundError } = require("../utils/errors");
const { paginationOptions } = require("../utils/universalFunction");

const createBook = async (userId, body) => {
  const data = {
    user: userId,
    title: body.title,
    author: body.author,
    summary: body.summary,
  };

  return Book.create(data);
};

const viewBooks = async (userId, query) => {
  const books = await Book.find(
    { user: userId, isDeleted: false },
    {},
    paginationOptions(query.page, query.limit)
  );
  return books
};

const viewBook = async (userId, bookId) => {
  const book = await Book.findOne({
    _id: bookId,
    user: userId,
    isDeleted: false,
  });

  if (!book) {
    throw new NotFoundError(
      STATUS_CODES.NOT_FOUND,
      ERROR_MESSAGES.BOOK_NOT_FOUND
    );
  }

  return book;
};

const updateBook = async (userId, body) => {
  const book = await Book.findOne({
    _id: body.bookId,
    user: userId,
    isDeleted: false,
  });

  if (!book) {
    throw new NotFoundError(
      STATUS_CODES.NOT_FOUND,
      ERROR_MESSAGES.BOOK_NOT_FOUND
    );
  }

  const dataToBeUpdated = {
    user: userId,
    title: body.title,
    author: body.author,
    summary: body.summary,
  };

  return Book.updateOne({ _id: book._id }, { $set: dataToBeUpdated });
};

const deleteBook = async (userId, bookId) => {
  const book = await Book.findOne({
    _id: bookId,
    user: userId,
    isDeleted: false,
  });

  if (!book) {
    throw new NotFoundError(
      STATUS_CODES.NOT_FOUND,
      ERROR_MESSAGES.BOOK_NOT_FOUND
    );
  }

  return Book.updateOne({ _id: book._id }, { $set: { isDeleted: true } });
};

module.exports = { createBook, viewBooks, viewBook, updateBook, deleteBook };
