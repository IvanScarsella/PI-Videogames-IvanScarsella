import axios from "axios";
// require("dotenv").config();
// const { API_KEY } = process.env;

export const GET_VIDEOGAMES = "GET_VIDEOGAMES";
export const GET_INITIAL_VIDEOGAMES = "GET_INITIAL_VIDEOGAMES"
export const GET_BY_NAME = "GET_BY_NAME";
export const GET_VIDEOGAME_DETAIL = "GET_VIDEOGAME_DETAIL";
export const GET_GAME_BY_ID = "GET_GAME_BY_ID";
export const CREATE_GAME = "CREATE_GAME";
export const GET_GENRES = "GET_GENRES";
export const GET_PLATFORMS = "GET_PLATFORMS";
export const CHANGE_PAGE = "CHANGE_PAGE";
export const INCREASE_PAGE = "INCREASE_PAGE";
export const DECREASE_PAGE = "DECREASE_PAGE";
export const FILTER_CHANGE_VALUE = "FILTER_CHANGE_VALUE";
export const FILTER_GAMES = "FILTER_GAMES";
export const GET_CURRENT_PAGES = "GET_CURRENT_PAGES";
export const CLEAR_FILTERS = "CLEAR_FILTERS";
export const RESTART_CURRENT_PAGE = "RESTART_CURRENT_PAGE";

export function getVideogames () {
    return async function(dispatch){
        try {
            const response = await axios("http://localhost:3001/videogames");
            return dispatch({
                type: GET_VIDEOGAMES,
                payload: response.data
            })
        } catch (error) {
            console.log(error)
            throw new Error('Could not fetched the videogames')
        }
    }
}
export const getInitialVideogames = ()=>{ //the first 100 games
    return async function(dispatch){
        try{
            const response = await axios.get(`/videogames`)
            return dispatch({
                    type: GET_INITIAL_VIDEOGAMES,
                    payload: [[1, response.data]]
                }
            )
        }
        catch(err){
            throw new Error('Could not fetched the initial videogames')
        }
    }
}
export function getGenres(){
    return async function(dispatch){
        try {
            const response = await axios("http://localhost:3001/genres/");
            return dispatch({
                type: GET_GENRES,
                payload: response.data.response
            })
        } catch (error) {
            console.log(error)
        }
    }
    
}
export function getPlatforms(){
    return async function(dispatch){
        try {
            const response = await axios("http://localhost:3001/platforms/");
            return dispatch({
                type: GET_PLATFORMS,
                payload: response.data.response
            })
        } catch (error) {
            console.log(error)
        }
    }
}
export function getByName (name) {
    return async function(dispatch){
        try {
            const response = await axios(`http://localhost:3001/videogames?search=${name}`);
            return dispatch({
                type: GET_BY_NAME,
                payload: response.data
            })
        } catch (error) {
            console.log(error)
            throw new Error('No se encontró el videojuego solicitado')
        }
    }
}
export function getVideogameDetail (id) {
    return async function(dispatch){
        try {
            if(id){

                const response = await (await axios.get(`http://localhost:3001/videogames/${id}`));
                dispatch({ type: GET_VIDEOGAME_DETAIL, payload: response.data[0]})
            } else {
                return dispatch({
                    type: GET_GAME_BY_ID,
                    payload: {}
                })
            }
        } catch (error) {
            console.log(error)
            // throw new Error ('El detail no está disponible')   
        }
    }
}
export function createGame(data){
    return async function(dispatch){
        try{
            await axios.post(`http://locahost:3001/videogames/`, data)
            return dispatch({
                type: CREATE_GAME,
                payload: {...data, created: true}
            }
        )
        }
        catch(error){
            console.log(error)
            throw new Error('No se ha podido crear el juego')
        }
    }
}
export function changePage(page){
    return {
        type: CHANGE_PAGE,
        payload: page
    }
}
export function increasePage(){
    return {
        type: INCREASE_PAGE
    }
}

export function decreasePage(){
    return {
        type: DECREASE_PAGE
    }
}

export const filterChangeValue = (property, value)=>{
    return {
        type: FILTER_CHANGE_VALUE,
        payload: {property, value}
    }
}

export const filterGames = (allGames, {genre, platform, order, originData})=> {
    
    const results = getFilteredGames(allGames, {genre, platform, order, originData})

    const passToPages = getCurrentPages(results).payload //lo paso a formato 
    // console.log(passToPages);

    return {
        type: FILTER_GAMES,
        payload: passToPages
    }
}

export function getCurrentPages(currentGames){ //pages, getting the data for the pages
    try{
        if(currentGames){
            let games= currentGames
            let max = Math.ceil(games.length / 20) //5
    
            let slicedGames = [[1, games.slice(0, 20)]]
            let i = 2
    
            while(max>1){ //7>1, 6>1, etc
                slicedGames.push([i, games.slice(20*(i-1), 20*i)])
                i++
                max--
            }
    
            return ({
                type: GET_CURRENT_PAGES,
                payload: slicedGames
            })
        }
    }
    catch(err){
        throw new Error('Could not get the current pages')
    }
}

export const clearFilters = ()=> {
    return {
        type: CLEAR_FILTERS
    }
}

export function restartCurrentPage(allGames){ //paginas
    return async function(dispatch){
        try{
            if(allGames){
                const games = await getCurrentPages(allGames).payload
                return dispatch({
                    type: RESTART_CURRENT_PAGE,
                    payload: games
                })
            }
        }
        catch(err){
            throw new Error('Could not restart the current pages')
        }
    }
}

function getFilteredGames(allGames, {genre, platform, order, originData}){
    let results = [...allGames] //spread operator para no pisar el array

    //filtrar por genero
    if(genre){
        let filterByGenre = results.filter(game=>{
            let flag = false
            game.genres.forEach(g=>{
                const some = g===genre
                if(some) flag = true
            })
            if(flag) return game
            else return null
        })
        results = filterByGenre
    }

    //filtrar por plataforma
    if(platform){
        let filterByPlatform = results.filter(game=>{
            let flag = false
            game.platforms.forEach(p=>{
                const some = p===platform
                if(some) flag = true
            })
            if(flag) return game
            else return null
        })
        results = filterByPlatform
    }

    //orden
    if(order){
        switch(order){
            case "max-min":
                results = results.sort((a, b) => b.rating - a.rating);
                break;
            case "min-max": 
                results = results.sort((a, b) => a.rating - b.rating);
                break;
            case "A-Z": 
                results = results.sort((a,b)=>a.name.localeCompare(b.name))
                break;
            case "Z-A": 
                results = results.sort((a,b)=>b.name.localeCompare(a.name))
                break;
            default: 
                break;
        }
    }

    if(originData){
        switch(originData){
            case "all":
                results = allGames
                break;
            case "db": 
                results = results.filter(game=>{
                    if(game?.id?.toString().length>10) return game
                    return null
                })
                break;
            case "api":
                results = results.filter(game=>{
                    if(game.id.toString().length<10) return game
                    return null
                })
                break;
            default:
                break;
        }
    }
    
    return results

}