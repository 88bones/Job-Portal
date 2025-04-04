const express = require("express");
const RecruiterModel = require("../models/recruiterModel");

const router = express.Router();

router.get("/getRecruiters", async (req, res) => {
  try {
    const result = await RecruiterModel.find({});
    res.json(result);
  } catch (err) {
    res.json(err);
  }
});

router.post("/createRecruiter", async (req, res) => {
  const recruiter = req.body;
  const newRecruiter = new RecruiterModel(recruiter);
  await newRecruiter.save();
  res.json(recruiter);
});

module.exports = router;
