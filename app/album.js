const express = require('express');
const multer = require('multer');
const nanoid = require('nanoid');
const path = require('path');

const checkToken = require('../middlewares/tokenCheck');

const config = require('../config');
const Album = require('../models/album');
const Track = require('../models/track');

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
           const data = await Album.find({author: req.query.artist}).populate(['author', 'userAuthor']);

           const albums = await Promise.all(data.map(async albumItem => {
               const totalTracks = await Track.aggregate([
                   { $match: {album: albumItem._id} },
                   { $count: 'allTracks' }
               ]);

               return {...albumItem._doc, ...totalTracks[0]}
           }));

           res.send(albums);
       } else {
           const data = await Album.find();
           res.send(data);
       }
   } catch (e) {
       res.send({error: e});
   }
});

router.get('/user', checkToken,async (req, res) => {
    if(req.user.role === 'admin') {
        const albums = await Album.find();

        return  res.send(albums);
    }
    const albums = await Album.find({userAuthor: req.user._id});

    res.send(albums);
});

router.post('/', [checkToken, upload.single('poster')], async (req, res) => {
    if(req.file){
        req.body.poster = req.file.filename;
    }

    req.body.userAuthor = req.user._id;
    try {
        const newAlbum = await Album.create(req.body);

        res.send({_id: newAlbum._id})
    } catch (e) {
        res.send({error: e})
    }
});

module.exports = router;