const express = require("express");
const UserModel = require("../models/userModel");

const router = express.Router();

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  UserModel.findOne({ email: email }).then((user) => {
    if (user) {
      if (user.password === password) {
        res.json("Success");
      } else {
        res.json("The credentials are incorrect");
      }
    } else {
      res.json("No record exist.");
    }
  });
});
