const express = require('express');

const authorization = require('../middlewares/authorizationСheck');

const User = require('../models/user');

const router = express.Router();

router.post('/', async (req, res) => {
    const newUser = new User(req.body);

    try {
        newUser.addToken();
        await newUser.save();

        res.send(newUser)
    } catch (e) {
        res.status(404).send({error: 'Such username already exists'})
    }
});

router.post('/sessions', authorization, async (req, res) => {
    req.user.addToken();
    req.user.save();

    res.send(req.user)
});

module.exports = router;