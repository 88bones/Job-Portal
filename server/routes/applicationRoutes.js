const express = require("express");
const { getApplied } = require("../controllers/getAppliedController");
const { getApplicants } = require("../controllers/getApplicantsController");

const router = express.Router();

router.get("/appliedJobs/:userId", getApplied);
router.get("/applicants/:companyId", getApplicants);

module.exports = router;
