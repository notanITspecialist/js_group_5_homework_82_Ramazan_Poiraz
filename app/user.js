const express = require('express');

const authorization = require('../middlewares/authorizationСheck');

const User = require('../models/user');

const router = express.Router();

router.post('/', async (req, res) => {
    const newUser = new User(req.body);

    try {
        newUser.addToken();
        await newUser.save();

        res.send({token: newUser})
    } catch (e) {
        res.send({error: e})
    }
});

router.post('/sessions', authorization, async (req, res) => {
    req.user.addToken();
    req.user.save();

    res.send({token: req.user.token})
});

module.exports = router;