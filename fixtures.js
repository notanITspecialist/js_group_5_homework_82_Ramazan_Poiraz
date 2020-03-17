const mongoose = require('mongoose');

const Artist = require('./models/artist');
const Album = require('./models/album');
const Track = require('./models/track');

const init = async () => {
    await mongoose.connect('mongodb://localhost/music', {useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true});

    const [Zipylya, Vasya, Kirill] = await Artist.create({
        name: 'Zipylya',
        info: 'Величайших исполнитель всия Руси',
        photo: 'OP_pskNHTmh6cLyFci93n.jpeg'
    },{
        name: 'Vasya',
        info: 'Vasya на столько крут что он сыпет две пачки приправы в кукси'
    },{
        name: 'Kirill',
        info: 'Kirill есть рамён и ему чётко'
    });

    const [TyayTyay, Kykoldsinios, B2B, Exile] = await Album.create({
        name: 'Tyay tyay tyay',
        author: Zipylya,
        release: '2000'
    },{
        name: 'Kykoldsinios',
        author: Zipylya,
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
        name: 'У тебя есть бит',
        album: TyayTyay,
        duration: '123',
        videoId: 'qiIRObC3OS4',
        increment: 1
    },{
        name: 'Спорт - жизнь',
        album: TyayTyay,
        duration: '123',
        videoId: 'LJq4HoICKt8',
        increment: 2
    },{
        name: 'Экскременты',
        album: Kykoldsinios,
        duration: '123',
        videoId: 'aS_wdyhu0xQ',
        increment: 1
    },{
        name: 'Track33',
        album: Kykoldsinios,
        duration: '123',
        increment: 2
    },{
        name: 'Track4',
        album: B2B,
        duration: '123',
        increment: 1
    },{
        name: 'Track5',
        album: Exile,
        duration: '123',
        increment: 1
    });
};

init().catch(e => { throw e });