import {render, screen, fireEvent} from '@testing-library/react';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {createMemoryHistory} from 'history';
import {Provider} from 'react-redux';
import {makeFakeMovie} from '../../utils/mocks';
import HistoryRouter from '../history-route-component/history-route-component';
import PlayerComponent from './player-component';
import {createAPI} from '../../services/api';
import thunk, {ThunkDispatch} from 'redux-thunk';
import {State} from '../../types/state';
import {Action} from 'redux';
import userEvent from '@testing-library/user-event';

const history = createMemoryHistory();
const movie = makeFakeMovie();
const api = createAPI();
const middlewares = [thunk.withExtraArgument(api)];
const mockStore = configureMockStore<
  State,
  Action,
  ThunkDispatch<State, typeof api, Action>
  >(middlewares);
const store = mockStore({
  DATA: {
    isCurrentMovieLoaded: true,
    currentMovie: movie,
  },
});

describe('Component: player.', () => {
  beforeAll(() => {
    window.HTMLVideoElement.prototype.play = jest.fn();
    window.HTMLVideoElement.prototype.pause = jest.fn();
  });

  it('Should correctly render.', () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <PlayerComponent />
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByText(/Exit/i)).toBeInTheDocument();
    expect(screen.getByText(/Toggler/i)).toBeInTheDocument();
    expect(screen.getByText(/Play/i)).toBeInTheDocument();
    expect(screen.getByText(/Full screen/i)).toBeInTheDocument();
    expect(screen.getByText(/-02:14/i)).toBeInTheDocument();
    expect(screen.getByTestId(/play-set-false/i)).toBeInTheDocument();
  });

  it('Should play video when data is loaded.', () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <PlayerComponent />
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByText(/Play/i)).toBeInTheDocument();

    fireEvent(screen.getByTestId(/video/i) as Element,
      new Event('loadeddata'));

    expect(window.HTMLVideoElement.prototype.play).toBeCalledTimes(1);
    expect(screen.getByText(/Pause/i)).toBeInTheDocument();

    userEvent.click(screen.getByTestId(/play-set-true/i));

    expect(window.HTMLVideoElement.prototype.pause).toBeCalledTimes(1);
  });
});
