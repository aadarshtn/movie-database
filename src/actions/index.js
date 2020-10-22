// action types
export const ADD_MOVIES = 'ADD_MOVIES';
export const ADD_TO_FAVOURITE = 'ADD_TO_FAVOURITE';
export const REMOVE_FROM_FAVOURITES = 'REMOVE_FROM_FAVOURITES';
export const SET_SHOW_FAVOURITES = 'SET_SHOW_FAVOURITES';
export const ADD_MOVIE_TO_LIST = 'ADD_MOVIE_TO_LIST';
export const ADD_SEARCH_RESULT = 'ADD_SEARCH_RESULT';

// action creators
export function addMovies (movies) {
    return {
        type: ADD_MOVIES,
        movies
    }
}

export function addToFav (movie) {
    return {
        type: ADD_TO_FAVOURITE,
        movie
    }
}

export function removeFromFav (movie) {
    return {
        type: REMOVE_FROM_FAVOURITES,
        movie
    }
}

export function setShowFavourites (val) {
    return {
        type: SET_SHOW_FAVOURITES,
        val
    }
}

export function addMovieToList (movie) {
    return {
        type: ADD_MOVIE_TO_LIST,
        movie
    }
}

export function handleMovieSearch (movie) {
    const url = `http://www.omdbapi.com/?apikey=be3e9918&t=${movie}`;
    
    return function (dispatch) { 
        fetch(url)
            .then(response => response.json())
            .then(movie => {
                console.log('movie', movie);
                //do a dispatch but we dont have access to dispatch inside fetch,
                // so we wrapped fetch in a fn which gets dispatch as argument
                dispatch(getSearchResult(movie));

            })
    }
}

export function getSearchResult (movie) {
    return {
        type: ADD_SEARCH_RESULT,
        movie
    };
};