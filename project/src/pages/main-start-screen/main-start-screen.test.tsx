import {render, screen} from '@testing-library/react';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {Provider} from 'react-redux';
import HistoryRouter from '../../components/history-route-component/history-route-component';
import MainStartScreen from './main-start-screen';
import {createMemoryHistory} from 'history';
import {createAPI} from '../../services/api';
import thunk, {ThunkDispatch} from 'redux-thunk';
import {State} from '../../types/state';
import {Action} from 'redux';
import {AuthorizationStatus, defaultGenre, STEP_MOVIES_SHOW} from '../../const';
import {makeFakeMovie} from '../../utils/mocks';
import userEvent from '@testing-library/user-event';
import * as Redux from 'react-redux';

const history = createMemoryHistory();
const api = createAPI();
const middlewares = [thunk.withExtraArgument(api)];
const mockStore = configureMockStore<
  State,
  Action,
  ThunkDispatch<State, typeof api, Action>
  >(middlewares);
const movie = makeFakeMovie();
const promoFake = makeFakeMovie();
promoFake.name = 'Fake Movie';
const moviesList = [makeFakeMovie(), makeFakeMovie()];
moviesList[1].id = 12;
const store = mockStore({
  CONTENT: {
    genre: defaultGenre,
    moviesCount: STEP_MOVIES_SHOW,
  },
  DATA: {
    moviesList: moviesList,
    isDataLoaded: true,
    isMyListLoaded: true,
    currentMovie: movie,
    promo: promoFake,
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

describe('Screen: main start.', () => {
  it('Should correctly render.', () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <MainStartScreen />
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByText(/WTW/i)).toBeInTheDocument();
    expect(screen.getByText(/Sign in/i)).toBeInTheDocument();
    expect(screen.getByText(/Play/i)).toBeInTheDocument();
    expect(screen.getByText(/My list/i)).toBeInTheDocument();
    expect(screen.getByText(/Catalog/i)).toBeInTheDocument();
    expect(screen.getByTestId(/tab-genre-All genres/i)).toBeInTheDocument();
    expect(screen.getByTestId(/tab-genre-Fantasy/i)).toBeInTheDocument();
    expect(screen.getByText(/© 2019 What to watch Ltd./i)).toBeInTheDocument();
  });

  it('Should show choose genre movie.', () => {
    const dispatch = jest.fn();
    const useDispatch = jest.spyOn(Redux, 'useDispatch');

    useDispatch.mockReturnValue(dispatch);
    moviesList[1].genre = 'Horror';
    moviesList[1].name = 'Avatar-02';

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <MainStartScreen />
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByTestId(/tab-genre-All genres/i)).toBeInTheDocument();
    expect(screen.getByTestId(/tab-genre-Fantasy/i)).toBeInTheDocument();
    expect(screen.getByTestId(/tab-genre-Horror/i)).toBeInTheDocument();
    expect(screen.getByTestId(/tab-genre-All genres/i)).toHaveClass('catalog__genres-item--active');
    expect(screen.getByText(/Avatar-02/i)).toBeInTheDocument();
    expect(screen.getByText(/The Grand Budapest Hotel/i)).toBeInTheDocument();

    userEvent.click(screen.getByText(/Horror/i));

    expect(dispatch).toBeCalledTimes(2);
    expect(dispatch).nthCalledWith(1, {
      payload: 'Horror',
      type: 'CONTENT/changeGenre',
    });
    expect(dispatch).nthCalledWith(2, {
      payload: undefined,
      type: 'CONTENT/resetMoviesCount',
    });
  });
});
