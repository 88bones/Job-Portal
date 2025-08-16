const notificationModel = require("../models/notificationModel");

const getNotified = async (req, res) => {
  try {
    const userId = req.params.userId;
    console.log(userId);
    if (!userId) {
      return res.status(400).json({ error: "User not found" });
    }

    const result = await notificationModel
      .find({ userId })
      .sort({ createdAt: -1 });
    return res.status(200).json({ success: true, result });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

module.exports = { getNotified };
