const express = require('express');
const multer = require('multer');
const nanoid = require('nanoid');
const ObjectId = require('mongoose').Types.ObjectId;
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
   if(req.query.artist){
       const data = await Album.find({author: req.query.artist});
       res.send(data);
   } else {
       const data = await Album.find();
       res.send(data);
   }
});

router.get('/:id', async (req, res) => {
   const album = await Album.find(ObjectId(req.params.id)).populate('author');
   res.send(album);
});

router.post('/', upload.single('poster'), async (req, res) => {
    if(req.file){
        req.body.poster = req.file.filename;
    }
    try {
        const newAlbum = new Album(req.body);
        newAlbum.save();

        res.send({_id: newAlbum._id})
    } catch (e) {
        res.send({error: 'Author not found'})
    }
});

module.exports = router;