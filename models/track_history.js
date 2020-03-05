const mongoose = require('mongoose');

const trackHistorySchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    track: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Track'
    },
    date: {
        type: Date,
        default: Date.now()
    }
});

const TrackHistory = mongoose.model('Track_history', trackHistorySchema);

module.exports = TrackHistory;