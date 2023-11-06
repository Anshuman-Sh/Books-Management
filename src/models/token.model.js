const mongoose = require("mongoose");
const { USER_TYPE, TOKEN_TYPE } = require("../config/appConstants");

const tokenSchema = new mongoose.Schema(
  {
    token: { type: String, unique: true, required: true },
    admin: { type: mongoose.Schema.Types.ObjectId, ref: "admins" },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
    role: { type: String, enum: [...Object.values(USER_TYPE)] },
    type: { type: String, enum: [...Object.values(TOKEN_TYPE)] },
    expires: { type: Date, required: true },
    isDeleted: { type: Boolean, default: false },
    blacklisted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Token = mongoose.model("tokens", tokenSchema);

module.exports = Token
