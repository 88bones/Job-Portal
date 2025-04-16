const express = require("express");
const UserModel = require("../models/userModel");
const jwtGenerator = require("../utils/jwtGenerator");

const router = express.Router();

router.post("/createUser", async (req, res) => {
  const user = req.body;
  const newUser = new UserModel(user);
  await newUser.save();
  const token = jwtGenerator(newUser._id);
  res.json({ user, token });
});

router.get("/getUsers", async (req, res) => {
  try {
    const result = await UserModel.find({});
    res.json(result);
  } catch (err) {
    res.json(err);
  }
});

module.exports = router;
