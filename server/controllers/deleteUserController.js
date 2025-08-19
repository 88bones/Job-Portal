const userModel = require("../models/userModel");
const applicationModel = require("../models/applicationModel");
const notificationModel = require("../models/notificationModel");
const recruiterModel = require("../models/recruiterModel");
const jobModel = require("../models/jobModel");

const deleteUser = async (req, res) => {
  try {
    const { id, role } = req.params;

    let result;
    if (role === "user") {
      result = await userModel.deleteOne({ _id: id });
      await applicationModel.deleteMany({ _id: id });
    }

    if (role === "recruiter") {
      result = await recruiterModel.deleteOne({ _id: id });
      await jobModel.deleteMany({ _id: id });
    }

    if (result.deletedCount === 0) {
      return res.status(400).json({ message: "User not found" });
    }

    return res.status(200).json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { deleteUser };
