const { createVideogameDB, getVideogameById } = require("../controllers/videogamesControllers");

const getVideogames = (req, res) => {
    res.status(200).send("Arreglo de videojuegos(objetos)")
}

const getVideogameDetail = async (req, res) => { // /:id => params
    const { id } = req.params;

    const source = isNaN(id) ? "bdd" : "api";// isNan devuelve un booleano

    try {
        const response = await getVideogameById(id, source)
        res.status(200).json(response)
        
    } catch (error) {
        res.status(400).json({error:error.message})
    }
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

    try {
        const response = createVideogameDB(name, description, platform, image, release, rating);
        res.status(200).json(response);
    } catch (error) {
        res.status(400).json({error:error.message})
    }

    res.status(200).send(`Crea el videojuego ${name}`)
}

module.exports = {
    getVideogames,
    getVideogameDetail,
    getFirstsVideogames,
    createVideogame
}