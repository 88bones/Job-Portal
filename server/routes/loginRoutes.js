const express = require("express");
const UserModel = require("../models/userModel");

const router = express.Router();

router.post("/loginUsers", async (req, res) => {
  const { email, password } = req.body;
  try {
    UserModel.findOne({ email: email }).then((user) => {
      if (!user) {
        return res.json.status(404).json("No record exists");
      }

      if (user.password === password) {
        return res.status(200).json("Success");
      } else {
        return res.status(400).json("The credentials are incorrect");
      }
    });
  } catch (err) {
    res.status(500).json("Internal Server error");
  }
});

module.exports = router;
