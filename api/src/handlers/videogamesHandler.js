const { createVideogameDB, getVideogameById, getVideogameByName, getAllVideogames } = require("../controllers/videogamesControllers");

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

const getFirstsVideogames = async (req, res) => {

    const { name } = req.query;
    
    try {
        if (name) {
            const aux = name[0];// el [0] es porque está llegando como un array con el string dos veces
            const videogameByName = await getVideogameByName(aux);
            return res.status(200).json(videogameByName);
        } 
        else {
            const response = await getAllVideogames();
            return res.status(200).json(response);
        }
    } catch (error) {
        res.status(400).json({error:error.message})
        console.log(error)
        }
 };

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
    // getVideogames,
    getVideogameDetail,
    getFirstsVideogames,
    createVideogame
}