const express = require("express");
const setupController = require("../../controllers/setupController");

const router = express.Router();

router.get("/step", setupController.getSetupStep);
router.post("/step", setupController.setSetupStep);
// router.get("/health-check", setupController.runSystemsHealthCheck);
router.post("/core", setupController.setCoreInformation);

module.exports = router;