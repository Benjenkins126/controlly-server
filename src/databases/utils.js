// This file is used to open the SQLite database file.

require('dotenv').config();
const fs = require('fs');
const db = require('better-sqlite3')(process.env.SQLPATH);

const logDatabaseError = (message) => {
    let errorDate = new Date().toLocaleString();
    console.log('An error has occured => ' + message);
    fs.appendFile('../../ControllyBackend.log', errorDate + " => Database Error: " + message);
    res.status(400).send({ status: 'ERROR', message: 'A database error occured. Please check your ControllyBackend.log for details'});
    return true;
}

module.exports = { db, logDatabaseError };