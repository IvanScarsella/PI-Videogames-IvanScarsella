const { Router } = require('express');
const getGenres = require("../handlers/genresHandlers");

const routesGenres = Router();



routesGenres.get("/", getGenres)

module.exports = routesGenres;