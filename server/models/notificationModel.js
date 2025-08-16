const mongoose = require("mongoose");

const notificationScheme = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  appId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "application",
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const notificationModel = mongoose.model("notification", notificationScheme);
module.exports = notificationModel;
