import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app';

const Setting = {
  movieName: 'The Grand Budapest Hotel',
  movieRelease: 2014,
  movieKind: 'Drama',
};

ReactDOM.render(
  <React.StrictMode>
    <App
      movieName={Setting.movieName}
      movieRelease={Setting.movieRelease}
      movieKind={Setting.movieKind}
    />
  </React.StrictMode>,
  document.getElementById('root'));
