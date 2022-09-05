const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const userService = require('../services/userService');

// Internal Control: Not available via API
const verifyToken = (req, res) => {
    let token = req.headers["x-access-token"];
    if(!token) {
        return res.status(400).send({ status: "error", message: "There has been a problem validating your session token." });
    }

    if(!process.env.JWTSECRET) {
        return res.status(400).send({ status: "error", message: "You do not have an encryption hash setup. Please refer to our docs for more information" });
    }

    jwt.verify(token, process.env.JWTSECRET, (err, decoded) => {
        if(err) {
            return res.status(401).send({ status: "error", message: "You are not authorized for this" });
        }
        return true;
    });
}

// POST: /api/v1/user/sign-up
// Authentication: None (SetupStage === 3)
const signUp = (req, res) => {
    // 1. Check if in setup stage
    // 2. Validate details provided meet requirements
    // 3. Send details (encrypted) to service ready for the create date to be inserted and sent through to the db
    // 4. Insert to database
}

module.exports = {
    verifyToken,
    signUp
}