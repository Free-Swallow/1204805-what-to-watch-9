import {createReducer} from '@reduxjs/toolkit';
import {changeGenre, currentMovies, changeMoviesCount, resetMoviesCount} from './action';
import {MoviesData} from '../types/movies';

type initialStateProps = {
  genre: string;
  moviesList: MoviesData;
  moviesCount: number;
}

const STEP_MOVIES_SHOW = 8;

const initialState: initialStateProps = {
  genre: 'All genre',
  moviesList: [],
  moviesCount: STEP_MOVIES_SHOW,
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeGenre, (state, action) => {
      state.genre = action.payload;
    })
    .addCase(currentMovies, (state, action) => {
      state.moviesList = action.payload;
    })
    .addCase(changeMoviesCount, (state) => {
      state.moviesCount = state.moviesCount + STEP_MOVIES_SHOW;
    })
    .addCase(resetMoviesCount, (state) => {
      state.moviesCount = STEP_MOVIES_SHOW;
    });
});

export type {initialStateProps};
export {reducer};
