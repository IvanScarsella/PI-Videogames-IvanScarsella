const { Router } = require('express');
const getPlatforms = require("../handlers/platformsHandlers");

const routesPlatforms = Router();



routesPlatforms.get("/", getPlatforms)

module.exports = routesPlatforms;