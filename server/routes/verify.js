const express = require("express");
const router = express.Router();
const { verifyOtp } = require("../controllers/verifyOtpController");

router.post("/", verifyOtp);

module.exports = router;
