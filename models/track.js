const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const trackSchema = mongoose.Schema({
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
    }
});

const Album = mongoose.model('Track', trackSchema);

module.exports = Album;