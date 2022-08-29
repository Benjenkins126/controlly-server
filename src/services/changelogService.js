const Changelog = require("../databases/Changelog");

const getAllChangelogs = () => {
    const allChangelogs = Changelog.getAllChangelogs();
    return allChangelogs;
};

const getSpecificChangelog = (id) => {
    return Changelog.getSpecificChangelog(id);
}

module.exports = {
    getAllChangelogs,
    getSpecificChangelog,
}