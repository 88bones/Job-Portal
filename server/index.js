const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const UserModel = require("./models/userModel");

const app = express();
app.use(express.json());
app.use(cors());

mongoose
  .connect("mongodb://localhost:27017/job-portal")
  .then(() => console.log("connected"))
  .catch((error) => console.error("Failed: ", error));

app.get("/getUsers", (req, res) => {
  UserModel.find({}, (err, result) => {
    if (err) {
      res.json(err);
    } else {
      res.json(result);
    }
  });
});

app.post("/createUser", async (req, res) => {
  const user = req.body;
  const newUser = new UserModel(user);
  await newUser.save();

  res.json(user);
});

app.listen(3001, () => {
  console.log("app is running ");
});
