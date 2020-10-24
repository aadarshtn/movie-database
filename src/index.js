import React, { createContext } from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import './index.css';
import App from './components/App';
import rootReducer from './reducers';

// curried form of function logger(obj, next, action)
// The Form Of Curried Fn Will Be : function logger(obj)(next)(action)
// const logger = function({ dispatch, getState }) {
//   return function (next) {
//     return function (action) {
//       // Middleware Code
//       console.log("ACTION_TYPE = ", action.type);
//       next(action);
//     }
//   }
// }

// Another form of curried middleware fn using arrow syntax
const logger = ({ dispatch, setState }) => (next) => (action) => {
  // Middleware Code
  // console.log("ACTION_TYPE = ", action.type);
  next(action);
}

// const thunk = ({ dispatch, setState }) => (next) => (action) => {
//   if (typeof(action) === 'function'){
//     action(dispatch);
//     return;
//   }
//   next(action);
// }

const store = createStore(rootReducer, applyMiddleware(logger, thunk));
console.log('store: ', store);
// console.log('BEFORE STATE', store.getState());

// store.dispatch({
//   type: 'ADD_MOVIES',
//   movies: [{ name: "Superman"}]
// });

// console.log('AFTER STATE', store.getState());

export const StoreContext = createContext();
console.log('StoreContext', StoreContext);

// Creating A Sepereate Class For Store Context Provider
class Provider extends React.Component{
  render () {
    const { store } = this.props;
    return (
      <StoreContext.Provider value={store}>
        {this.props.children}
      </StoreContext.Provider>
    );
  }
}

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
