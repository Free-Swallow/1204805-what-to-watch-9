import {render, screen} from '@testing-library/react';
import {Routes, Route} from 'react-router-dom';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {createMemoryHistory} from 'history';
import {Provider} from 'react-redux';
import {AppRoute} from '../../const';
import HistoryRouter from '../history-route-component/history-route-component';
import NoAuthComponent from './no-auth-component';
import {State} from '../../types/state';
import {Action} from 'redux';
import thunk, {ThunkDispatch} from 'redux-thunk';
import {createAPI} from '../../services/api';
import * as Redux from 'react-redux';
import userEvent from '@testing-library/user-event';

const history = createMemoryHistory();
const api = createAPI();
const middlewares = [thunk.withExtraArgument(api)];
const mockStore = configureMockStore<
  State,
  Action,
  ThunkDispatch<State, typeof api, Action>
  >(middlewares);
const store = mockStore();

describe('Component: no auth.', () => {
  it('should correctly render.', () => {
    history.push('/fake-page');
    const dispatch = jest.fn();
    const useDispatch = jest.spyOn(Redux, 'useDispatch');

    useDispatch.mockReturnValue(dispatch);

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Routes>
            <Route path={AppRoute.SignIn} element={<h1>Login page</h1>} />
            <Route path="*" element={<NoAuthComponent />} />
          </Routes>
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.queryByText(/Login page/i)).not.toBeInTheDocument();
    expect(screen.getByText(/Sign in/i)).toBeInTheDocument();

    userEvent.click(screen.getByRole('link'));

    expect(screen.getByText(/Login page/i)).toBeInTheDocument();
    expect(dispatch).toBeCalledTimes(2);
    expect(dispatch)
      .nthCalledWith(1, {
        payload: undefined,
        type: 'CONTENT/resetMoviesCount',
      });
    expect(dispatch)
      .nthCalledWith(2, {
        payload: 'All genres',
        type: 'CONTENT/changeGenre',
      });
  });
});
