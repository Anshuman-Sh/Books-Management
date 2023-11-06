const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
    title: { type: String },
    author: { type: String },
    summary: { type: String },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Book = mongoose.model("books", bookSchema);

module.exports = Book
