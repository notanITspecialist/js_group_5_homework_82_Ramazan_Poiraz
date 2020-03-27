const mongoose = require('mongoose');

const artistSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    userAuthor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    info: {
        type: String,
        required: true
    },
    published: {
        type: mongoose.Schema.Types.Bool,
        required: true,
        default: false
    },
    photo: String
});

const Artist = mongoose.model('Artist', artistSchema);

module.exports = Artist;