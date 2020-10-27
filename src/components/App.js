import React from 'react';
import { connect } from 'react-redux';
import { data } from '../data';
import Navbar from './Navbar';
import MovieCard from './MovieCard';
import { addMovies, setShowFavourites } from '../actions';
// import { connect } from '..';

class App extends React.Component {
  componentDidMount () {
    // make api call
    // dispatch action
    this.props.dispatch(addMovies(data));
  }

  isMovieFavourite = (movie) => {
    const { movies } = this.props;
    const { favourites } = movies; 
    const index = favourites.indexOf(movie);
    if(index !== -1){
      // found the movie
      return true;
    }
    return false;
  }

  handleTabChangeClick = (val) => {
    const { dispatch } = this.props;
    dispatch(setShowFavourites(val));
  }

  render() {
    const { movies, search } = this.props;
    const { list, favourites, showFavourites, showSearchResults } = movies;
    const displayMovies = showFavourites ? favourites : list;

    return (
      <div className="App">
        <Navbar search={search} showSearchResults={showSearchResults}/>
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
                dispatch={this.props.dispatch}
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

// class AppWrapper extends React.Component {
//   render () {
//     return (
//       <StoreContext.Consumer>
//         {(store) => <App store={store}/>}
//       </StoreContext.Consumer>
//     );
//   }
// }

function mapStateToProps (state) {
  return {
    movies: state.movies,
    search: state.search
  }
}
const connectedAppComponent = connect(mapStateToProps)(App);

export default connectedAppComponent;
