const express = require("express");
const RecruiterModel = require("../models/recruiterModel");
const jwtGenerator = require("../utils/jwtGenerator");

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
  const token = jwtGenerator(newRecruiter._id);
  res.json({ recruiter, token });
});

module.exports = router;
