const JobModel = require("../models/jobModel");
const RecruiterModel = require("../models/recruiterModel");

const getJob = async (req, res) => {
  try {
    const userId = req.params.id;
    const result = await JobModel.find({ postedBy: userId }).sort({
      createdAt: -1,
    });
    return res.json(result);
  } catch (err) {
    res.json(err);
  }
};

const searchJob = async (req, res) => {
  try {
    const { title } = req.params;
    const jobs = await JobModel.find({
      title: { $regex: title, $options: "i" },
    }).populate("postedBy", "companyname industry logo");
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { getJob, searchJob };
