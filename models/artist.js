const mongoose = require('mongoose');

const artistSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    info: {
        type: String,
        required: true
    },
    photo: String
});

const Artist = mongoose.model('Artist', artistSchema);

module.exports = Artist;