const mongoose = require('mongoose');

const Artist = require('./models/artist');
const Album = require('./models/album');
const Track = require('./models/track');
const User = require('./models/user');

const init = async () => {
    await mongoose.connect('mongodb://localhost/music', {useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true});

    const [user, admin, ramazan228] = await User.create({
        username: 'Ramazan',
        displayName: 'Рамазан Пойраз',
        password: '123',
        token: 'user123',
        avatar: 'https://kompromat1.live/foto/articles_foto/2019/04/22/114768.jpg',
        role: 'user'
    }, {
        username: 'Kadir',
        displayName: 'Кадыр Пойраз',
        password: '123',
        token: 'admin123',
        role: 'admin'
    },{
        username: 'Ramazan228',
        displayName: 'Рамазан два два восемь',
        password: '123',
        token: 'user123456',
        role: 'user'
    });

    const [KARAKATISA ,Zipylya, Oleg, Kirill] = await Artist.create({
        published: false,
        name: 'KARAKATISA',
        info: 'AYE',
        userAuthor: ramazan228
    },{
        published: false,
        name: 'Zipylya',
        info: 'Величайших исполнитель всия Руси',
        userAuthor: user,
        photo: 'Zipulya.jpeg'
    },{
        published: true,
        name: 'Oleg',
        info: 'Драконорожденный',
        userAuthor: user,
        photo: 'Oleg.jpg'
    },{
        published: true,
        name: 'Kirill',
        info: 'Kirill ровный пацан, верит в бога',
        userAuthor: user,
        photo: 'Kirill.jpg'
    });

    const [TyayTyay, SportLife, MongolDance, MotivationKing, worship, ACircle] = await Album.create({
        published: false,
        name: 'Tyay tyay tyay',
        author: Zipylya,
        release: '2000',
        userAuthor: user,
        poster: 'TyayTyay.jpg'
    },{
        published: true,
        name: 'SportLife',
        author: Zipylya,
        release: '2001',
        userAuthor: user,
        poster: 'SportLife.jpg'
    },{
        published: true,
        name: 'MongolDance',
        author: Oleg,
        release: '2002',
        userAuthor: user,
        poster: 'MongolDance.jpg'
    },{
        published: true,
        name: 'MotivationKing',
        author: Oleg,
        release: '2003',
        userAuthor: user,
        poster: 'MotivationKing.jpg'
    },{
        published: true,
        name: 'worship',
        author: Kirill,
        userAuthor: user,
        release: '2003',
        poster: 'worship.jpg'
    },{
        published: true,
        name: 'ACircle',
        author: Kirill,
        release: '2003',
        userAuthor: user,
        poster: 'Golden.jpg'
    });

    await Track.create({
        published: false,
        name: 'У тебя есть бит',
        album: TyayTyay,
        duration: '123',
        userAuthor: user,
        videoId: 'qiIRObC3OS4',
        increment: 1
    },{
        published: true,
        name: 'Менты матросы',
        album: TyayTyay,
        duration: '250',
        userAuthor: user,
        increment: 2
    },{
        published: true,
        name: 'Зипуля да да да ага',
        album: TyayTyay,
        duration: '100',
        userAuthor: user,
        increment: 3
    },{
        published: true,
        name: 'Поездка в Томбов',
        album: TyayTyay,
        duration: '120',
        userAuthor: user,
        increment: 4
    },{
        published: true,
        name: 'Феринг тяу',
        album: TyayTyay,
        duration: '150',
        userAuthor: user,
        increment: 5
    },{
        published: true,
        name: 'Спорт - жизнь',
        album: SportLife,
        duration: '123',
        videoId: 'LJq4HoICKt8',
        userAuthor: user,
        increment: 1
    },{
        published: true,
        name: 'Зипуля трек 2',
        album: SportLife,
        duration: '123',
        userAuthor: user,
        increment: 2
    },{
        published: true,
        name: 'Зипуля трек 3',
        album: SportLife,
        duration: '123',
        userAuthor: user,
        increment: 3
    },{
        published: true,
        name: 'Зипуля трек 4',
        album: SportLife,
        duration: '123',
        userAuthor: user,
        increment: 4
    },{
        published: true,
        name: 'Зипуля трек 5',
        album: SportLife,
        duration: '123',
        userAuthor: user,
        increment: 5
    },{
        published: true,
        name: 'MongolDance',
        album: MongolDance,
        duration: '123',
        videoId: 'ymN9TkWcX1I',
        userAuthor: user,
        increment: 1
    },{
        published: true,
        name: 'Монгол трек 2',
        album: MongolDance,
        duration: '123',
        userAuthor: user,
        increment: 2
    },{
        published: true,
        name: 'Монгол трек 3',
        album: MongolDance,
        duration: '123',
        userAuthor: user,
        increment: 3
    },{
        published: true,
        name: 'Монгол трек 4',
        album: MongolDance,
        duration: '123',
        userAuthor: user,
        increment: 4
    },{
        published: true,
        name: 'Монгол трек 5',
        album: MongolDance,
        duration: '123',
        userAuthor: user,
        increment: 5
    },{
        published: true,
        name: 'MotivationKing',
        album: MotivationKing,
        duration: '123',
        videoId: 'jwylRDWx6y0',
        userAuthor: user,
        increment: 1
    },{
        published: true,
        name: 'Монгол трек 7',
        album: MotivationKing,
        duration: '123',
        userAuthor: user,
        increment: 1
    },{
        published: true,
        name: 'Монгол трек 8',
        album: MotivationKing,
        duration: '123',
        userAuthor: user,
        increment: 1
    },{
        published: true,
        name: 'Монгол трек 9',
        album: MotivationKing,
        duration: '123',
        userAuthor: user,
        increment: 1
    },{
        published: true,
        name: 'Монгол трек 10',
        album: MotivationKing,
        duration: '123',
        userAuthor: user,
        increment: 1
    },{
        published: true,
        name: 'worship',
        album: worship,
        duration: '123',
        videoId: 'LMEps4S_mDs',
        userAuthor: user,
        increment: 1
    },{
        published: true,
        name: 'Служение патриарха 2',
        album: worship,
        duration: '123',
        userAuthor: user,
        increment: 1
    },{
        published: true,
        name: 'Служение патриарха 3',
        album: worship,
        duration: '123',
        userAuthor: user,
        increment: 1
    },{
        published: true,
        name: 'Служение патриарха 4',
        album: worship,
        duration: '123',
        userAuthor: user,
        increment: 1
    },{
        published: true,
        name: 'Служение патриарха 5',
        album: worship,
        duration: '123',
        userAuthor: user,
        increment: 1
    },{
        published: true,
        name: 'GOldenDome',
        album: ACircle,
        duration: '123',
        videoId: 'hpuBgLBrhfo',
        userAuthor: user,
        increment: 1
    },{
        published: true,
        name: 'Служение патриарха 6',
        album: ACircle,
        duration: '123',
        userAuthor: user,
        increment: 1
    },{
        published: true,
        name: 'Служение патриарха 7',
        album: ACircle,
        duration: '123',
        userAuthor: user,
        increment: 1
    },{
        published: true,
        name: 'Служение патриарха 8',
        album: ACircle,
        duration: '123',
        userAuthor: user,
        increment: 1
    },{
        published: true,
        name: 'Служение патриарха 9',
        album: ACircle,
        duration: '123',
        userAuthor: user,
        increment: 1
    });
};

init().catch(e => { throw e });