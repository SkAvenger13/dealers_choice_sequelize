const express = require('express');
const server = express();
const {db, Artist, Track, Album, Genre} = require('./db/db')