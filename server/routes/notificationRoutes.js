const express = require("express");
const { notifyStatus } = require("../controllers/postNotificationController");
const { getNotified } = require("../controllers/getNotificationController");

const router = express.Router();

router.post("/notify/:appId", notifyStatus);
router.get("/:userId", getNotified);

module.exports = router;
