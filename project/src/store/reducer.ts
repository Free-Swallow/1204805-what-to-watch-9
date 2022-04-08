import {createReducer} from '@reduxjs/toolkit';
import {
  changeGenre,
  changeMoviesCount,
  resetMoviesCount,
  loadMovies,
  requireAuthorization,
  loadCurrentMovie,
  loadPromoMovie,
  loadSimilarMovie,
  loadComments,
  isPushComment,
  loadFavoriteMovie,
  isPushFavoriteMovie
} from './action';
import {MoviesData, Movie, CommentsData} from '../types/movies';
import {defaultGenre, AuthorizationStatus} from '../const';

type initialStateProps = {
  genre: string;
  moviesList: MoviesData;
  moviesCount: number;
  authorizationStatus: AuthorizationStatus;
  isDataLoaded: boolean;
  currentMovie: Movie;
  promo: Movie;
  favoriteMoviesList: MoviesData;
  similarMovies: MoviesData;
  currentMovieComments: CommentsData;
  isCurrentMovieLoaded: boolean;
  isCommentPush: boolean;
  isFavoriteMoviePush: boolean;
}

const STEP_MOVIES_SHOW = 8;

const initialState: initialStateProps = {
  genre: defaultGenre,
  moviesList: [],
  moviesCount: STEP_MOVIES_SHOW,
  authorizationStatus: AuthorizationStatus.Unknown,
  isDataLoaded: false,
  currentMovie: Object.assign({}),
  promo: Object.assign({}),
  favoriteMoviesList: [],
  similarMovies: [],
  currentMovieComments: [],
  isCurrentMovieLoaded: false,
  isCommentPush: false,
  isFavoriteMoviePush: false,
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
    .addCase(loadCurrentMovie, (state, action) => {
      state.currentMovie = action.payload;
      state.isCurrentMovieLoaded = true;
    })
    .addCase(loadPromoMovie, (state, action) => {
      state.promo = action.payload;
    })
    .addCase(loadSimilarMovie, (state, action) => {
      state.similarMovies = action.payload;
    })
    .addCase(loadComments, (state, action) => {
      state.currentMovieComments = action.payload;
    })
    .addCase(isPushComment, (state, action) => {
      state.isCommentPush = action.payload;
    })
    .addCase(loadFavoriteMovie, (state, action) => {
      state.favoriteMoviesList = action.payload;
    })
    .addCase(isPushFavoriteMovie, (state, action) => {
      state.isFavoriteMoviePush = action.payload;
    });
});

export type {initialStateProps};
export {reducer};
