const express = require('express');

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

module.exports = router;