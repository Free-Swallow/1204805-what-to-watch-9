import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {Routes, Route} from 'react-router-dom';
import {Provider} from 'react-redux';
import userEvent from '@testing-library/user-event';
import HistoryRouter from '../history-route-component/history-route-component';
import PlayButtonComponent from './play-button-component';
import {AppRoute} from '../../const';
import * as Redux from 'react-redux';

const history = createMemoryHistory();
const store = configureMockStore();
const fakeId = 5;

describe('Component: play button.', () => {
  it('should correctly render.', () => {
    render(
      <Provider store={store()}>
        <HistoryRouter history={history}>
          <PlayButtonComponent id={fakeId} />
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByTestId(/play-img/i)).toBeInTheDocument();
    expect(screen.getByText(/Play/i)).toBeInTheDocument();
  });

  it('should call dispatch and navigate to "/player" when user clicked on button', () => {
    history.push('/fake-id');
    const dispatch = jest.fn();
    const useDispatch = jest.spyOn(Redux, 'useDispatch');

    useDispatch.mockReturnValue(dispatch);

    render(
      <Provider store={store()}>
        <HistoryRouter history={history}>
          <Routes>
            <Route path={`${AppRoute.Player}/${fakeId}`} element={<h1>Player screen</h1>} />
            <Route path="*" element={<PlayButtonComponent id={fakeId} />} />
          </Routes>
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.queryByText(/Player screen/i)).not.toBeInTheDocument();

    userEvent.click(screen.getByTestId(/play-button/i));

    expect(screen.getByText(/Player screen/i)).toBeInTheDocument();
    expect(dispatch)
      .nthCalledWith(1, {
        payload: undefined,
        type: 'CONTENT/resetMoviesCount',
      });
  });
});
