const { Router } = require('express');

const routesVideogames = Router();

routesVideogames.get("/", (req, res) => {
    res.status(200).send("Arreglo de videojuegos(objetos)")
}) 
routesVideogames.get("/:idVideogame", (req, res) => {
    res.status(200).send("Obtiene el detalle de un videojuego específico")
})
routesVideogames.get(`/name?="..."`, (req, res) => {
    res.status(200).send("Obtiene los primeros 15 juegos de la query")
})
routesVideogames.post("/", (req, res) => {
    res.status(200).send("Recibe los datos para crear un videojuego")
})

module.exports = routesVideogames ;