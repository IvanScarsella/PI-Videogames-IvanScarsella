require("dotenv").config();
const { API_KEY } = process.env;
const axios = require("axios");
const genresCleaner = require("../utils/genericFunctions");
const { Genre } = require("../db")

const getAllGenres = async () => {
        try{
            let response = await axios.get(`https://api.rawg.io/api/genres?key=${API_KEY}`);
            let map = response.data.results.map(genre=>{
                return {name: genre.name}
            })
            return map
    }
    catch(error){
        throw new Error(error);console.log(error);
    }
}

const saveAllGenres = async () => {
    try {
        const allGenres = await getAllGenres()
        allGenres.forEach(genre => {
            Genre.findOrCreate({
                where: {name: genre.name}
            })
        })
        return allGenres
    } catch (error) {
        throw new Error(error)
        console.log(error)
    }
}

// const getAllGenres = async ()=>{
//     try{
//         let response = await axios(`https://api.rawg.io/api/genres?key=${KEY_NAME}`)
//         let map = response.data.results.map(genre=>{
//             return {name: genre.name}
//         })
//         return map
//     }
//     catch(err){
//         throw new Error(err)
//     }
// }
module.exports = {getAllGenres, saveAllGenres};