import {render, screen} from '@testing-library/react';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {createMemoryHistory} from 'history';
import {Provider} from 'react-redux';
import {Routes, Route} from 'react-router-dom';
import HistoryRouter from '../history-route-component/history-route-component';
import TabsMovieComponent from './tabs-movie-component';
import {makeFakeComment, makeFakeMovie} from '../../utils/mocks';
import {AppRoute} from '../../const';
import MoviePageDetailsComponent from '../movie-page-details-component/movie-page-details-component';
import MoviePageReviewsComponent from '../movie-page-reviews-component/movie-page-reviews-component';
import userEvent from '@testing-library/user-event';
import {createAPI} from '../../services/api';
import thunk, {ThunkDispatch} from 'redux-thunk';
import {State} from '../../types/state';
import {Action} from 'redux';

const history = createMemoryHistory();
const api = createAPI();
const middlewares = [thunk.withExtraArgument(api)];
const mockStore = configureMockStore<
  State,
  Action,
  ThunkDispatch<State, typeof api, Action>
  >(middlewares);
const movie = makeFakeMovie();
const commentList = [makeFakeComment(), makeFakeComment(), makeFakeComment()];
const store = mockStore({
  DATA: {
    moviesList: [movie],
    isDataLoaded: true,
    isMyListLoaded: true,
    currentMovie: movie,
    promo: movie,
    favoriteMoviesList: [],
    similarMovies: [movie],
    currentMovieComments: commentList,
    isCurrentMovieLoaded: true,
    isCommentPush: true,
    isFavoriteMoviePush: true,
  },
});

describe('Component: tabs movie component.', () => {
  it('Should correctly render.', () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <TabsMovieComponent/>
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByText(/Overview/i)).toBeInTheDocument();
    expect(screen.getByText(/Details/i)).toBeInTheDocument();
    expect(screen.getByText(/Reviews/i)).toBeInTheDocument();

    expect(screen.getByText(/3.4/i)).toBeInTheDocument();
    expect(screen.getByText(/Normal/i)).toBeInTheDocument();
    expect(screen.getByText(/160757 ratings/i)).toBeInTheDocument();
  });

  it('Should navigate "/details" when user clicked Details.', () => {
    history.push('/fake-page');

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Routes>
            <Route path={AppRoute.Details} element={<MoviePageDetailsComponent />} />
            <Route path="*" element={<TabsMovieComponent />} />
          </Routes>
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByText(/Overview/i)).toBeInTheDocument();
    expect(screen.getByText(/Details/i)).toBeInTheDocument();
    expect(screen.getByText(/Reviews/i)).toBeInTheDocument();

    userEvent.click(screen.getByText(/Details/i));

    expect(screen.getByText(/Genre/i)).toBeInTheDocument();
    expect(screen.getByText(/Fantasy/i)).toBeInTheDocument();
    expect(screen.getByText(/Released/i)).toBeInTheDocument();
    expect(screen.getByText(/2018/i)).toBeInTheDocument();
  });

  it('Should navigate "/reviews" when user clicked Reviews.', () => {
    history.push('/fake-page');
    commentList[1].id = 12;
    commentList[2].id = 222;

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Routes>
            <Route path={AppRoute.Reviews} element={<MoviePageReviewsComponent />} />
            <Route path="*" element={<TabsMovieComponent />} />
          </Routes>
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByText(/Overview/i)).toBeInTheDocument();
    expect(screen.getByText(/Details/i)).toBeInTheDocument();
    expect(screen.getByText(/Reviews/i)).toBeInTheDocument();

    userEvent.click(screen.getByText(/Reviews/i));

    expect(screen.getByTestId(/first-comment-col/i)).toBeInTheDocument();
    expect(screen.getByTestId(/second-comment-col/i)).toBeInTheDocument();
  });
});
