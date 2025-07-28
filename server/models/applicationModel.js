const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    fullname: String,
    required: true,
  },
  job: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "job",
    title: String,
    required: true,
  },
  appliedAt: {
    type: Date,
    default: Date.now,
  },
});

const applicationModel = mongoose.model("application", applicationSchema);
module.exports = applicationModel;
