const User = require('../databases/User');
const GeneralController = require('../controllers/generalController');

const signUp = (email, username, password) => {
    return User.signUp(email, username, password, GeneralController.getCurrentDate());
}

const signIn = (username) => {
    return User.signIn(username);
}

const updateLoginLog = (user_id, ip_address) => {
    return User.updateLoginLog(user_id, ip_address, GeneralController.getCurrentDate());
}

module.exports = {
    signUp,
    signIn,
    updateLoginLog
}