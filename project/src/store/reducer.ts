import {createReducer} from '@reduxjs/toolkit';
import {changeGenre, currentMovies} from './action';
import {MoviesData} from '../types/movies';

type initialStateProps = {
  genre: string;
  moviesList: MoviesData;
}

const initialState: initialStateProps = {
  genre: 'All genre',
  moviesList: [],
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeGenre, (state, action) => {
      state.genre = action.payload;
    })
    .addCase(currentMovies, (state, action) => {
      state.moviesList = action.payload;
    });
});

export type {initialStateProps};
export {reducer};
