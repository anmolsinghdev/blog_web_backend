const mongoose = require('mongoose');

const signUpSchema = mongoose.Schema({
    firstname: {
        type: String,
    },
    lastname: {
        type: String,
    },
    username: {
        type: String,
    },
    password: {
        type: String,
    },
    email: {
        type: String,
    }
});

const userModel = mongoose.model('users', signUpSchema);
module.exports = userModel;