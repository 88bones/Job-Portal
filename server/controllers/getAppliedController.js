const applicationModel = require("../models/applicationModel");

const getApplied = async (req, res) => {
  try {
    const userId = req.params.userId;
    const result = await applicationModel.find({ userId });
    res.json(result);
  } catch (err) {
    res.json(err);
  }
};

module.exports = { getApplied };
