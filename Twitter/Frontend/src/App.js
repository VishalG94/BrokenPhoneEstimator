import React, { Component } from 'react';
import './App.css';
import Main from './components/Main';
import {BrowserRouter} from 'react-router-dom';
import { Provider } from 'react-redux'
// import { createStore } from 'redux'
import promise from "redux-promise"
import reducers from './reducers'
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk';

const composePlugin = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composePlugin(applyMiddleware(promise, thunk)))
// const store= createStore(reducers, applyMiddleware(thunk))




//App Component
class App extends Component {
  render() {
    return (
      //Use Browser Router to route to different pages
      <Provider store={store}>
      <BrowserRouter>
        <div>
          {/* App Component Has a Child Component called Main*/}
          <Main/>
        </div>
      </BrowserRouter>
      </Provider>
    );
  }
}
//Export the App component so that it can be used in index.js
export default App;
