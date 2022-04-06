import {createAction} from '@reduxjs/toolkit';
import {MoviesData} from '../types/movies';
import {AuthorizationStatus} from '../const';

const changeGenre = createAction<string>('main/custom-filter');
const changeMoviesCount = createAction('main/movies-count');
const resetMoviesCount = createAction('main/movies-count-reset');
const loadMovies = createAction<MoviesData>('data/load-movies');
const requireAuthorization = createAction<AuthorizationStatus>('user/require-authorization');
const setError = createAction<string>('main/setError');

export {
  changeGenre,
  changeMoviesCount,
  resetMoviesCount,
  loadMovies,
  requireAuthorization,
  setError,
};
