import React from 'react';
import { data } from '../data';
import Navbar from './Navbar';
import MovieCard from './MovieCard';
import { addMovies, setShowFavourites } from '../actions';

class App extends React.Component {
  componentDidMount () {
    const { store } = this.props;
    store.subscribe(() => {
      console.log('UPDATED');
      console.log('STATE', store.getState())
      this.forceUpdate();
    })
    // make api call
    // dispatch action
    store.dispatch(addMovies(data));
  }

  isMovieFavourite = (movie) => {
    const { movies } = this.props.store.getState();
    const { favourites } = movies; 
    const index = favourites.indexOf(movie);
    if(index !== -1){
      // found the movie
      return true;
    }
    return false;
  }

  handleTabChangeClick = (val) => {
    const { store } = this.props;
    store.dispatch(setShowFavourites(val));
  }

  render() {
    const { movies } = this.props.store.getState();
    const { list, favourites, showFavourites } = movies;
    const displayMovies = showFavourites ? favourites : list;
    return (
      <div className="App">
        <Navbar />
        <div className="main">
          <div className="tabs">
            <div className={`tab ${showFavourites ? '' : 'active-tabs'}`} onClick={() => { this.handleTabChangeClick(false) }}>Movies</div>
            <div className={`tab ${showFavourites ? 'active-tabs' : ''}`} onClick={() => { this.handleTabChangeClick(true) }}>Favourites</div>
          </div>
          <div className="list">
            { displayMovies.map((movie, index) => (
              <MovieCard
                movie={movie}
                key={`movie-${index}`}
                dispatch={this.props.store.dispatch}
                isMovieFavourite={this.isMovieFavourite(movie)}
              />
            )) }
          </div>
          { displayMovies.length === 0 ? <div className="no-movies">No Movies To Show</div> : null }
        </div>
      </div>
    );
  }
}

export default App;
