const initialState = {
    allVideogames: [],
    videogames: [],
    genres: [],
    detail: {},
};

export default function rootReducer(state = initialState, action) {
    switch (action.type) {
        case "GET_VIDEOGAMES":
            return {
                ...state,
                videogames: action.payload,
                allVideogames: action.payload,
            };
        case "GET_GENRES":
            return {
                ...state,
                genres: action.payload,
            };
        case "FILTER_BY_GENRE":
            const allVideogamesFBG = state.allVideogames;
            const genreFiltered =
                action.payload === "All"
                    ? allVideogamesFBG
                    : allVideogamesFBG.filter((game) =>
                        game.genres.includes(action.payload)
                    );
            return {
                ...state,
                videogames: genreFiltered,
            };
        case "FILTER_BY_CREATOR":
            const allVideogamesFBC = state.allVideogames;
            const creatorFilter =
                action.payload === "false"
                    ? allVideogamesFBC.filter((game) => game.createdByUser === false)
                    : allVideogamesFBC.filter((game) => game.createdByUser === true);
            return {
                ...state,
                videogames:
                    action.payload === "All" ? state.allVideogames : creatorFilter,
            };
        case "SORT_BY_NAME":
            let sortedByNameArray =
                action.payload === "ascAlpha"
                    ? state.videogames.sort(function (a, b) {
                        if (a.name > b.name) {
                            return 1;
                        }
                        if (b.name > a.name) {
                            return -1;
                        }
                        return 0;
                    })
                    : state.videogames.sort(function (a, b) {
                        if (a.name > b.name) {
                            return -1;
                        }
                        if (b.name > a.name) {
                            return 1;
                        }
                        return 0;
                    });
            return {
                ...state,
                videogames: sortedByNameArray,
            };
        case "SORT_BY_RATING":
            let sortedByRating =
                action.payload === "ascRating"
                    ? state.videogames.sort(function (a, b) {
                        if (a.rating > b.rating) {
                            return -1;
                        }
                        if (b.rating > a.rating) {
                            return 1;
                        }
                        return 0;
                    })
                    : state.videogames.sort(function (a, b) {
                        if (a.rating > b.rating) {
                            return 1;
                        }
                        if (b.rating > a.rating) {
                            return -1;
                        }
                        return 0;
                    });
            return {
                ...state,
                videogames: sortedByRating,
            };
        case "GET_NAME_VIDEOGAMES":
            return {
                ...state,
                videogames: action.payload.error
                    ? [{ error: "No videogames found" }]
                    : action.payload,
            };
        case "POST_VIDEOGAME":
            return {
                ...state,
            };
        case "GET_DETAILS":
            return {
                ...state,
                detail: action.payload,
            };

        case "RESET_DETAIL":
            return {
                ...state,
                detail: [],
            };
        default:
            return { ...state };
    }
}
