const UserModel = require("../models/userModel");
const RecruiterModel = require("../models/recruiterModel");

const updateUser = async (req, res) => {
  try {
    const id = req.params.id;
    const role = req.params.role;
    const updatedData = req.body;

    let result;

    if (role === "user") {
      result = await UserModel.findByIdAndUpdate(id, updatedData, {
        new: true,
      });
    } else if (role === "admin") {
      result = await RecruiterModel.findByIdAndUpdate(id, updatedData, {
        new: true,
      });
    } else {
      return res.status(400).json({ message: "User not found" });
    }
    res.json({ message: "Update success", data: result });
  } catch (err) {
    res.json(err);
  }
};

module.exports = { updateUser };
