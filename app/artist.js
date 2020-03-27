const express = require('express');
const multer = require('multer');
const nanoid = require('nanoid');
const path = require('path');

const checkToken = require('../middlewares/tokenCheck');

const config = require('../config');
const Artist = require('../models/artist');

const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cd) => {
        cd(null, config.artists)
    },
    filename: (req, file, cd) => {
        cd(null, nanoid() + path.extname(file.originalname));
    }
});

const upload = multer({storage});

router.get('/', async (req, res) => {
    if(req.query.published){
        const artists = await Artist.find({published: req.query.published}).populate('userAuthor');
        return  res.send(artists);
    }
   const artists = await Artist.find().populate('userAuthor');
   res.send(artists);
});

router.get('/user', checkToken, async (req, res) => {
    if(req.user.role === 'admin') {
        const albums = await Artist.find();

        return  res.send(albums);
    }

    const artists = await Artist.find({userAuthor: req.user._id});
    res.send(artists);
});

router.post('/', [checkToken, upload.single('photo')], async (req, res) => {
    try {
        if(req.file){
            req.body.photo = req.file.filename;
        }
        req.body.userAuthor = req.user._id;

        const newArtist = await Artist.create(req.body);

        res.send({_id: newArtist._id});
    } catch (e) {
        res.status(400).send({error: e});
    }
});

module.exports = router;