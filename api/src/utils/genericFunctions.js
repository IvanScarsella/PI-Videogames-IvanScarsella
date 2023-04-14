const infoCleaner = (arr) => arr.map(videogame => {
    let {name, description, platform, image, release, rating, created} = videogame;
    return {
        name:videogame.name,
        description:videogame.description,
        platform:videogame.platform,
        image:videogame.image,
        release:videogame.release,
        rating:videogame.rating,
        created:false
    }
})

module.exports = infoCleaner;