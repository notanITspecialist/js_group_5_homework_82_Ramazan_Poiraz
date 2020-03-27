const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const albumSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    userAuthor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'Artist',
        required: true
    },
    published: {
        type: mongoose.Schema.Types.Bool,
        required: true,
        default: false
    },
    release: {
        type: Number,
        required: true
    },
    poster: String
});

const Album = mongoose.model('Album', albumSchema);

module.exports = Album;