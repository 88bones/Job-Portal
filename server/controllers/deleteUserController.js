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
      // Delete the user
      const result = await userModel.deleteOne({ _id: id });

      const userJobs = await jobModel.find({ postedBy: id }).select("_id");
      const jobIds = userJobs.map((job) => job._id);

      if (jobIds.length > 0) {
        await applicationModel.deleteMany({ jobId: { $in: jobIds } });
      }
    }

    if (role === "recruiter") {
      // Delete the recruiter
      const result = await recruiterModel.deleteOne({ _id: id });

      const jobs = await jobModel.find({ postedBy: id }).select("_id");
      const jobIds = jobs.map((job) => job._id);

      await jobModel.deleteMany({ postedBy: id });

      if (jobIds.length > 0) {
        await applicationModel.deleteMany({ jobId: { $in: jobIds } });
      }
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
