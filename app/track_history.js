const express = require('express');

const tokenCheck = require('../middlewares/tokenCheck');

const TrackHistory = require('../models/track_history');

const historyAdded = require('../middlewares/historyAdded');

const router = express.Router();

router.post('/', historyAdded, async (req, res) => {
   try {
      const newTrackHistory = await TrackHistory.create(req.newHistory);

      return res.send({track_history: newTrackHistory});
   } catch (e) {
      return res.status(400).send({error: e})
   }
});

router.get('/', tokenCheck, async (req, res) => {
   try {
      const trackHistory = await TrackHistory.find({user: req.user._id}).populate(['track', 'author']);
      // const reverseHistory = trackHistory.reverse();
      res.send(trackHistory);
   } catch (e) {
      return res.send({error: e})
   }
});

module.exports = router;