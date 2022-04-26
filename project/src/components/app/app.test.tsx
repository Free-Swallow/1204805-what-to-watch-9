import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {Provider} from 'react-redux';
import App from './app';
import {AuthorizationStatus, defaultGenre, STEP_MOVIES_SHOW, AppRoute} from '../../const';
import HistoryRouter from '../history-route-component/history-route-component';
import {makeFakeMovie} from '../../utils/mocks';
import {createAPI} from '../../services/api';
import thunk, {ThunkDispatch} from 'redux-thunk';
import {State} from '../../types/state';
import {Action} from 'redux';

const movie = makeFakeMovie();
const history = createMemoryHistory();
const api = createAPI();
const middlewares = [thunk.withExtraArgument(api)];
const mockStore = configureMockStore<
  State,
  Action,
  ThunkDispatch<State, typeof api, Action>
  >(middlewares);

const store = mockStore({
  CONTENT: {
    genre: defaultGenre,
    moviesCount: STEP_MOVIES_SHOW,
  },
  DATA: {
    moviesList: [movie],
    isDataLoaded: true,
    isMyListLoaded: true,
    currentMovie: movie,
    promo: movie,
    favoriteMoviesList: [],
    similarMovies: [movie],
    currentMovieComments: [],
    isCurrentMovieLoaded: true,
    isCommentPush: true,
    isFavoriteMoviePush: true,
  },
  USER: {
    authorizationStatus: AuthorizationStatus.NoAuth,
  },
});

const store1 = mockStore({
  CONTENT: {
    genre: defaultGenre,
    moviesCount: STEP_MOVIES_SHOW,
  },
  DATA: {
    moviesList: [],
    isDataLoaded: true,
    isMyListLoaded: true,
    currentMovie: movie,
    promo: movie,
    favoriteMoviesList: [movie],
    similarMovies: [movie],
    currentMovieComments: [],
    isCurrentMovieLoaded: true,
    isCommentPush: true,
    isFavoriteMoviePush: true,
  },
  USER: {
    authorizationStatus: AuthorizationStatus.Auth,
  },
});

const fakeApp = (
  <Provider store={store}>
    <HistoryRouter history={history}>
      <App />
    </HistoryRouter>
  </Provider>
);

const fakeApp1 = (
  <Provider store={store1}>
    <HistoryRouter history={history}>
      <App />
    </HistoryRouter>
  </Provider>
);

describe('Application Routing', () => {
  it('should render "Main Page" when user navigate to "/" (No Auth).', () => {
    history.push(AppRoute.Main);

    render(fakeApp);

    expect(screen.getByText(/Catalog/i)).toBeInTheDocument();
    expect(screen.getByText(/WTW/i)).toBeInTheDocument();
    expect(screen.getByText(/Sign in/i)).toBeInTheDocument();
    expect(screen.getByText(/Play/i)).toBeInTheDocument();
    expect(screen.getByText(/My list/i)).toBeInTheDocument();
    expect(screen.getByTestId(/kind-tabs/i)).toBeInTheDocument();
    expect(screen.getByTestId(/movie-card/i)).toBeInTheDocument();
  });

  it('should render "Login screen" when user navigate to "/login".', () => {
    history.push(AppRoute.SignIn);

    render(fakeApp);

    expect(screen.getByTestId(/sign-in-title/i)).toBeInTheDocument();
    expect(screen.getByText(/Email address/i)).toBeInTheDocument();
    expect(screen.getByText(/Password/i)).toBeInTheDocument();
    expect(screen.getByTestId(/login-button/i)).toBeInTheDocument();
  });

  it('should render "Movie page Screen" when user navigate to "/films".', () => {
    history.push(`${AppRoute.Film}/8`);

    render(fakeApp);

    expect(screen.getByText(/WTW/i)).toBeInTheDocument();
    expect(screen.getByText(/Sign in/i)).toBeInTheDocument();
    expect(screen.getByText(/Play/i)).toBeInTheDocument();
    expect(screen.getByText(/My list/i)).toBeInTheDocument();
    expect(screen.getByText(/More like this/i)).toBeInTheDocument();
  });

  it('should render "My List Screen", when user navigate to "/mylist" (Auth)', () => {
    history.push(AppRoute.MyList);

    render(fakeApp1);

    expect(screen.getByText(/My list/i)).toBeInTheDocument();
    expect(screen.getByText(/Catalog/i)).toBeInTheDocument();
    expect(screen.getByTestId(/movie-card/i)).toBeInTheDocument();
    expect(screen.getByText(/Sign out/i)).toBeInTheDocument();
  });

  it('should render "Add Reviews" when user navigate to "/reviews"', () => {
    history.push(AppRoute.AddReview);

    render(fakeApp1);

    expect(screen.getByText(/WTW/i)).toBeInTheDocument();
    expect(screen.getByText(/Add review/i)).toBeInTheDocument();
    expect(screen.getByText(/Sign out/i)).toBeInTheDocument();
    expect(screen.getByTestId(/add-review-button/i)).toBeInTheDocument();
  });

  it('should render "Video-player" when user navigate to "/player"', () => {
    history.push(`${AppRoute.Player}/8`);
    window.HTMLMediaElement.prototype.play = jest.fn();
    window.HTMLMediaElement.prototype.pause = jest.fn();

    render(fakeApp);

    expect(screen.getByText(/Exit/i)).toBeInTheDocument();
    expect(screen.getByText(/Toggler/i)).toBeInTheDocument();
    expect(screen.getByText(/Full screen/i)).toBeInTheDocument();
    expect(screen.getByText(/Play/i)).toBeInTheDocument();
  });

  it('should render "Page 404" when user navigate to non-existent route', () => {
    history.push('/Ara-Ara');

    render(fakeApp);

    expect(screen.getByText(/Ooops! 404. Something is wrong./i)).toBeInTheDocument();
    expect(screen.getByText(/Return Main page?/i)).toBeInTheDocument();
  });
});
