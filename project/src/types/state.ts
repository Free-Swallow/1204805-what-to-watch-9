import {store} from '../store';
import {AuthorizationStatus} from '../const';
import {CommentsData, Movie, MoviesData} from './movies';

type UserProcess = {
  authorizationStatus: AuthorizationStatus
};

type DataProcess = {
  moviesList: MoviesData;
  isDataLoaded: boolean;
  isMyListLoaded: boolean;
  currentMovie: Movie;
  promo: Movie;
  favoriteMoviesList: MoviesData;
  similarMovies: MoviesData;
  currentMovieComments: CommentsData;
  isCurrentMovieLoaded: boolean;
  isCommentPush: boolean;
  isFavoriteMoviePush: boolean;
};

type ContentProcess = {
  genre: string;
  moviesCount: number;
};

type State = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;

export type {State, AppDispatch, UserProcess, DataProcess, ContentProcess};
