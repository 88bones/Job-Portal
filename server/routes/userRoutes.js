const express = require("express");
const UserModel = require("../models/userModel");
const jwtGenerator = require("../utils/jwtGenerator");
const { updateUser } = require("../controllers/updateController");
const { getData } = require("../controllers/getDataController");
const {
  getRecommendedJobs,
} = require("../controllers/getRecommendedJobController");
const upload = require("../middleware/multer");

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

router.get("/recommend/:userId", getRecommendedJobs);

module.exports = router;
