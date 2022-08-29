const express = require("express");
const changelogController = require("../../controllers/changelogController");

const router = express.Router();

router.get("/", changelogController.getAllChangelogs);
router.get("/:changelogId", changelogController.getSpecificChangelog);

module.exports = router;