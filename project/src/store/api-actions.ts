import {AxiosInstance} from 'axios';
import {AppDispatch, State} from '../types/state';
import {createAsyncThunk} from '@reduxjs/toolkit';
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

const fetchMoviesAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/films',
  async (_arg, {dispatch, extra: api}) => {
    try {
      const {data} = await api.get<MoviesData>(APIRoute.Movies);
      dispatch(loadMovies(data));
    } catch (error) {
      errorHandle(error);
    }
  },
);

const checkAuthAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'user/auth',
  async (_arg, {dispatch, extra: api}) => {
    try {
      await api.get(APIRoute.Login);
      dispatch(requireAuthorization(AuthorizationStatus.Auth));
    } catch (error) {
      errorHandle(error);
      dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
    }
  },
);

const loginAction = createAsyncThunk<void, AuthData, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'user/login',
  async ({login: email, password}: AuthData, {dispatch, extra: api}) => {
    try {
      const {data: {token}} = await api.post<UserData>(APIRoute.Login, {email, password});
      saveToken(token);
      dispatch(requireAuthorization(AuthorizationStatus.Auth));
      dispatch(redirectToRoute(AppRoute.Main));
    } catch (error) {
      errorHandle(error);
      dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
    }
  },
);

const logoutAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'user/logout',
  async (_arg, {dispatch, extra: api}) => {
    try {
      await api.delete(APIRoute.Logout);
      dropToken();
      dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
    } catch (error) {
      errorHandle(error);
    }
  },
);

const fetchCurrentMovieAction = createAsyncThunk<void, number, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/fetchSelectedFilms',
  async (id: number, {dispatch, extra: api}) => {
    try {
      const {data} = await api.get<Movie>(`/films/${id}`);
      dispatch(loadCurrentMovie(data));
    } catch (error) {
      errorHandle(error);
    }
  },
);

const fetchSimilarMoviesAction = createAsyncThunk<void, number, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/fetchSimilarFilms',
  async (id: number, {dispatch, extra: api}) => {
    try {
      const {data} = await api.get<MoviesData>(
        `${APIRoute.Movies}/${id}${APIRoute.Similar}`,
      );
      dispatch(loadSimilarMovie(data));
    } catch (error) {
      errorHandle(error);
    }
  },
);

const fetchPromoMovieAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/fetchPromoFilm',
  async (_arg, {dispatch, extra: api}) => {
    try {
      const {data} = await api.get<Movie>(APIRoute.Promo);
      dispatch(loadPromoMovie(data));
    } catch (error) {
      errorHandle(error);
    }
  },
);

const fetchCurrentMovieComments = createAsyncThunk<void, number, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/fetchSelectedFilmComments',
  async (id: number, {dispatch, extra: api}) => {
    try {
      const {data} = await api.get<CommentsData>(`${APIRoute.Comments}/${id}`);
      dispatch(loadComments(data));
    } catch (error) {
      errorHandle(error);
    }
  },
);

const pushCurrentMovieComment = createAsyncThunk<void, CommentUser, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'user/postSelectedFilmComment',
  async ({id, comment, rating}: CommentUser, {dispatch, extra: api}) => {
    try {
      await api.post<CommentUser>(`${APIRoute.Comments}/${id}`, {
        comment,
        rating,
      });
      dispatch(isPushComment(true));
    } catch (error) {
      errorHandle(error);
      dispatch(isPushComment(false));
    }
  },
);

const fetchFavoriteMovieList = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/fetchFavoriteFilmsList',
  async (_arg, {dispatch, extra: api}) => {
    try {
      const {data} = await api.get<MoviesData>(APIRoute.Favorite);
      dispatch(loadFavoriteMovie(data));
    } catch (error) {
      errorHandle(error);
    }
  },
);

const pushFavoriteMovie = createAsyncThunk<void, FavoriteMovie, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/postFavoriteFilm',
  async ({ id, favoriteStatus }: FavoriteMovie, {dispatch, extra: api}) => {
    try {
      const {data} = await api.post<Movie>(`${APIRoute.Favorite}/${id}/${favoriteStatus}`);
      dispatch(loadCurrentMovie(data));
      dispatch(isPushFavoriteMovie(true));
    } catch (error) {
      errorHandle(error);
      dispatch(isPushFavoriteMovie(false));
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
