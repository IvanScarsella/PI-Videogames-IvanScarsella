import {
    GET_VIDEOGAMES, GET_INITIAL_VIDEOGAMES, GET_BY_NAME, GET_VIDEOGAME_DETAIL, GET_GAME_BY_ID,
    CREATE_GAME, GET_GENRES, GET_PLATFORMS, CHANGE_PAGE, INCREASE_PAGE, DECREASE_PAGE
} from "../actions/actions";

let initialState = {
    allVideogames: [],
    allVideogamesCopy: [],
    videogameDetail: {},
    apiPlatforms: [],
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
        case GET_INITIAL_VIDEOGAMES:
            return {
                ...state,
                initialGames: action.payload,
                page: 1
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
        case GET_PLATFORMS:
            return {
                ...state,
                apiPlatforms: [action.payload]                
            }
        case CHANGE_PAGE:
            return {
                ...state,
                page: action.payload
            }
        case INCREASE_PAGE:
            return {
                ...state, 
                page: state.page<state.pages ? state.page+1 : state.page
            }
        case DECREASE_PAGE:
            return {
                ...state, 
                page: state.page>1 ? state.page-1 : state.page
            }
        default:
            return state;
    }
}

export default rootReducer;