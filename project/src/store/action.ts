import {createAction} from '@reduxjs/toolkit';
import {MoviesData, Movie, CommentsData} from '../types/movies';
import {AppRoute, AuthorizationStatus} from '../const';

const changeGenre = createAction<string>('main/custom-filter');
const changeMoviesCount = createAction('main/movies-count');
const resetMoviesCount = createAction('main/movies-count-reset');
const loadMovies = createAction<MoviesData>('data/load-movies');
const requireAuthorization = createAction<AuthorizationStatus>('user/require-authorization');
const redirectToRoute = createAction<AppRoute>('main/redirect-to-route');
const loadCurrentMovie = createAction<Movie>('films/load-current-movie');
const loadPromoMovie = createAction<Movie>('main/promo-movies');
const loadSimilarMovie = createAction<MoviesData>('films/similar-movies');
const loadComments = createAction<CommentsData>('films/comments-data');
const loadFavoriteMovie = createAction<MoviesData>('my-list/favorite-list');
const pushComment = createAction<Comment>('films/push-comment');
const isPushComment = createAction<boolean>('add-review/push-comment');
const isPushFavoriteMovie = createAction<boolean>('movie/favorite-movie-push');

export {
  changeGenre,
  changeMoviesCount,
  resetMoviesCount,
  loadMovies,
  requireAuthorization,
  redirectToRoute,
  loadCurrentMovie,
  loadPromoMovie,
  loadSimilarMovie,
  loadComments,
  pushComment,
  isPushComment,
  loadFavoriteMovie,
  isPushFavoriteMovie
};
