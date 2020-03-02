const express = require('express');
const Track = require('../models/track');
const Album = require('../models/album');

const router = express.Router();

router.get('/', async (req, res) => {
    if(req.query.album){
        const tracks = await Track.find({album: req.query.album});
        res.send(tracks);
    } else if(req.query.artist) {
        const albums = await Album.find({author: req.query.artist});
        const tracks = albums.map(async e => await Track.find({album: e._id}));
        const result = (await Promise.all(tracks)).flat();
        res.send(result);
    } else {
        const tracks = await Track.find();
        res.send(tracks);
    }
});

router.post('/', async (req, res) => {
    const newTrack = new Track(req.body);

    newTrack.save();

    res.send({_id: newTrack._id})
});

module.exports = router;