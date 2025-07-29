const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  jobId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "jobs",
    required: true,
  },
  appliedAt: {
    type: Date,
    default: Date.now,
  },
});

const applicationModel = mongoose.model("application", applicationSchema);
module.exports = applicationModel;
