const { saveAllGenres } = require("../controllers/genresController");

const getGenres = async (req, res) => {
    try {
        const response = await saveAllGenres();
        res.status(200).json({ response })
    } catch (error) {
        res.status(400).json({ error: error.message })
        console.log(error)
    }
}

module.exports = getGenres;