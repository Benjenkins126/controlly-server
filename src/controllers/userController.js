const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const userService = require('../services/userService');
const setupService = require('../services/setupService');

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
    const body = req.query;
    const currentStageId = setupService.getSetupStep();
    
    if(parseInt(currentStageId) !== 3) {
        return res.status(400).send({ status: "error", message: "You are currently in the incorrect setup stage to be creating a user." });
    }

    if(!body.email_address || !body.username || !body.password) {
        return res.status(400).send({ status: "error", message: "The fields 'email_address', 'username' or 'password' are not present" });
    }

    if(body.email_address.length < 2 || !String(body.email_address).toLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
        return res.status(400).send({ status: "error", message: "Your email address is not valid" });
    }

    if(body.username.length < 3 || body.username.length > 16) {
        return res.status(400).send({ status: "error", message: "The username length must be between 3-16 characters in length." });
    }

    if(body.password.length < 8 || body.username.length > 64) {
        return res.status(400).send({ status: "error", message: "The password length must be between 8-64 characters in length."});
    }

    if(!/\d/.test(body.password)) {
        return res.status(400).send({ status: "error", message: "The password must contain at least 1 number" });
    }

    if(!/[A-Z]/.test(body.password) || !/[a-z]/.test(body.password)) {
        return res.status(400).send({ status: "error", message: "The password must contain both uppercase and lowercase characters" });
    }

    if(userService.signUp(body.email_address, body.username, bcrypt.hashSync(body.password, 8))) {
        res.status(200).send({ status: "success", message: "Your account has been created successfully" });
    } else {
        res.status(500).send({ status: "error", message: "There has been an error setting up the administrator. Please check your Controlly Log for information"});
    }
}

module.exports = {
    verifyToken,
    signUp
}