import React from 'react';

class MovieCard extends React.Component {
    render () {
        const {movies} = this.props;    
        return (
            <div className="movie-card">
                <div className="left">
                    <img src={movies.Poster}></img>
                </div>
                <div className="right">
                    <div className="title">{movies.Title}</div>
                    <div className="plot">{movies.Plot}</div>
                    <div className="footer">
                        <div className="rating"></div>
                        <button>FAVOURITE</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default MovieCard;
