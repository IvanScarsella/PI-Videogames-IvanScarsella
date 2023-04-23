import axios from "axios";
// require("dotenv").config();
// const { API_KEY } = process.env;

export const GET_VIDEOGAMES = "GET_VIDEOGAMES";
export const GET_BY_NAME = "GET_BY_NAME";
export const GET_VIDEOGAME_DETAIL = "GET_VIDEOGAME_DETAIL";
export const GET_GAME_BY_ID = "GET_GAME_BY_ID"

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
export function getByName (name) {
    return async function(dispatch){
        try {console.log("hola")
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