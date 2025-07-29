const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  salary: {
    type: String,
    required: true,
    default: "negotiable",
  },
  description: {
    type: String,
    required: true,
  },
  openings: {
    type: String,
  },
  experience: {
    type: String,
    require: true,
  },
  address: {
    type: String,
  },
  level: {
    type: String,
    required: true,
  },
  emptype: {
    type: String,
    required: true,
  },
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "recruiter",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  expiryDate: {
    type: Date,
    required: true,
  },
});

const JobModel = mongoose.model("job", jobSchema);
module.exports = JobModel;
