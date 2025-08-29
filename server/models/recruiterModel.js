const mongoose = require("mongoose");

const recruiterSchema = new mongoose.Schema({
  companyname: {
    type: String,
    required: true,
  },
  industry: {
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
  phone: {
    type: String,
    required: true,
    unique: true,
  },
  address: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: "recruiter",
  },
  logo: {
    type: "String",
    default: "Uploads/recDefault.png",
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  otp: {
    type: String,
  },
});

const recruiterModel = mongoose.model("recruiter", recruiterSchema);
module.exports = recruiterModel;
