import {
    GET_VIDEOGAMES, GET_INITIAL_VIDEOGAMES, GET_BY_NAME, GET_VIDEOGAME_DETAIL, GET_GAME_BY_ID,
    CREATE_GAME, GET_GENRES, GET_PLATFORMS, CHANGE_PAGE, INCREASE_PAGE, DECREASE_PAGE, FILTER_CHANGE_VALUE,
    FILTER_GAMES, GET_CURRENT_PAGES, CLEAR_FILTERS, RESTART_CURRENT_PAGE, CLEAR_DETAIL
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
    pages: 0, // páginas totales
    filters: {
        genre: "",
        platform: "",
        order: "",
        originData: ""
    },
    currentPages: [],
    filteredPages: [],
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
        case CLEAR_DETAIL:
            return {
                ...state,
                videogameDetail: {}
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
                page: state.page < state.pages ? state.page + 1 : state.page
            }
        case DECREASE_PAGE:
            return {
                ...state,
                page: state.page > 1 ? state.page - 1 : state.page
            }
        case FILTER_CHANGE_VALUE:
            return {
                ...state,
                filters: {
                    ...state.filters,
                    [action.payload.property]: action.payload.value
                }
            }
        case FILTER_GAMES:
            return {
                ...state,
                currentPages: action.payload,
                filteredPages: action.payload,
                page: 1,
                pages: action.payload.length
            }
        case GET_CURRENT_PAGES:
            return { //
                ...state,
                currentPages: action.payload,
                pages: action.payload.length
            }
        case CLEAR_FILTERS:
            return {
                ...state,
                filters: {
                    genre: "",
                    platform: "",
                    order: "",
                    originData: ""
                }
            }
        case RESTART_CURRENT_PAGE:
            return {
                ...state,
                currentPages: action.payload,
                pages: action.payload.length,
                page: 1,
            }
        default:
            return state;
    }
}

export default rootReducer;