const express = require("express");
const UserModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwtGenerator = require("../utils/jwtGenerator");
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
    //chekc if useremail exitst
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already in use." });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = new UserModel({
      fullname,
      email,
      password: hashPassword,
      address,
      phone,
    });
    await newUser.save();
    const token = jwtGenerator(newUser._id);
    res.json({
      message: "Account created!",
      token,
      user: {
        id: newUser._id,
        fullname: newUser.fullname,
        email: newUser.email,
        address: newUser.address,
        phone: newUser.phone,
        role: newUser.role,
      },
    });
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
