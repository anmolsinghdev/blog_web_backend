const mongoose = require("mongoose");

require('dotenv').config()
mongoose.connect('mongodb+srv://webohboy:anmols1234@cluster0.briml.mongodb.net/login_users?retryWrites=true&w=majority').then(() => {
    console.log("Successfully connected to database");
}).catch((error) => {
    console.log("database connection failed. exiting now...");
    console.error(error);
    process.exit(1);
});