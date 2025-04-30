const UserModel = require("../models/userModel");
const RecruiterModel = require("../models/recruiterModel");

const getData = async (req, res) => {
  try {
    const id = req.params.id;
    const role = req.params.role;

    let result;

    if (role === "user") {
      result = await UserModel.findById(id);
    } else if (role === "recruiter") {
      result = await RecruiterModel.findById(id);
    } else {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(result);
  } catch (err) {
    res.json(err);
  }
};

module.exports = { getData };
