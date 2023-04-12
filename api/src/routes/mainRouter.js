const { Router } = require('express');
const routesGenres = require('./routesGenres');
const routesVideogames = require('./routesVideogames');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const mainRouter = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

mainRouter.use("/videogames", routesVideogames);
mainRouter.use("/genres", routesGenres);



module.exports = mainRouter;
