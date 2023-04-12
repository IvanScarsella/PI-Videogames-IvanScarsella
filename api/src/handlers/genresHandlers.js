const getGenres = (req, res) => {
    res.status(200).send("Obtiene un arreglo con los géneros existentes en la API")
}

module.exports = getGenres ;