import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import './styles/index.css';
import Footer from "./components/static/Footer";
import Nav from "./components/static/Nav";
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import rootReducer from './reducers';
import axios from "axios";


const store = createStore(
  rootReducer, composeWithDevTools(applyMiddleware(thunk, logger))
)

const root = document.getElementById("root");



ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <Provider store={store} >
      <App />
      <Nav />
      <Footer />
    </Provider>
  </React.StrictMode>
);
