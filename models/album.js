const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const albumSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'Artist',
        required: true
    },
    release: {
        type: Number,
        required: true
    },
    poster: String
});

const Album = mongoose.model('Album', albumSchema);

module.exports = Album;