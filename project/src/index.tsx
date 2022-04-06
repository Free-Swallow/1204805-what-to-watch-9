import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app';
import {Movies, Comments} from './mock/films';
import {Provider} from 'react-redux';
import {store} from './store';
import ErrorMessage from './components/error-message-component/error-message-component';
import {fetchMoviesAction, checkAuthAction} from './store/api-actions';

store.dispatch(fetchMoviesAction());
store.dispatch(checkAuthAction());

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ErrorMessage />
      <App
        movies = {Movies}
        comments={Comments}
      />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'));
