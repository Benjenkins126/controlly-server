const changelogService = require('../services/changelogService');

const getAllChangelogs = (req, res) => {
    const allChangelogs = changelogService.getAllChangelogs();
    res.status(201).send({status: "OK", data: allChangelogs});
};

const getSpecificChangelog = (req, res) => {
    const { body } = req;
    
    // Check to ensure there is a changelogID present
    if(!body.changelogID) {
        res.status(400).send({ status: 'ERROR', message: 'Invalid field changelogID'});
    }

    let id = body.changelogID.replace(/\D/g, '');
    
    const changelog = changelogService.getSpecificChangelog(id);
    return;
}

module.exports = {
    getAllChangelogs,
    getSpecificChangelog,
}