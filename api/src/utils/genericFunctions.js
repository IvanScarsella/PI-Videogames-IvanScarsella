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
// const getRevelantDataFromAPI = (array)=>{ 
//     let relevantData = array.map(game=>{
//         let {id, name, rating, platforms, released, background_image, genres} = game
//         let arrPlatforms = []
//         platforms.forEach(platf=>{ //getting only platforms name
//             arrPlatforms.push(platf.platform.name)
//         })
//         let arrGenres = []
//         genres.forEach(genre=>{ //getting only platforms name
//             arrGenres.push(genre.name)
//         })
//         return {
//             id, name, description: "",  
//             platforms: arrPlatforms, image: background_image, genres: arrGenres,
//             released, rating
//         }
//     })
//     return relevantData
// }


module.exports = infoCleaner;