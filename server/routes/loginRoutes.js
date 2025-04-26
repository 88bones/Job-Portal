const express = require("express");
const UserModel = require("../models/userModel");
const RecruiterModel = require("../models/recruiterModel");
const jwtGenerator = require("../utils/jwtGenerator");

const router = express.Router();

router.post("/loginUsers", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await UserModel.findOne({ email });
    const recruiter = await RecruiterModel.findOne({ email });

    if (!user && !recruiter) {
      return res.status(404).json({ message: "User not found" });
    }

    const account = user || recruiter;

    if (account.password === password) {
      const token = jwtGenerator(account._id);
      return res.status(200).json({
        message: "Success",
        user: {
          _id: account._id,
          fullname: user ? user.fullname : recruiter.companyname,
          email: account.email,
          role: account.role,
          address: account.address,
          phone: account.phone,
        },
        token,
      });
    } else {
      return res.status(400).json({ message: "Invalid credentials" });
    }
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
