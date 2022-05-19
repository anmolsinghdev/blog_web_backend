const userModel = require('../models/user');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');
const saltRounds = 10;


exports.getAllUser = async (req, res, next) => {
    const data = await userModel.find({})
    return res.send({
        status: 'success',
        data: data
    })
};
exports.createUser = async (req, res, next) => {
    try {
        const firstname = req.body.firstname;
        const lastname = req.body.lastname;
        const username = req.body.username;
        const password = req.body.password;
        const email = req.body.email;


        const existsData = await userModel.exists({ username: username })
        if (existsData) {
            return res.send({
                status: false,
                Message: "Please Enter Another Username"
            })
        } else {
            const hashPassword = await bcrypt.hash(password, saltRounds);
            const data = await userModel.create({
                firstname: firstname,
                lastname: lastname,
                username: username,
                password: hashPassword,
                email: email
            })
            return res.send({
                status: 'success',
                data: data
            })
        }
    } catch (err) {
        res.send({
            status: false,
            erorr: err
        })
    }
};
exports.loginUser = async (req, res, next) => {

    try {
        const username = req.body.username;
        const username2 = req.body.username;
        const password = req.body.password;

        const databaseData = await userModel.findOne({
            $or: [
                {
                    username: username
                },
                {
                    email: username2
                }
            ]
        })
        if (databaseData) {
            const checkPassword = await bcrypt.compare(password, databaseData.password);
            if (checkPassword === true && (databaseData.username === username || databaseData.email === username2)) {
                const jwtKey = jwt.sign({ username: databaseData.username }, process.env.key);
                return res.send({
                    status: true,
                    token: jwtKey,
                    name: `${databaseData.firstname} ${databaseData.lastname}`,
                    Message: 'Login Successfully'
                })
            }
            if (checkPassword === false || databaseData.username === username) return res.send({
                status: false,
                Message: 'Please Enter Correct username And Password'
            })
        } else {
            return res.send({ status: false, message: 'Please Enter Correct username And Password' })
        }
    } catch (err) {
        res.send({
            error: err.message
        })
    }


};