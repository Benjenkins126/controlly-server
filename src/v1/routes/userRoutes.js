const express = require("express");
const userController = require("../../controllers/userController");

const router = express.Router();

router.post("/sign-up", userController.signUp);

module.exports = router;