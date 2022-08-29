// This file is used to open the SQLite database file.

require('dotenv').config();
const sqlite3 = require('sqlite3').verbose();

let db = new sqlite3.Database(process.env.SQLPATH, sqlite3.OPEN_READWRITE, (err) => {
    if(err) {
        console.error(err.message);
    } else {
        console.log('Controlly Backend has connected to the database successfully');
    }
});

module.exports = { db };