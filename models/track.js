const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const trackSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    album: {
        type: Schema.Types.ObjectId,
        ref: 'Album',
        required: true
    },
    duration: {
        type: Number,
        required: true
    },
    published: {
      type: mongoose.Schema.Types.Bool,
      required: true,
      default: false
    },
    userAuthor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    increment: {
        type: Number
    },
    videoId: String,
});

const Track = mongoose.model('Track', trackSchema);

module.exports = Track;