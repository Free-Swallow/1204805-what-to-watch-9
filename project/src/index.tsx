import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app';
import {Movies, Comments} from './mock/films';
import {Provider} from 'react-redux';
import {store} from './store';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App
        movies = {Movies}
        comments={Comments}
      />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'));
