const notificationModel = require("../models/notificationModel");
const applicationModel = require("../models/applicationModel");

const notifyStatus = async (req, res) => {
  try {
    const { appId } = req.params;
    const { status } = req.body;

    const application = await applicationModel.findById(appId).populate({
      path: "jobId",
      select: "title postedBy",
      populate: {
        path: "postedBy",
        select: "companyname",
      },
    });
    // console.log(application);
    if (!application) {
      return res.status(400).json({ error: "Application not found" });
    }

    application.status = status;
    await application.save();

    // Create notification
    let message = "";
    if (status === "shortlisted") {
      message = `Congrats! You have been shortlisted for role of "${application.jobId.title} at ${application.jobId.postedBy?.companyname}".`;
    } else if (status === "rejected") {
      message = `Sorry, your application for "${application.jobId.title}" was rejected.`;
    } else {
      message = `Your application for "${application.jobId.title}" is under review.`;
    }

    const newNotification = new notificationModel({
      userId: application.userId,
      appId: application._id,
      message,
    });
    await newNotification.save();
    res.json({ success: true, application });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { notifyStatus };
