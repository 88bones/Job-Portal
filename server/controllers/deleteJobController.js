const jobModel = require("../models/jobModel");

const deleteJob = async (req, res) => {
  try {
    const jobId = req.params.id;
    const result = await jobModel.deleteOne({ _id: jobId });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Job not found!" });
    }

    res.status(200).json({ message: "Deleted!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { deleteJob };
