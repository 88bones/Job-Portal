const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
    unique: true,
  },
  resume: {
    type: String,
  },
  role: {
    type: String,
    default: "user",
  },
  skills: {
    type: [String],
    default: [],
  },
  image: {
    type: String,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  otp: {
    type: String,
  },
});

const UserModel = mongoose.model("user", userSchema);
module.exports = UserModel;
