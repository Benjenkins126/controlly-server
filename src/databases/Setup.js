const { db, logDatabaseError } = require("./utils");

const getSetupStep = () => {
    let setupStep = db.prepare("SELECT value FROM settings WHERE name = ?").get("setup_stage");
    return setupStep;
}

const setSetupStep = (step) => {
    db.prepare("UPDATE settings SET value = ? WHERE name = ?").run(step.toString(), "setup_stage");
    return true;
}

// const runSystemsHealthCheck = () => {
//     return '';
// }

// const setCoreInformation = (name, domain, timezone) => {
//     return '';
// }

module.exports = {
    getSetupStep,
    setSetupStep,
    // runSystemsHealthCheck,
    // setCoreInformation
}