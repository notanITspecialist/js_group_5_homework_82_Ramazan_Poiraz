const express = require('express');
const Track = require('../models/track');
const Album = require('../models/album');

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        if(req.query.album){
            const tracks = await Track.find({album: req.query.album});
            res.send(tracks);
        } else if(req.query.artist) {
            const albums = await Album.find({author: req.query.artist});
            const result = await Promise.all( albums.map(async e => await Track.find({album: e._id}) ));
            res.send(result.flat());
        } else {
            const tracks = await Track.find();
            res.send(tracks);
        }
    } catch (e) {
        res.send({error: e});
    }
});

router.post('/', async (req, res) => {
    try{
        const newTrack = await Track.create(req.body);
        res.send({_id: newTrack._id})
    } catch (e) {
        res.send({error: e})
    }
});

module.exports = router;