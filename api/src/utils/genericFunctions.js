const infoCleaner = (arr) => {
    return arr.map((videogame) => {
        let { id, name, description, platforms, background_image, released, rating, genres, created } = videogame;
        let arrPlatforms = [];
        platforms.forEach(platform=>{ //getting only platforms name
            arrPlatforms.push(platform.platform.name)
        })
        let arrGenres = [];
        genres.forEach(genre=>{ //getting only platforms name
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