const express = require('express');
const axios = require("axios");
const nanoid = require('nanoid');

const authorization = require('../middlewares/authorizationСheck');
const config = require('../config');

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

router.post('/facebook', async (req, res) => {
    // try {
        const inputToken = req.body.accessToken;
        const accessToken = config.facebook.appId + '|' + config.facebook.appSecret;

        const url = `https://graph.facebook.com/debug_token?input_token=${inputToken}&access_token=${accessToken}`;

        const response = await axios.get(url);
        const facebookData = response.data.data;

        if(facebookData.error) return res.status(401).send({error: 'Facebook token is incorrect'});

        if(req.body.id !== facebookData.user_id) return res.status(401).send({error: 'User id is incorrect'});

        let user = await User.findOne({facebookId: req.body.id});

        if(!user){
            user = new User({
                username: req.body.id,
                password: nanoid(),
                facebookId: req.body.id,
                displayName: req.body.name,
                avatar: req.body.picture.data.url
            })
        }

        user.addToken();
        await user.save();

        return res.send(user);
    // } catch (e) {
    //     return res.status(401).send(e);
    // }
    

});

router.post('/sessions', authorization, async (req, res) => {
    req.user.addToken();
    req.user.save();

    res.send(req.user)
});

router.delete('/sessions', async (req, res) => {
    const success = {message: "success"};
    try{
        const token = req.get('Authorization').split(' ')[1];

        if(!token) return res.send(success);

        const user = await User.findOne({token});

        if(!user) return res.send(success);

        user.addToken();
        await user.save();

        return res.send(success);

    } catch (e) {
        res.send(success)
    }

});
module.exports = router;