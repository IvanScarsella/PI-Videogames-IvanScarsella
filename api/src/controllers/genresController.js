require("dotenv").config();
const { API_KEY } = process.env;
const axios = require("axios");
const genresCleaner = require("../utils/genericFunctions");
const { Genre } = require("../db")

const getAllGenres = async () => {
        try{
            let response = await axios.get(`https://api.rawg.io/api/genres?key=${API_KEY}`)
            let map = response.data.results.map(genre=>{
                return {name: genre.name}
            })
            return map;
    }
    catch(error){
        console.log(error);
        throw new Error(error);
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

module.exports = {getAllGenres, saveAllGenres};