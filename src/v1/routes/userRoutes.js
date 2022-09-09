const express = require("express");
const userController = require("../../controllers/userController");

const router = express.Router();

router.post("/sign-up", userController.signUp);
router.post("/sign-in", userController.signIn);
router.post("/test", userController.verifyToken);

module.exports = router;