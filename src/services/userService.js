const User = require('../databases/User');
const GeneralController = require('../controllers/generalController');

const signUp = (email, username, password) => {
    return User.signUp(email, username, password, GeneralController.getCurrentDate());
}

module.exports = {
    signUp
}