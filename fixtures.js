const mongoose = require('mongoose');

const Artist = require('./models/artist');
const Album = require('./models/album');
const Track = require('./models/track');

const init = async () => {
    await mongoose.connect('mongodb://localhost/music', {useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true});

    const [Oleg, Vasya, Kirill] = await Artist.create({
        name: 'Oleg',
        info: 'Oleg на столько крут что он может гнуть арматуру взглядом'
    },{
        name: 'Vasya',
        info: 'Vasya на столько крут что он сыпет две пачки приправы в кукси'
    },{
        name: 'Kirill',
        info: 'Kirill есть рамён и ему чётко'
    });

    const [RedMold, Kykoldsinios, B2B, Exile] = await Album.create({
        name: 'RedMold',
        author: Oleg,
        release: '2000'
    },{
        name: 'Kykoldsinios',
        author: Oleg,
        release: '2001'
    },{
        name: 'B2B',
        author: Vasya,
        release: '2002'
    },{
        name: 'Exile',
        author: Kirill,
        release: '2003'
    });

    await Track.create({
        name: 'Track1',
        album: RedMold,
        duration: '123'
    },{
        name: 'Track2',
        album: RedMold,
        duration: '123'
    },{
        name: 'Track3',
        album: Kykoldsinios,
        duration: '123'
    },{
        name: 'Track4',
        album: B2B,
        duration: '123'
    },{
        name: 'Track5',
        album: Exile,
        duration: '123'
    });
};

init().catch(e => { throw e });