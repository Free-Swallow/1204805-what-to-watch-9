import {render, screen} from '@testing-library/react';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {Provider} from 'react-redux';
import HistoryRouter from '../../components/history-route-component/history-route-component';
import AddReviewScreen from './add-review-screen';
import {createMemoryHistory} from 'history';
import {createAPI} from '../../services/api';
import thunk, {ThunkDispatch} from 'redux-thunk';
import {State} from '../../types/state';
import {Action} from 'redux';
import {AuthorizationStatus, defaultGenre, STEP_MOVIES_SHOW} from '../../const';
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
    authorizationStatus: AuthorizationStatus.Auth,
  },
});

describe('Screen: add review.', () => {
  it('Should correctly render.', () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <AddReviewScreen />
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByTestId(/background-img/i)).toBeInTheDocument();
    expect(screen.getByTestId(/visually-hidden/i)).toBeInTheDocument();
    expect(screen.getByTestId(/logo-1/i)).toBeInTheDocument();
    expect(screen.getByTestId(/logo-2/i)).toBeInTheDocument();
    expect(screen.getByTestId(/logo-3/i)).toBeInTheDocument();
    expect(screen.getByTestId(/review-nav/i)).toBeInTheDocument();
    expect(screen.getByText(/The Grand Budapest Hotel/i)).toBeInTheDocument();
    expect(screen.getByText(/Add review/i)).toBeInTheDocument();
    expect(screen.getByTestId('auth-img')).toBeInTheDocument();
    expect(screen.getByTestId('textarea')).toBeInTheDocument();
    expect(screen.getByTestId('add-review-button')).toBeInTheDocument();
  });
});
