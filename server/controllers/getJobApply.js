const JobModel = require("../models/jobModel");

const getJobApply = async (req, res) => {
  try {
    const _id = req.params;
    const result = await JobModel.findById(_id);
    if (!result) {
      return res.status(404).json({ message: "Job not found" });
    }
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { getJobApply };
