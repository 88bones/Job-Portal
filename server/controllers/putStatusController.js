const applicationModel = require("../models/applicationModel");

const putStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const { appId } = req.params;

    const updated = await applicationModel.findByIdAndUpdate(
      appId,
      { status },
      {
        new: true,
      }
    );
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

module.exports = { putStatus };
