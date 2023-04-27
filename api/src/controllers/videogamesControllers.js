const axios = require("axios");
require("dotenv").config();
const { API_KEY } = process.env;
const { Videogame, Genre, Platform } = require("../db");
const infoCleaner = require("../utils/genericFunctions");
const { Sequelize } = require("sequelize");
const { Op } = require("sequelize");

const createVideogameDB = async (name, description, platform, image, release, rating, genres) => {
    try {

        // if (name && description && platform && image && release && rating && genres) {console.log(name)
        const existe = await Videogame.findOne({
            where: { name: name }
        })
        if (!existe) {
            const newVideogame = await Videogame.create({
                name,
                description,
                image,
                platform,
                genres,
                release,
                rating,
            })

            // const genresDB = await Genre.findAll({
            //     where: { name: genres }
            // })

            // const platformsDB = await Platform.findAll({
            //     where: { name: platform }
            // })

            //     ;
            // newVideogame.addVideogames_genres(genresDB)
            // newVideogame.addVideogames_platforms(platformsDB)
            return newVideogame;

        } else {
            throw new Error("No se ha creado el videojuego")
        }
        // }
    } catch (error) {
        console.log(error)
    }
}
//     const newVideogame = await Videogame.create({ name, description, platform, image, release, rating });

//     return newVideogame;
// }

const getVideogameById = async (id, source) => {
    try {
        const infoApi = [];
        const videogame = source === "api"
            ?
            infoApi.push((await axios.get(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`))
                .data)
            : await Videogame.findByPk(id);
        return infoCleaner(infoApi);
    } catch (error) {
        console.log(error)
    }
}

const getAllVideogames = async () => {
    let videogameDB = await Videogame.findAll();

    let = infoApi = [];
    infoApi.push((await axios(`https://api.rawg.io/api/games?key=${API_KEY}`) // https://jsonplaceholder.typicode.com/users/
    ).data);
    infoApi.push((await axios(infoApi[0].next)).data)
    infoApi.push((await axios(infoApi[1].next)).data)
    infoApi.push((await axios(infoApi[2].next)).data)
    infoApi.push((await axios(infoApi[3].next)).data)

    // let nextPage = infoApi[0].next;
    // let map = infoApi[0].results;
    // infoApi = [...infoApi, ...map]
    // for (let i = 1; i <= 4; i++) { // otros 80 juegos
    //     let response = await axios(nextPage)
    //     let map = infoCleaner(infoApi[0].results)
    //     nextPage = response.data.next
    //     infoApi = [...infoApi, ...map]
    // }

    // console.log(infoApi[0])
// infoApi = infoCleaner(infoApi[0])

    const videogameApi1 = infoCleaner(infoApi[0].results);
    const videogameApi2 = infoCleaner(infoApi[1].results);
    const videogameApi3 = infoCleaner(infoApi[2].results);
    const videogameApi4 = infoCleaner(infoApi[3].results);
    const videogameApi5 = infoCleaner(infoApi[4].results);

        // const iterator = videogameApi.keys();

    // for (const key of iterator) {
    //     console.log(key);
    // }

    const first100Videogames = [
        ...videogameApi1.slice(0, 20),
        ...videogameApi2.slice(0, 20),
        ...videogameApi3.slice(0, 20),
        ...videogameApi4.slice(0, 20),
        ...videogameApi5.slice(0, 20),
     ];

    return [// junta los arrays
        // ...videogameDB,
    ...first100Videogames,
    // ...infoApi
    ]; 
}

const getVideogameByName = async (videogame) => {
    try {
        const infoApi = (await axios.get(`https://api.rawg.io/api/games?search=${videogame}&key=${API_KEY}`) // https://jsonplaceholder.typicode.com/users/
        ).data;

        const videogameApi = infoCleaner(infoApi.results);

        function buscarObjeto(nombre) {
            let minusculas = videogame;
            return nombre.name.toLowerCase() === minusculas.toLowerCase();
        }

        let results = await videogameApi.find(buscarObjeto);

        // let results = await videogameApi.findAll({
        //     where: {
        //         [Sequelize.Op.iLike]: {name: `%${videogame}`}
        //     }
        // }); 

        const videogameDB = await Videogame.findAll({ where: { name: videogame } });

        if (results) return [results, ...videogameDB]

    } catch (error) {
        return { error: error.message }
    }
}

module.exports = { createVideogameDB, getVideogameById, getAllVideogames, getVideogameByName };