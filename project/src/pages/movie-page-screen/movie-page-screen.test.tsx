import {render, screen} from '@testing-library/react';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {Provider} from 'react-redux';
import HistoryRouter from '../../components/history-route-component/history-route-component';
import MoviePageScreen from './movie-page-screen';
import {createMemoryHistory} from 'history';
import {createAPI} from '../../services/api';
import thunk, {ThunkDispatch} from 'redux-thunk';
import {State} from '../../types/state';
import {Action} from 'redux';
import {AuthorizationStatus} from '../../const';
import {makeFakeMovie} from '../../utils/mocks';

const history = createMemoryHistory();
const api = createAPI();
const middlewares = [thunk.withExtraArgument(api)];
const mockStore = configureMockStore<
  State,
  Action,
  ThunkDispatch<State, typeof api, Action>
  >(middlewares);
const movie = makeFakeMovie();
const moviesList = [makeFakeMovie(), makeFakeMovie()];
const store = mockStore({
  DATA: {
    moviesList: [],
    isDataLoaded: true,
    isMyListLoaded: false,
    currentMovie: movie,
    promo: Object.assign({}),
    favoriteMoviesList: [],
    similarMovies: moviesList,
    currentMovieComments: [],
    isCurrentMovieLoaded: true,
    isCommentPush: true,
    isFavoriteMoviePush: false,
  },
  USER: {
    authorizationStatus: AuthorizationStatus.NoAuth,
  },
});
const store1 = mockStore({
  DATA: {
    moviesList: [],
    isDataLoaded: true,
    isMyListLoaded: false,
    currentMovie: movie,
    promo: Object.assign({}),
    favoriteMoviesList: [],
    similarMovies: moviesList,
    currentMovieComments: [],
    isCurrentMovieLoaded: true,
    isCommentPush: true,
    isFavoriteMoviePush: false,
  },
  USER: {
    authorizationStatus: AuthorizationStatus.Auth,
  },
});

movie.name = 'Fake Movie';
moviesList[0].id = 2;
moviesList[1].id = 12;
moviesList[0].name = 'first movie';
moviesList[1].name = 'second movie';

describe('Screen: movie page.', () => {
  it('Should correctly render.', () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <MoviePageScreen />
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByTestId(/background-img/i)).toBeInTheDocument();
    expect(screen.getByText(/WTW/i)).toBeInTheDocument();
    expect(screen.getByText(/Sign in/i)).toBeInTheDocument();
    expect(screen.getByText(/Fake Movie/i)).toBeInTheDocument();
    expect(screen.getByText(/Fantasy/i)).toBeInTheDocument();
    expect(screen.getByText(/Play/i)).toBeInTheDocument();
    expect(screen.getByText(/My list/i)).toBeInTheDocument();
    expect(screen.queryByText(/Add review/i)).not.toBeInTheDocument();
    expect(screen.getByText(/Overview/i)).toBeInTheDocument();
    expect(screen.getByText(/Details/i)).toBeInTheDocument();
    expect(screen.getByText(/Reviews/i)).toBeInTheDocument();
    expect(screen.getByText(/More like this/i)).toBeInTheDocument();
    expect(screen.getByText(/first movie/i)).toBeInTheDocument();
    expect(screen.getByText(/second movie/i)).toBeInTheDocument();
    expect(screen.getByText(/© 2019 What to watch Ltd./i)).toBeInTheDocument();
  });

  it('Should correctly render when auth status "Auth".', () => {
    render(
      <Provider store={store1}>
        <HistoryRouter history={history}>
          <MoviePageScreen />
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByText(/Add review/i)).toBeInTheDocument();
    expect(screen.getByTestId('auth-img')).toBeInTheDocument();
  });
});
