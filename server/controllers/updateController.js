const UserModel = require("../models/userModel");
const RecruiterModel = require("../models/recruiterModel");

const updateUser = async (req, res) => {
  try {
    const id = req.params.id;
    const role = req.params.role;
    const updatedData = req.body;

    if (typeof req.body.skills === "string") {
      req.body.skills = JSON.parse(req.body.skills);
    }

    if (req.files?.image) {
      updatedData.image = req.files.image[0].filename;
    }
    if (req.files?.resume) {
      updatedData.resume = req.files.resume[0].filename;
    }
    if (req.files?.logo) {
      updatedData.logo = req.files.logo[0].filename;
    }

    let result;

    if (role === "user") {
      result = await UserModel.findByIdAndUpdate(id, updatedData, {
        new: true,
      });
    } else if (role === "recruiter") {
      result = await RecruiterModel.findByIdAndUpdate(id, updatedData, {
        new: true,
      });
    } else {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ message: "Update success", data: result });
  } catch (err) {
    res.json(err);
  }
};

module.exports = { updateUser };
