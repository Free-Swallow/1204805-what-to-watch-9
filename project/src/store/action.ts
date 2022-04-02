import {createAction} from '@reduxjs/toolkit';
import {MoviesData} from '../types/movies';

const changeGenre = createAction<string>('main/custom-filter');
const currentMovies = createAction<MoviesData>('main/current-movies');
const changeMoviesCount = createAction('main/movies-count');
const resetMoviesCount = createAction('main/movies-count-reset');

export {changeGenre, currentMovies, changeMoviesCount, resetMoviesCount};
