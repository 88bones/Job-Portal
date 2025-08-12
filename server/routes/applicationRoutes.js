const express = require("express");
const { getApplied } = require("../controllers/getAppliedController");
const { getApplicants } = require("../controllers/getApplicantsController");
const { putStatus } = require("../controllers/putStatusController");

const router = express.Router();

router.get("/appliedJobs/:userId", getApplied);
router.get("/applicants/:companyId", getApplicants);
router.put("/:appId/status", putStatus);

module.exports = router;
