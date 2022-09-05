const express = require("express");
const notificationController = require("../../controllers/notificationController");

const router = express.Router();

router.post("/", notificationController.postNotification);
router.get("/", notificationController.getNotifications);
router.delete("/", notificationController.dismissNotification);

module.exports = router;