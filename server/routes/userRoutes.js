const express = require("express");
const UserModel = require("../models/userModel");
const jwtGenerator = require("../utils/jwtGenerator");
const { updateUser } = require("../controllers/updateController");

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

router.get("/getUser/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    const result = await UserModel.findById(userId);

    if (!result) {
      return res.status(404).json({ message: "user not found" });
    }

    res.json(result);
  } catch (err) {
    res.json(err);
  }
});

router.put("/updateUser/:id", updateUser);

// router.put("/updateUser/:id", async (req, res) => {
//   try {
//     const userId = req.params.id;
//     const updatedData = req.body;

//     const updatedUser = await UserModel.findByIdAndUpdate(userId, updatedData, {
//       new: true,
//     });
//     res.json(updatedUser);
//   } catch (err) {
//     res.json(err);
//   }
// });

module.exports = router;
