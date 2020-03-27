const express = require('express');

const checkToken = require('../middlewares/tokenCheck');
const permit = require('../middlewares/permit');

const Artist = require('../models/artist');
const Album = require('../models/album');
const Track = require('../models/track');

const router = express.Router();

router.post('/artist/:id', [checkToken, permit('admin')],async (req, res ) => {
    await Artist.updateOne({_id: req.params.id}, {published: true});
    res.send({message: 'Updated'});
});

router.post('/album/:id', [checkToken, permit('admin')],async (req, res ) => {
    await Album.updateOne({_id: req.params.id}, {published: true});
    res.send({message: 'Updated'});
});

router.post('/track/:id', [checkToken, permit('admin')],async (req, res ) => {
    await Track.updateOne({_id: req.params.id}, {published: true});
    res.send({message: 'Updated'});
});

router.delete('/artist/:id', [checkToken, permit('admin')], async (req, res) => {
    await Artist.deleteOne({_id: req.params.id});
    res.send({message: 'Deleted'});
});

router.delete('/album/:id', [checkToken, permit('admin')], async (req, res) => {
    await Album.deleteOne({_id: req.params.id});
    res.send({message: 'Deleted'});
});

router.delete('/track/:id', [checkToken, permit('admin')], async (req, res) => {
    await Track.deleteOne({_id: req.params.id});
    res.send({message: 'Deleted'});
});

module.exports = router;