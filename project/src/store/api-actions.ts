import {createAsyncThunk} from '@reduxjs/toolkit';
import {api, store} from './index';
import {MoviesData} from '../types/movies';
import {loadMovies, requireAuthorization, setError} from './action';
import {APIRoute, AuthorizationStatus, TIMEOUT_SHOW_ERROR} from '../const';
import {AuthData} from '../types/auth-data';
import {UserData} from '../types/user-data';
import {dropToken, saveToken} from '../services/token';
import {errorHandle} from '../services/error-handle';

// Асинхронные действия

// Получение списка фильмов
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

// Проверка наличия авторизации
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

// Авторизация
const loginAction = createAsyncThunk(
  'user/login',
  async ({login: email, password}: AuthData) => {
    try {
      const {data: {token}} = await api.post<UserData>(APIRoute.Login, {email, password});
      saveToken(token);
      store.dispatch(requireAuthorization(AuthorizationStatus.Auth));
    } catch (error) {
      errorHandle(error);
      store.dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
    }
  },
);

// Выход из приложения
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

const clearErrorAction = createAsyncThunk(
  'main/clear-error',
  () => {
    setTimeout(
      () => store.dispatch(setError('')),
      TIMEOUT_SHOW_ERROR,
    );
  },
);

export {fetchMoviesAction, checkAuthAction, loginAction, logoutAction, clearErrorAction};
