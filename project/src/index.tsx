import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app';
import {Movies, Comments} from './mock/films';

ReactDOM.render(
  <React.StrictMode>
    <App
      movies = {Movies}
      comments={Comments}
    />
  </React.StrictMode>,
  document.getElementById('root'));
