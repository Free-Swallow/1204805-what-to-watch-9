import {createReducer} from '@reduxjs/toolkit';
import {changeGenre, changeMoviesCount, resetMoviesCount, loadMovies, requireAuthorization, setError} from './action';
import {MoviesData} from '../types/movies';
import {basicGenre, AuthorizationStatus} from '../const';

type initialStateProps = {
  genre: string;
  moviesList: MoviesData;
  moviesCount: number;
  authorizationStatus: AuthorizationStatus;
  error: string;
  isDataLoaded: boolean;
}

const STEP_MOVIES_SHOW = 8;

const initialState: initialStateProps = {
  genre: basicGenre,
  moviesList: [],
  moviesCount: STEP_MOVIES_SHOW,
  authorizationStatus: AuthorizationStatus.Unknown,
  error: '',
  isDataLoaded: false,
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeGenre, (state, action) => {
      state.genre = action.payload;
    })
    .addCase(loadMovies, (state, action) => {
      state.moviesList = action.payload;
      state.isDataLoaded = true;
    })
    .addCase(changeMoviesCount, (state) => {
      state.moviesCount = state.moviesCount + STEP_MOVIES_SHOW;
    })
    .addCase(resetMoviesCount, (state) => {
      state.moviesCount = STEP_MOVIES_SHOW;
    })
    .addCase(requireAuthorization, (state, action) => {
      state.authorizationStatus = action.payload;
    })
    .addCase(setError, (state, action) => {
      state.error = action.payload;
    });
});

export type {initialStateProps};
export {reducer};
