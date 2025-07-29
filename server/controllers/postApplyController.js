const applicationModel = require("../models/applicationModel");

const jobApply = async (req, res) => {
  try {
    const { userId } = req.body;
    const jobId = req.params.jobId;

    if (!userId || !jobId) {
      res.status(400).json({ message: "UserId and JobId are required." });
    }

    const alreadyApplied = await applicationModel.findOne({
      userId,
      jobId,
    });

    if (alreadyApplied) {
      return res
        .status(400)
        .json({ message: "You have already applied for this job!" });
    }

    const newApplication = new applicationModel({ userId, jobId });
    await newApplication.save();

    res.status(200).json({ message: "Applied successfully!" });
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

module.exports = { jobApply };
