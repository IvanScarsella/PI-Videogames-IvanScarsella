import {
    GET_VIDEOGAMES, GET_BY_NAME, GET_VIDEOGAME_DETAIL,
    GET_GAME_BY_ID, CREATE_GAME, GET_GENRES, CHANGE_PAGE, 
} from "../actions/actions";

let initialState = {
    allVideogames: [],
    allVideogamesCopy: [],
    videogameDetail: {},
    platforms: [],
    apiGenres: [],
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
        case CREATE_GAME:
            return {
                ...state,
                allVideogames: [...state.allVideogames, action.payload]
            }
        case GET_GENRES: 
            return {
                ...state,
                apiGenres: [action.payload]
            }
        case CHANGE_PAGE:
            return {
                ...state,
                page: action.payload
            }
        default:
            return state;
    }
}

export default rootReducer;