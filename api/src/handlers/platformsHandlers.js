const {getAllPlatforms, saveAllPlatforms} = require("../controllers/platformsControllers");

const getPlatforms = async (req, res) => {
    try {
        const response = await saveAllPlatforms();
        res.status(200).json({response})
    } catch (error) {
        res.status(400).json({error:error.message})
        console.log(error)
    }
}

module.exports = getPlatforms ;