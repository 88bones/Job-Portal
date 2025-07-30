const applicationModel = require("../models/applicationModel");

const getApplied = async (req, res) => {
  try {
    const userId = req.params.userId;
    const result = await applicationModel.find({ userId }).populate({
      path: "jobId",
      select: "title address postedBy",
      populate: {
        path: "postedBy",
        select: "companyname email",
      },
    });
    res.json(result);
  } catch (err) {
    res.json(err);
  }
};

module.exports = { getApplied };
