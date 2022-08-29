const { db, logDatabaseError } = require('./utils');

const getAllChangelogs = () => {
    let changelogs = db.prepare('SELECT * FROM changelog_versions ORDER BY id DESC LIMIT 10').get();
    return changelogs;
}

const getSpecificChangelog = (id) => {
    let changelog = db.prepare('SELECT * FROM changelog_changes WHERE changelog_version = ? ORDER BY id DESC').get(id);
    return changelog;
}

module.exports = {
    getAllChangelogs,
    getSpecificChangelog
}