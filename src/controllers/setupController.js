const setupService = require("../services/setupService");
const timezones = require("timezones-list");

// GET: /api/v1/setup/step
// Authentication: None
const getSetupStep = (req, res) => {
    const setupStep = parseInt(setupService.getSetupStep());
    if(setupStep === null || (setupStep !== 1 && setupStep !== 2 && setupStep !== 3 && setupStep !== 0)) {
        res.status(500).send({ status: "error", message: "There has been an error getting the setup stage. Please check your Controlly Log for information" })
    }
    res.status(200).send({ status: "success", stage: setupStep });
}

// POST: /api/v1/setup/step
// Authentication: None (SetupStage !== 0)
const setSetupStep = (req, res) => {
    const body = req.query;
    const stageId = parseInt(body.stage);
    const currentStageId = setupService.getSetupStep();

    // Check to ensure there is a stage parameter present, and it matches the validation
    if(stageId !== 1 && stageId !== 2 && stageId !== 3 && stageId !== 0) {
        res.status(400).send({ status: "error", message: "The parameter 'stage' is missing or does not match the list of possible values" });
    } else if(parseInt(currentStageId) === 0) {
        res.status(400).send({ status: "error", message: "Your setup details have been locked due to the setup being marked as complete" });
    } else {
        const setupStage = setupService.setSetupStep(stageId);
        if(setupStage) {
            res.status(200).send({ status: "success", message: "The setup stage has been updated successfully" });
        } else {
            res.status(500).send({ status: "error", message: "There has been an error setting the setup stage. Please check your Controlly Log for information" });
        }
    }
}

// GET: /api/v1/setup/health-check
// Authentication: None (Setup Stage !== 0)
// const runSystemsHealthCheck = (req, res) => {
//     return false;
// }

// POST: /api/v1/setup/core
// Authentication: Noner (Setup Stage !== 0)
const setCoreInformation = (req, res) => {
    const body = req.query;
    const currentStageId = setupService.getSetupStep();
    
    if(body.homeName && body.homeTimezone) {
        let homeName = body.homeName;
        const homeTimezone = body.homeTimezone;
        const homeDomain = body.homeDomain ? body.homeDomain : "";
        const specialCharsRegex = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;

        if(parseInt(currentStageId) !== 0) {
            // Home Name Validation: (Min 2 characters, Max 50 characters, No special characters)
            if(homeName.trim().length <= 1 || homeName.trim().length > 50) {
                return res.status(400).send({ status: "error", message: "The home name must be between 2-50 characters in length" });
            }
            homeName = homeName.replace(/[^a-zA-Z]/g, "");

            // Home Timezone Validation: (Value must be present in the timezone list)
            const found = timezones['default'].some(el => el.utc === homeTimezone);
            if(!found) {
                return res.status(400).send({ status: "error", message: "The timezone provided is not a valid UTC timezone" });
            }

            // Home Domain Validation: (Between 4 - 12 characters, No Special Characters, Cannot already be in use. Must be more than 3 characters)
            // In Use Validation Coming Soon
            if(homeDomain !== "" && (homeDomain.length < 4 || homeDomain.length > 12)) {
                return res.status(400).send({ status: "error", message: "The home domain must be between 4-12 characters in length" });
            }
            if(homeDomain !== "" && specialCharsRegex.test(homeDomain)) {
                return res.status(400).send({ status: "error", message: "The home domain must not contain any special characters" });
            }

            // If validation is passed, send data to the Setup Service
            if(setupService.setCoreInformation(homeName, homeDomain, homeTimezone)) {
                res.status(200).send({ status: "success", message: "The core details have been updated successfully" });
            } else {
                res.status(500).send({ status: "error", message: "There has been an error setting the core details. Please check your Controlly Log for information" });
            }

        } else {
            return res.status(400).send({ status: "error", message: "Your setup details have been locked due to the setup being marked as complete" });
        }
    } else {
        return res.status(400).send({ status: "error", message: "The parameter(s) 'homeName' and 'homeTimezone' are required but not present." });
    }
}

module.exports = {
    getSetupStep,
    setSetupStep,
    // runSystemsHealthCheck,
    setCoreInformation
}