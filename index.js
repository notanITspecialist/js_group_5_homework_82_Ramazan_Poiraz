const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const artist = require('./app/artist');
const album = require('./app/album');
const track = require('./app/tracks');
const user = require('./app/user');
const track_history = require('./app/track_history');

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.static('public'));

const init = async () => {
    await mongoose.connect('mongodb://localhost/music', {useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true});

    app.use('/artist', artist);
    app.use('/album', album);
    app.use('/track', track);
    app.use('/user', user);
    app.use('/track_history', track_history);


    app.listen(8000, () => {
        console.log('Server started on 8000 host!');
    });
};

init().catch(e => console.log(e));