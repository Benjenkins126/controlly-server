const setupService = require("../services/setupService");

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
// Authentication: None
const setSetupStep = (req, res) => {
    const body = req.query;
    const stageId = parseInt(body.stage);
    const currentStageId = setupService.getSetupStep();

    // Check to ensure there is a stage parameter present, and it matches the validation
    if(stageId !== 1 && stageId !== 2 && stageId !== 3 && stageId !== 0) {
        res.status(400).send({ status: "error", message: "The parameter 'stage' is missing or does not match the list of possible values" });
    } else if(parseInt(currentStageId) === 0) {
        res.status(400).send({ status: "error", message: "Your setup details have been locked due to the setup being marked as complete" })
    } else {
        const setupStage = setupService.setSetupStep(stageId);
        if(setupStage) {
            res.status(200).send({ status: "success", message: "The setup stage has been updated successfully" });
        } else {
            res.status(500).send({ status: "error", message: "There has been an error setting the setup stage. Please check your Controlly Log for information" });
        }
    }
}

// const runSystemsHealthCheck = (req, res) => {
//     return false;
// }

// const setCoreInformation = (req, res) => {
//     return false;
// }

module.exports = {
    getSetupStep,
    setSetupStep,
    // runSystemsHealthCheck,
    // setCoreInformation
}