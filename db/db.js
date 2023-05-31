const Sequelize = require('sequelize');
const {STRING, INTEGER, UUID, UUIDV4, DATEONLY} = Sequelize;
const db = new Sequelize('postgres://localhost:5432/dealers_choice_sequelize');

const Artist = db.create('artist', {
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

const Track = db.create('track', {
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

const Album = db.create('album', {
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

const Genre = db.create('genre', {
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

//add in associations
Artist.hasMany(Track, {as: 'artistTrack'});
Track.belongsTo(Artist, {foreignKey: 'artistId'});

Artist.hasMany(Album, {as: 'artistAlbum'});
Album.belongsTo(Artist, {foreignKey: 'artistId'});

module.exports = {
    db,
    Artist,
    Track,
    Album,
    Genre
};