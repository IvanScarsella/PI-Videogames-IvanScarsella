const getVideogames = (req, res) => {
    res.status(200).send("Arreglo de videojuegos(objetos)")
}

const getVideogameById = (req, res) => { // /:id => params
    const { id } = req.params;

    res.status(200).send([`Obtiene el detalle del videojuego ${id}`])
}

const getFirstsVideogames = (req, res) => {

    const { name } = req.query;

    if (name) {
        res.status(200).send(`Aquí está el videojuego ${name}`)
    } else {
        res.status(200).send("Obtiene los primeros 15 juegos que encuentre con la palabra recibida por query")
}
}

const createVideogame = (req, res) => {

    const { name, description, platform, image, release, rating } = req.body;

    res.status(200).send(`Crea el videojuego ${name}`)
}

module.exports = {
    getVideogames,
    getVideogameById,
    getFirstsVideogames,
    createVideogame
}