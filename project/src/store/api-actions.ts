import {createAsyncThunk} from '@reduxjs/toolkit';
import {api, store} from './index';
import {MoviesData, Movie, CommentsData, FavoriteMovie, CommentUser} from '../types/movies';
import {redirectToRoute} from './action';
import {
  loadCurrentMovie,
  loadMovies,
  loadPromoMovie,
  loadSimilarMovie,
  loadComments,
  isPushComment,
  loadFavoriteMovie,
  isPushFavoriteMovie
} from './data-process/data-process';
import {requireAuthorization} from './user-process/user-process';
import {APIRoute, AppRoute, AuthorizationStatus} from '../const';
import {AuthData} from '../types/auth-data';
import {UserData} from '../types/user-data';
import {dropToken, saveToken} from '../services/token';
import {errorHandle} from '../services/error-handle';

const fetchMoviesAction = createAsyncThunk(
  'data/films',
  async () => {
    try {
      const {data} = await api.get<MoviesData>(APIRoute.Movies);
      store.dispatch(loadMovies(data));
    } catch (error) {
      errorHandle(error);
    }
  },
);

const checkAuthAction = createAsyncThunk(
  'user/auth',
  async () => {
    try {
      await api.get(APIRoute.Login);
      store.dispatch(requireAuthorization(AuthorizationStatus.Auth));
    } catch (error) {
      errorHandle(error);
      store.dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
    }
  },
);

const loginAction = createAsyncThunk(
  'user/login',
  async ({login: email, password}: AuthData) => {
    try {
      const {data: {token}} = await api.post<UserData>(APIRoute.Login, {email, password});
      saveToken(token);
      store.dispatch(requireAuthorization(AuthorizationStatus.Auth));
      store.dispatch(redirectToRoute(AppRoute.Main));
    } catch (error) {
      errorHandle(error);
      store.dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
    }
  },
);

const logoutAction = createAsyncThunk(
  'user/logout',
  async () => {
    try {
      await api.delete(APIRoute.Logout);
      dropToken();
      store.dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
    } catch (error) {
      errorHandle(error);
    }
  },
);

const fetchCurrentMovieAction = createAsyncThunk(
  'data/fetchSelectedFilms',
  async (id: number) => {
    try {
      const {data} = await api.get<Movie>(`/films/${id}`);
      store.dispatch(loadCurrentMovie(data));
    } catch (error) {
      errorHandle(error);
    }
  },
);

const fetchSimilarMoviesAction = createAsyncThunk(
  'data/fetchSimilarFilms',
  async (id: number) => {
    try {
      const {data} = await api.get<MoviesData>(
        `${APIRoute.Movies}/${id}${APIRoute.Similar}`,
      );
      store.dispatch(loadSimilarMovie(data));
    } catch (error) {
      errorHandle(error);
    }
  },
);

const fetchPromoMovieAction = createAsyncThunk(
  'data/fetchPromoFilm',
  async () => {
    try {
      const {data} = await api.get<Movie>(APIRoute.Promo);
      store.dispatch(loadPromoMovie(data));
    } catch (error) {
      errorHandle(error);
    }
  },
);

const fetchCurrentMovieComments = createAsyncThunk(
  'data/fetchSelectedFilmComments',
  async (id: number) => {
    try {
      const {data} = await api.get<CommentsData>(`${APIRoute.Comments}/${id}`);
      store.dispatch(loadComments(data));
    } catch (error) {
      errorHandle(error);
    }
  },
);

const pushCurrentMovieComment = createAsyncThunk(
  'user/postSelectedFilmComment',
  async ({id, comment, rating}: CommentUser) => {
    try {
      await api.post<CommentUser>(`${APIRoute.Comments}/${id}`, {
        comment,
        rating,
      });
      store.dispatch(isPushComment(true));
    } catch (error) {
      errorHandle(error);
      store.dispatch(isPushComment(false));
    }
  },
);

const fetchFavoriteMovieList = createAsyncThunk(
  'data/fetchFavoriteFilmsList',
  async () => {
    try {
      const {data} = await api.get<MoviesData>(APIRoute.Favorite);
      store.dispatch(loadFavoriteMovie(data));
    } catch (error) {
      errorHandle(error);
    }
  },
);

const pushFavoriteMovie = createAsyncThunk(
  'data/postFavoriteFilm',
  async ({ id, favoriteStatus }: FavoriteMovie) => {
    try {
      const {data} = await api.post<Movie>(`${APIRoute.Favorite}/${id}/${favoriteStatus}`);
      store.dispatch(loadCurrentMovie(data));
      store.dispatch(isPushFavoriteMovie(true));
    } catch (error) {
      errorHandle(error);
      store.dispatch(isPushFavoriteMovie(false));
    }
  },
);

export {
  fetchMoviesAction,
  checkAuthAction,
  loginAction,
  logoutAction,
  fetchCurrentMovieAction,
  fetchPromoMovieAction,
  fetchSimilarMoviesAction,
  fetchCurrentMovieComments,
  fetchFavoriteMovieList,
  pushCurrentMovieComment,
  pushFavoriteMovie
};
