const express = require("express");
const { getApplied } = require("../controllers/getAppliedController");

const router = express.Router();

router.get("/appliedJobs/:userId", getApplied);

module.exports = router;
