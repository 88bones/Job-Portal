const express = require("express");
const JobModel = require("../models/jobModel");

const router = express.Router();

router.post("/createJob", async (req, res) => {
  const job = req.body;
  const newJob = new JobModel(job);
  await newJob.save();
  res.json(newJob);
});

module.exports = router;
