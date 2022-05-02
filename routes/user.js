const express = require('express');
const router = express.Router()
const { getAllUser, createUser, loginUser } = require("../controllers/user");

router.get('/user', getAllUser);
router.post('/create', createUser);
router.post('/login', loginUser);
module.exports = router