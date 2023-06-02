const express = require('express');
const server = express();
const {Artist, Track, Album, Genre} = require('./db/db');
const PORT = 8000;

//.use expressions
server.use(express.json());

server.get('/', (req, res) => {
    try {
        res.json({server: 'working'});
    } catch (error) {
        console.log(error);
        res.end();
    }
});

server.get('/all', async (req, res) => {
    try {
        const [artists, tracks, albums, genres] = await Promise.all([
            Artist.findAll({
                attributes: ['name'],
                include: [{
                    model: Track,
                    as: 'artistTrack',
                    attributes: ['name']
                },{
                    model: Genre,
                    as: 'genre',
                    attributes: ['name']
                },{
                    model: Album,
                    as: 'artistAlbum',
                    attributes: ['name']
                }]
            }),
            Track.findAll({
                attributes: ['name', 'length'],
                include: [{
                    model: Artist,
                    attributes: ['name']
                },{
                    model: Album,
                    attributes: ['name']
                }]
            }),
            Album.findAll({
                attributes: ['name'],
                include: [{
                    model: Artist,
                    attributes: ['name']
                },{
                    model: Track,
                    as: 'albumTrack',
                    attributes: ['name']
                }]
            }),
            Genre.findAll({
                attributes: ['name'],
            })
        ]);

        let artistArray = [];
        artists.forEach((artist) => {
            artistArray.push(artist.name);
        });

        let trackArray = [];
        tracks.forEach((track) => {
            trackArray.push([
                `name:${track.name}`,
                `length:${track.length}`
            ]);
        });

        let albumArray = [];
        albums.forEach((album) => {
            albumArray.push([
                `name:${album.name}`,
                `artist:${album.artist.name}`,
                //have to iterate through each track name
                `track(s):${album.albumTrack[0].name}`
            ]);
        });

        let genreArray = [];
        genres.forEach((genre) => {
            genreArray.push(`name:${genre.name}`);
        });

        res.json({
            artists: `${artistArray}`,
            tracks: `${trackArray}`,
            albums: `${albumArray}`,
            genres: `${genreArray}`
        });
        
    } catch (error) {
        console.log(error);
        res.end();
    }
});

server.listen(PORT, () => {
    console.log(`Server is listening on localhost:${PORT}`);
});
