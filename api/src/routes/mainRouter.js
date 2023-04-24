const { Router } = require('express');
const routesGenres = require('./routesGenres');
const routesVideogames = require('./routesVideogames');
const routesPlatforms = require('./routesPlatforms')
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const mainRouter = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

mainRouter.use("/videogames", routesVideogames);
mainRouter.use("/genres", routesGenres);
mainRouter.use("/platforms", routesPlatforms)



module.exports = mainRouter;
