const express = require("express");
const UserModel = require("../models/userModel");
const jwtGenerator = require("../utils/jwtGenerator");

const router = express.Router();

router.post("/loginUsers", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.password === password) {
      const token = jwtGenerator(user._id);
      return res.status(200).json({
        message: "Success",
        user: {
          fullname: user.fullname,
          email: user.email,
          role: user.role,
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
