const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 50,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    minLength: 3,
    maxLength: 255,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    minLength: 6,
    maxLength: 255,
  },
});

userSchema.plugin(uniqueValidator);
const User = mongoose.model("User", userSchema);
exports.User = User;
