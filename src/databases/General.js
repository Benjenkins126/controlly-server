const { db, logDatabaseError } = require('./utils');

const getTimezone = () => {
    return db.prepare("SELECT value FROM settings WHERE name = ?").get("home_timezone");
}

module.exports = {
    getTimezone
}