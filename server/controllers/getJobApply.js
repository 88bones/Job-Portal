const JobModel = require("../models/jobModel");

const getJobApply = async (req, res) => {
  try {
    const jobId = req.params.id;
    result = await JobModel.findOne(jobId);
    res.json(result);
  } catch (err) {
    res.json(err);
  }
};

module.exports = { getJobApply };
