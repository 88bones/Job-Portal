const JobModel = require("../models/jobModel");

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

module.exports = { getJob };
