import {Action} from 'redux';
import thunk, {ThunkDispatch} from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {createAPI} from '../services/api';
import {
  checkAuthAction,
  fetchCurrentMovieAction, fetchCurrentMovieComments, fetchFavoriteMovieList,
  fetchMoviesAction, fetchPromoMovieAction,
  fetchSimilarMoviesAction,
  loginAction,
  logoutAction, pushCurrentMovieComment, pushFavoriteMovie
} from './api-actions';
import {requireAuthorization} from './user-process/user-process';
import {APIRoute} from '../const';
import {State} from '../types/state';
import {AuthData} from '../types/auth-data';
import {makeFakeComment, makeFakeMovie, pushFakeFavoriteMovie} from '../utils/mocks';
import {
  isPushComment, isPushFavoriteMovie,
  loadComments,
  loadCurrentMovie, loadFavoriteMovie,
  loadMovies,
  loadPromoMovie,
  loadSimilarMovie
} from './data-process/data-process';

describe('Async actions', () => {
  const api = createAPI();
  const mockAPI = new MockAdapter(api);
  const middlewares = [thunk.withExtraArgument(api)];

  const mockStore = configureMockStore<
    State,
    Action,
    ThunkDispatch<State, typeof api, Action>
    >(middlewares);

  it('should authorization status is "auth" when server return 200', async () => {
    const store = mockStore();
    mockAPI
      .onGet(APIRoute.Login)
      .reply(200 ,[]);

    expect(store.getActions()).toEqual([]);

    await store.dispatch(checkAuthAction());

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toContain(requireAuthorization.toString());
  });

  it('should dispatch RequriedAuthorization and RedirectToRoute when POST /login', async () => {
    const fakeUser: AuthData = {login: 'test@login.com', password: '1234qwerty'};

    mockAPI
      .onPost(APIRoute.Login)
      .reply(200, {token: 'x-token'});

    const store = mockStore();
    Storage.prototype.setItem = jest.fn();

    await store.dispatch(loginAction(fakeUser));

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toContain(requireAuthorization.toString());

    expect(Storage.prototype.setItem).toBeCalledTimes(1);
    expect(Storage.prototype.setItem).toBeCalledWith('wtw-token', 'x-token');
  });

  it('should dispatch load movies when GET /films', async () => {
    const mockMovies = [makeFakeMovie()];
    mockAPI
      .onGet(APIRoute.Movies)
      .reply(200, mockMovies);

    const store = mockStore();

    await store.dispatch(fetchMoviesAction());

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toContain(loadMovies.toString());
  });

  it('should dispatch logout when delete /logout', async () => {
    mockAPI
      .onDelete(APIRoute.Logout)
      .reply(204);

    const store = mockStore();
    Storage.prototype.removeItem = jest.fn();

    await store.dispatch(logoutAction());

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toContain(requireAuthorization.toString());

    expect(Storage.prototype.removeItem).toBeCalledTimes(1);
    expect(Storage.prototype.removeItem).toBeCalledWith('wtw-token');
  });

  it('should dispatch load current movie when GET /films/:id', async () => {
    const mockMovie = makeFakeMovie();
    const fakeIdMovie = 8;
    mockAPI
      .onGet(`${APIRoute.Movies}/${fakeIdMovie}`)
      .reply(200, mockMovie);

    const store = mockStore();

    await store.dispatch(fetchCurrentMovieAction(fakeIdMovie));

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toContain(loadCurrentMovie.toString());
  });

  it('should dispatch load similar movies list when GET /similar', async () => {
    const mockMovies = [makeFakeMovie()];
    const fakeIdMovie = 2;
    mockAPI
      .onGet(`${APIRoute.Movies}/${fakeIdMovie}${APIRoute.Similar}`)
      .reply(200, mockMovies);

    const store = mockStore();

    await store.dispatch(fetchSimilarMoviesAction(fakeIdMovie));

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toContain(loadSimilarMovie.toString());
  });

  it('should dispatch load promo movie when GET /promo', async () => {
    const mockMovie = makeFakeMovie();
    mockAPI
      .onGet(APIRoute.Promo)
      .reply(200, mockMovie);

    const store = mockStore();

    await store.dispatch(fetchPromoMovieAction());

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toContain(loadPromoMovie.toString());
  });

  it('should dispatch load comment to current movie when GET /comments', async () => {
    const fakeIdMovie = 12;
    const mockComments = [makeFakeComment()];
    mockAPI
      .onGet(`${APIRoute.Comments}/${fakeIdMovie}`)
      .reply(200, mockComments);

    const store = mockStore();

    await store.dispatch(fetchCurrentMovieComments(fakeIdMovie));

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toContain(loadComments.toString());
  });

  it('should dispatch push comment movie when POST /comments', async () => {
    const fakeComment = makeFakeComment();
    const {id} = fakeComment;
    mockAPI
      .onPost(`${APIRoute.Comments}/${id}`)
      .reply(200);

    const store = mockStore();

    await store.dispatch(pushCurrentMovieComment(fakeComment));

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toContain(isPushComment.toString());
  });

  it('should dispatch load favorite list when GET /favorite', async () => {
    const mockMovies = [makeFakeMovie()];
    mockAPI
      .onGet(APIRoute.Favorite)
      .reply(200, mockMovies);

    const store = mockStore();

    await store.dispatch(fetchFavoriteMovieList());

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toContain(loadFavoriteMovie.toString());
  });

  it('should dispatch push favorite movie when POST /favorite', async () => {
    const mockFavoritePush = pushFakeFavoriteMovie();
    const {id, favoriteStatus} = mockFavoritePush;
    const mockFakeMovie = makeFakeMovie();
    mockAPI
      .onPost(`${APIRoute.Favorite}/${id}/${favoriteStatus}`)
      .reply(200, mockFakeMovie);

    const store = mockStore();

    await store.dispatch(pushFavoriteMovie(mockFavoritePush));

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toContain(loadCurrentMovie.toString());
    expect(actions).toContain(isPushFavoriteMovie.toString());
  });
});
