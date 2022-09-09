const { db, logDatabaseError } = require("./utils");

const signUp = (email_address, username, password, created_date) => {
    db.prepare("INSERT INTO users (username, email, password, created_date) VALUES (?, ?, ?, ?)").run(username, email_address, password, created_date);
    return true;
}

const signIn = (username) => {
    let returnedUser = db.prepare("SELECT id, password FROM users WHERE email = ? OR username = ? LIMIT 1").get(username, username);
    if(returnedUser === undefined) {
        return false;
    } else {
        return returnedUser;
    }
}

const updateLoginLog = (user_id, ip_address, date) => {
    db.prepare("UPDATE users SET last_logged_in = ?, last_login_ip = ? WHERE id = ?").run(date, ip_address, user_id);
    return true;
}

module.exports = {
    signUp,
    signIn,
    updateLoginLog
}