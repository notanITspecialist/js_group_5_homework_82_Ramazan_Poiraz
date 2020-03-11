const express = require('express');
const multer = require('multer');
const nanoid = require('nanoid');
const path = require('path');

const config = require('../config');
const Album = require('../models/album');

const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cd) => {
        cd(null, config.albums)
    },
    filename: (req, file, cd) => {
        cd(null, nanoid() + path.extname(file.originalname));
    }
});

const upload = multer({storage});

router.get('/', async (req, res) => {
   try {
       if(req.query.artist){
           const data = await Album.find({author: req.query.artist});
           res.send(data);
       } else {
           const data = await Album.find();
           res.send(data);
       }
   } catch (e) {
       res.send({error: e});
   }
});

router.get('/:id', async (req, res) => {
   try {
       const album = await Album.find({author: req.params.id});
       res.send(album);
   } catch (e) {
       res.send({error: 'Album not found'});
   }
});

router.post('/', upload.single('poster'), async (req, res) => {
    if(req.file){
        req.body.poster = req.file.filename;
    }
    try {
        const newAlbum = await Album.create(req.body);

        res.send({_id: newAlbum._id})
    } catch (e) {
        res.send({error: e})
    }
});

module.exports = router;