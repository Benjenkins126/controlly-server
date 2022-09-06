const { db, logDatabaseError } = require("./utils");

const signUp = (email_address, username, password, created_date) => {
    db.prepare("INSERT INTO users (username, email, password, created_date) VALUES (?, ?, ?, ?)").run(username, email_address, password, created_date);
    return true;
}

module.exports = {
    signUp
}