const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');

const Schema = mongoose.Schema;

const connect = mongoose.createConnection('mongodb://localhost/music', {useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true});
autoIncrement.initialize(connect);

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
    }
});

trackSchema.plugin(autoIncrement.plugin, 'Track');
const Album = mongoose.model('Track', trackSchema);

module.exports = Album;