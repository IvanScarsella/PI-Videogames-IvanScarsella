const { Router } = require('express');
const { getVideogames, getVideogameById, getFirstsVideogames, createVideogame } = require("../handlers/videogamesHandler")

const routesVideogames = Router();

routesVideogames.get("/all", getVideogames)

routesVideogames.get("/:id", getVideogameById) // /:id hace que la ruta se modifique completamente

routesVideogames.get(`/`, getFirstsVideogames) // lo que venga despues de la ruta no modificará la ruta

routesVideogames.post("/", createVideogame) // por body recibiremos la información en formato json

module.exports = routesVideogames;