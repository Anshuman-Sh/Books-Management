const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    firstName: { type: String },
    email: { type: String },
    password: { type: String },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

userSchema.methods.isPasswordMatch = async function (password) {
  const user = this;
  return bcrypt.compare(password, user.password);
};

userSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});


const User = mongoose.model("users", userSchema);

module.exports = User
