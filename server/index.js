const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
// const UserModel = require("./models/userModel");
// const RecruiterModel = require("./models/recruiterModel");
const userRoutes = require("./routes/userRoutes");
const recruiterRoutes = require("./routes/recruiterRoutes");

const app = express();
app.use(express.json());
app.use(cors());

mongoose
  .connect("mongodb://localhost:27017/job-portal")
  .then(() => console.log("connected"))
  .catch((error) => console.error("Failed: ", error));

//get users
// app.get("/getUsers", async (req, res) => {
//   try {
//     const result = await UserModel.find({});
//     res.json(result);
//   } catch (err) {
//     res.json(err);
//   }
// });

// //create users
// app.post("/createUser", async (req, res) => {
//   const user = req.body;
//   const newUser = new UserModel(user);
//   await newUser.save();

//   res.json(user);
// });

// //create recruiters
// app.post("/createRecruiter", async (req, res) => {
//   const recruiter = req.body;
//   const newRecruiter = new RecruiterModel(recruiter);
//   await newRecruiter.save();

//   res.json(recruiter);
// });

// //get Recruiters
// app.get("/getRecruiters", async (req, res) => {
//   try {
//     const result = await RecruiterModel.find({});
//     res.json(result);
//   } catch (err) {
//     res.json(err);
//   }
// });

app.use("/api/users", userRoutes);
app.user("/api/recruiters", recruiterRoutes);

app.listen(3001, () => {
  console.log("app is running ");
});
