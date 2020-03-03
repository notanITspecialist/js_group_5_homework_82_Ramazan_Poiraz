const express = require('express');
const multer = require('multer');
const nanoid = require('nanoid');
const path = require('path');

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
   const artists = await Artist.find();
   res.send(artists);
});

router.post('/', upload.single('photo'), async (req, res) => {
    try {
        if(req.file){
            req.body.photo = req.file.filename;
        }

        const newArtist = await Artist.create(req.body);

        res.send({_id: newArtist._id});
    } catch (e) {
        res.status(400).send({error: e});
    }
});

module.exports = router;