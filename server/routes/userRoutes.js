const express = require("express");
const UserModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const { updateUser } = require("../controllers/updateController");
const { getData } = require("../controllers/getDataController");
const {
  getRecommendedJobs,
} = require("../controllers/getRecommendedJobController");
const upload = require("../middleware/multer");
const { deleteUser } = require("../controllers/deleteUserController");

const router = express.Router();

router.post("/createUser", async (req, res) => {
  try {
    const { fullname, email, password, address, phone } = req.body;
    //chekc if email exist
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already in use." });
    }
    //hash passowrd
    const hashPassword = await bcrypt.hash(password, 10);

    //generate otp of 6 digit
    const otp = Math.floor(100000 + Math.random() * 900000);

    //unverified user
    const newUser = new UserModel({
      fullname,
      email,
      password: hashPassword,
      address,
      phone,
      isVerified: false,
      otp,
    });
    await newUser.save();

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

router.get("/getUsers", async (req, res) => {
  try {
    const result = await UserModel.find({});
    res.json(result);
  } catch (err) {
    res.json(err);
  }
});

router.get("/getUser/:id/:role", getData);

router.put(
  "/updateUser/:id/:role",
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "resume", maxCount: 1 },
    { name: "logo", maxCount: 1 },
  ]),
  updateUser
);

router.delete("/deleteUser/:id/:role", deleteUser);
router.get("/recommend/:userId", getRecommendedJobs);

module.exports = router;
