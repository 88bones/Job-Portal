const applicationModel = require("../models/applicationModel");
const jobModel = require("../models/jobModel");

const getApplicants = async (req, res) => {
  try {
    const { companyId } = req.params;
    // console.log("Company ID from params:", companyId);

    const jobs = await jobModel.find({ postedBy: companyId }).select("_id");
    // console.log("jobs:", jobs);
    const jobIds = jobs.map((job) => job._id);

    const result = await applicationModel
      .find({ jobId: { $in: jobIds } })
      .populate({
        path: "userId",
        select: "fullname email address resume image",
      })
      .populate({ path: "jobId", select: "title logo" });

    res.json(result);
  } catch (err) {
    res.json(err);
    console.log(err);
  }
};

module.exports = { getApplicants };
