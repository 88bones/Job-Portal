const express = require("express");
const RecruiterModel = require("../models/recruiterModel");
const jwtGenerator = require("../utils/jwtGenerator");
const bcrypt = require("bcrypt");
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
  try {
    const { companyname, industry, email, password, phone, address } = req.body;

    const existingUser = await RecruiterModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already in use." });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const newRecruiter = new RecruiterModel({
      companyname,
      industry,
      email,
      password: hashPassword,
      address,
      phone,
    });
    await newRecruiter.save();
    const token = jwtGenerator(newRecruiter._id);
    res.json({
      message: "Account Created.",
      token,
      recruiter: {
        companyname: newRecruiter.companyname,
        industry: newRecruiter.industry,
        email: newRecruiter.email,
        address: newRecruiter.address,
        phone: newRecruiter.phone,
        role: newRecruiter.role,
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
