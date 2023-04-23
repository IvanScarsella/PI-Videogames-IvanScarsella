import { GET_VIDEOGAMES, GET_BY_NAME, GET_VIDEOGAME_DETAIL, GET_GAME_BY_ID } from "../actions/actions";

let initialState = {
    allVideogames: [],
    allVideogamesCopy: [],
    videogameDetail: {},
    platforms: [],
    genres: [],
    page: 1, // página actual
    pages: 5
};

function rootReducer(state = initialState, action) {
    switch (action.type) {
        case GET_VIDEOGAMES:
            return {
                ...state,
                allVideogames: action.payload,
                allVideogamesCopy: action.payload
            }
        case GET_BY_NAME:
            return {
                ...state,
                allVideogames: action.payload
            }
        case GET_VIDEOGAME_DETAIL:
            return {
                ...state,
                videogameDetail: action.payload
            }
        case GET_GAME_BY_ID:
            return {
                ...state,
                videogameDetail: action.payload
            }
        default:
            return state;
    }
}

export default rootReducer;