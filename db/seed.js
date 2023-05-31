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

        db.close();

    } catch (error) {

        console.log(error);
        db.close();
        
    }
};

syncAndSeed();