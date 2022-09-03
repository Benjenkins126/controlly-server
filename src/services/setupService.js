const Setup = require('../databases/Setup');

const getSetupStep = () => {
    return Setup.getSetupStep().value;
}

const setSetupStep = (step) => {
    return Setup.setSetupStep(step);
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