import React from 'react';
import { addToFav, removeFromFav } from '../actions';

class MovieCard extends React.Component {

    handleFavouriteClick = () => {
        const { movie } = this.props;
        this.props.dispatch(addToFav(movie));
    }

    handleUnFavouriteClick = () => {
        const { movie } = this.props;
        this.props.dispatch(removeFromFav(movie));
    }

    render () {
        const { movie, isMovieFavourite } = this.props;
        return (
            <div className="movie-card">
                <div className="left">
                    <img src={movie.Poster} alt="movie-poster"></img>
                </div>
                <div className="right">
                    <div className="title">{movie.Title}</div>
                    <div className="plot">{movie.Plot}</div>
                    <div className="footer">
                        <div className="rating">{movie.imdbRating}</div>
                        {
                            isMovieFavourite
                            ? <button className="unfavourite-btn" onClick = {this.handleUnFavouriteClick}>UNFAVOURITE</button>
                            : <button className="favourite-btn" onClick = {this.handleFavouriteClick}>FAVOURITE</button>
                        }
                    </div>
                </div>
            </div>
        );
    }
}

export default MovieCard;
