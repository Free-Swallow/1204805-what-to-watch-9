import {render, screen} from '@testing-library/react';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {createMemoryHistory} from 'history';
import {Provider} from 'react-redux';
import HistoryRouter from '../history-route-component/history-route-component';
import userEvent from '@testing-library/user-event';
import {Route, Routes} from 'react-router-dom';
import {AppRoute, STEP_MOVIES_SHOW} from '../../const';
import {makeFakeMovie} from '../../utils/mocks';
import MovieCardComponent from './movie-card-component';
import * as Redux from 'react-redux';

const history = createMemoryHistory();
const mockStore = configureMockStore();
const store = mockStore({
  CONTENT: {
    moviesCount: STEP_MOVIES_SHOW,
  }});
const movie = makeFakeMovie();

describe('Component: movie card.', () => {
  it('should correctly render.', () => {
    window.scrollTo = jest.fn();

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <MovieCardComponent movie={movie} />
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByTestId(/video-player/i)).toBeInTheDocument();
    expect(screen.getByText(/The Grand Budapest Hotel/i)).toBeInTheDocument();
    expect(screen.getByTestId(/false/i)).toBeInTheDocument();

    userEvent.hover(screen.getByTestId(/movie-card/i));

    expect(screen.getByTestId(/true/i)).toBeInTheDocument();

    userEvent.unhover(screen.getByTestId(/movie-card/i));

    expect(screen.getByTestId(/false/i)).toBeInTheDocument();
  });

  it('should render "movie page" when user clicked Link.', () => {
    history.push('/fake-page');
    window.scrollTo = jest.fn();

    const dispatch = jest.fn();
    const useDispatch = jest.spyOn(Redux, 'useDispatch');

    useDispatch.mockReturnValue(dispatch);

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Routes>
            <Route path={`${AppRoute.Film}/${movie.id}`} element={<h1>Movie page</h1>} />
            <Route path="*" element={<MovieCardComponent movie={movie} />} />
          </Routes>
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.queryByText(/Movie page/i)).not.toBeInTheDocument();
    expect(useDispatch).toBeCalledTimes(1);

    userEvent.click(screen.getByRole('link'));

    expect(window.scrollTo).toBeCalledTimes(1);
    expect(screen.getByText(/Movie page/i)).toBeInTheDocument();
    expect(dispatch).nthCalledWith(1,  {
      payload: undefined,
      type: 'CONTENT/resetMoviesCount',
    });
  });
});
