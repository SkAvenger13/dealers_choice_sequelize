const {db, Artist, Track, Album, Genre} = require('./db');

const syncAndSeed = async () => {
    try {

        await db.sync({force: true});

        const [elderbrook, lane8, trilucid] = await Promise.all([
            Artist.create({
                name: 'Elderbrook'
            }),
            Artist.create({
                name: 'Lane 8'
            }),
            Artist.create({
                name: 'Trilucid'
            })
        ]);
    
        const [howl, noFun, athena] = await Promise.all([
            Track.create({
                name: 'Howl',
                length: 257
            }),
            Track.create({
                name: 'No Fun',
                length: 411
            }),
            Track.create({
                name: 'Athena',
                length: 224
            })
        ]);

        const [littleLoveAlbum, noFunAlbum, athenaAlbum] = await Promise.all([
            Album.create({
                name: 'Little Love',
                releaseDate: '2023-03-31'
            }),
            Album.create({
                name: 'No Fun',
                releaseDate: '2022-06-07'
            }),
            Album.create({
                name: 'Athena',
                releaseDate: '2023-01-27'
            })
        ]);

        const atmosphericHouse = await Genre.create({
            name: 'Atmospheric House'
        });

        howl.artistId = elderbrook.id;
        noFun.artistId = lane8.id;
        athena.artistId = trilucid.id;

        howl.albumId = littleLoveAlbum.id;
        noFun.albumId = noFunAlbum.id;
        athena.albumId = athenaAlbum.id;

        littleLoveAlbum.artistId = elderbrook.id;
        noFunAlbum.artistId = lane8.id;
        athenaAlbum.artistId = trilucid.id;

        elderbrook.genreId = atmosphericHouse.id;
        lane8.genreId = atmosphericHouse.id;
        trilucid.genreId = atmosphericHouse.id;

        await Promise.all([
            howl.save(),
            noFun.save(),
            athena.save(),
            littleLoveAlbum.save(),
            noFunAlbum.save(),
            athenaAlbum.save(),
            elderbrook.save(),
            lane8.save(),
            trilucid.save()
        ]);

        db.close();

    } catch (error) {

        console.log(error);
        db.close();

    }
};

syncAndSeed();