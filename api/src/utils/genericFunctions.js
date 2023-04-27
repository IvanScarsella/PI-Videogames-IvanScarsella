const infoCleaner = (arr) => {
    return arr.map((videogame) => {
        let { id, name, description, platforms, background_image, released, rating, genres, created } = videogame;
        let arrPlatforms = [];
        platforms.forEach(platform => { // nombre de los géneros
            arrPlatforms.push(platform.platform.name)
        })
        let arrGenres = [];
        genres.forEach(genre => { // nombre de las plataformas
            arrGenres.push(genre.name)
        })
        return {
            id: videogame.id,
            name: videogame.name,
            description: videogame.description,
            platforms: arrPlatforms,
            image: videogame.background_image,
            released: videogame.released,
            rating: videogame.rating,
            genres: arrGenres,
            created: false
        }
    })
}

module.exports = infoCleaner;