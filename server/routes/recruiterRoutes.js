const express = require("express");
const RecruiterModel = require("../models/recruiterModel");
const jwtGenerator = require("../utils/jwtGenerator");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");

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

    const otp = Math.floor(100000 + Math.random() * 900000);

    const newRecruiter = new RecruiterModel({
      companyname,
      industry,
      email,
      password: hashPassword,
      address,
      phone,
      isVerified: false,
      otp,
    });
    await newRecruiter.save();
    // transporter(Mailtrap sandbox for testing)
    const transporter = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 587,
      auth: {
        user: process.env.MAIL_TRAP_USER,
        pass: process.env.MAIL_TRAP_PASS,
      },
    });
    //send mail
    await transporter.sendMail({
      from: "no-reply@yourapp.com",
      to: email,
      subject: "Your OTP Code",
      text: `Your verification code is ${otp}`,
    });

    res.json({ message: "Check mail for OTP." });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
