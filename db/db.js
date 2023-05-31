const Sequelize = require('sequelize');
const {STRING, INTEGER, UUID, UUIDV4, DATEONLY} = Sequelize;
const db = new Sequelize(
    'postgres://localhost:5432/dealers_choice_sequelize',
    {logging: false}
);

const Artist = db.define('artist', {
    id: {
        type: UUID,
        primaryKey: true,
        defaultValue: UUIDV4
    },
    name: {
        type: STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    }
});

const Track = db.define('track', {
    id: {
        type: UUID,
        primaryKey: true,
        defaultValue: UUIDV4
    },
    name: {
        type: STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    length: {
        type: INTEGER,
        allowNull: false,
        min: 0,
        validate: {
            notEmpty: true
        }
    }
});

const Album = db.define('album', {
    id: {
        type: UUID,
        primaryKey: true,
        defaultValue: UUIDV4
    },
    name: {
        type: STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    releaseDate: {
        type: DATEONLY,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    }
});

const Genre = db.define('genre', {
    id: {
        type: UUID,
        primaryKey: true,
        defaultValue: UUIDV4
    },
    name: {
        type: STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    }
});

Artist.hasMany(Track, {as: 'artistTrack'});
Track.belongsTo(Artist, {foreignKey: 'artistId'});

Artist.hasMany(Album, {as: 'artistAlbum'});
Album.belongsTo(Artist, {foreignKey: 'artistId'});

Album.hasMany(Track, {as: 'albumTrack'});
Track.belongsTo(Album, {foreignKey: 'albumId'});

Genre.hasMany(Artist, {as: 'genre'});
Artist.belongsTo(Genre, {foreignKey: 'genreId'});

module.exports = {
    db,
    Artist,
    Track,
    Album,
    Genre
};