require("dotenv").config();
const { API_KEY } = process.env;
const axios = require("axios");
const platformsCleaner = require("../utils/genericFunctions");
const { Platform } = require("../db");
const { platform } = require("os");

const getAllPlatforms = async () => {
        try{
            let response = await axios.get(`https://api.rawg.io/api/platforms?key=${API_KEY}`)
            let map = response.data.results.map(platform=>{
                return {name: platform.name}
            })
            return map;
    }
    catch(error){
        console.log(error);
        throw new Error(error);
    }
}

const saveAllPlatforms = async () => {
    try {
        const allPlatforms = await getAllPlatforms()
        allPlatforms.forEach(platform => {
            Platform.findOrCreate({
                where: {name: platform.name}
            })
        })
        return allPlatforms
    } catch (error) {
        throw new Error(error)
        console.log(error)
    }
}
module.exports = {getAllPlatforms, saveAllPlatforms};