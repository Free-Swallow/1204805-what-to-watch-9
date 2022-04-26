import {render, screen} from '@testing-library/react';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {Provider} from 'react-redux';
import HistoryRouter from '../../components/history-route-component/history-route-component';
import MyListScreen from './my-list-screen';
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
const moviesList = [makeFakeMovie(), makeFakeMovie()];
moviesList[1].name = 'Fake movie';
moviesList[1].id = 12;
const store = mockStore({
  DATA: {
    moviesList: [],
    isDataLoaded: false,
    isMyListLoaded: true,
    currentMovie: Object.assign({}),
    promo: Object.assign({}),
    favoriteMoviesList: moviesList,
    similarMovies: [],
    currentMovieComments: [],
    isCurrentMovieLoaded: false,
    isCommentPush: false,
    isFavoriteMoviePush: false,
  },
  USER: {
    authorizationStatus: AuthorizationStatus.Auth,
  },
});

describe('Screen: my list.', () => {
  it('Should correctly render.', () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <MyListScreen />
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByText(/My list/i)).toBeInTheDocument();
    expect(screen.getByText(/Catalog/i)).toBeInTheDocument();
    expect(screen.getByText(/The Grand Budapest Hotel/i)).toBeInTheDocument();
    expect(screen.getByText(/Fake movie/i)).toBeInTheDocument();
    expect(screen.getByText(/© 2019 What to watch Ltd./i)).toBeInTheDocument();
    expect(screen.getByTestId('auth-img')).toBeInTheDocument();
  });
});
