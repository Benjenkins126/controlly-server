const changelogService = require('../services/changelogService');

const getAllChangelogs = (req, res) => {
    const allChangelogs = changelogService.getAllChangelogs();
    return;
};

const getSpecificChangelog = (req, res) => {
    const changelog = changelogService.getSpecificChangelog();
    return;
}

module.exports = {
    getAllChangelogs,
    getSpecificChangelog,
}