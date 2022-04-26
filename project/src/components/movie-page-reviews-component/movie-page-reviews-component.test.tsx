import {render, screen} from '@testing-library/react';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {createMemoryHistory} from 'history';
import {Provider} from 'react-redux';
import {makeFakeComment, makeFakeMovie} from '../../utils/mocks';
import MoviePageReviewsComponent from './movie-page-reviews-component';
import HistoryRouter from '../history-route-component/history-route-component';
import {createAPI} from '../../services/api';
import thunk, {ThunkDispatch} from 'redux-thunk';
import {State} from '../../types/state';
import {Action} from 'redux';

const commentList = [makeFakeComment(), makeFakeComment(), makeFakeComment()];
const movie = makeFakeMovie();
const api = createAPI();
const middlewares = [thunk.withExtraArgument(api)];
const history = createMemoryHistory();
const mockStore = configureMockStore<
  State,
  Action,
  ThunkDispatch<State, typeof api, Action>
  >(middlewares);
const store = mockStore({
  DATA: {
    currentMovieComments: commentList,
    currentMovie: movie,
  },
});

describe('Component: movie page reviews.', () => {
  it('should correctly render.', () => {
    commentList[1].comment = 'Sweet tea';
    commentList[1].id = 12;
    commentList[2].comment = 'Good morning';
    commentList[2].id = 222;

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <MoviePageReviewsComponent />
        </HistoryRouter>
      </Provider>,
    );

    const commentElementFirst = screen.getByText(/string/i);
    const commentElementSecond = screen.getByText(/Sweet tea/i);
    const commentElementThird = screen.getByText(/Good morning/i);
    const firstContainer = screen.getByTestId(/first-comment-col/i);
    const secondContainer = screen.getByTestId(/second-comment-col/i);

    expect(firstContainer).toContainElement(commentElementFirst);
    expect(firstContainer).toContainElement(commentElementSecond);
    expect(secondContainer).toContainElement(commentElementThird);
  });
});
