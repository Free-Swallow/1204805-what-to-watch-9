import {createAction} from '@reduxjs/toolkit';
import {MoviesData} from '../types/movies';

const changeGenre = createAction<string>('main/custom-filter');
const currentMovies = createAction<MoviesData>('main/current-movies');

export {changeGenre, currentMovies};
