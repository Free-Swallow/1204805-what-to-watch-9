import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {Provider} from 'react-redux';
import {Routes, Route} from 'react-router-dom';
import {makeFakeMovie} from '../../utils/mocks';
import userEvent from '@testing-library/user-event';
import HistoryRouter from '../history-route-component/history-route-component';
import MyListButtonComponent from './my-list-button-component';
import {AuthorizationStatus} from '../../const';
import {AppRoute} from '../../const';
import thunk, {ThunkDispatch} from 'redux-thunk';
import {State} from '../../types/state';
import {Action} from 'redux';
import {createAPI} from '../../services/api';
import * as Redux from 'react-redux';

const movie = makeFakeMovie();
const authStatus = {authorizationStatus: AuthorizationStatus.NoAuth};

const api = createAPI();
const middlewares = [thunk.withExtraArgument(api)];
const history = createMemoryHistory();
const mockStore = configureMockStore<
  State,
  Action,
  ThunkDispatch<State, typeof api, Action>
  >(middlewares);
const store = mockStore({
  USER: authStatus,
});

describe('Component: my list button.', () => {
  it('should correct render. (isFavorite = false)', () => {
    const {id, isFavorite} = movie;

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <MyListButtonComponent id={id} isFavorite={isFavorite} />
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByTestId(/add/i)).toBeInTheDocument();
    expect(screen.getByText(/My list/i)).toBeInTheDocument();
  });

  it('should navigate to "/login" when no auth user try add movie in list.', () => {
    history.push('/fake-page');
    const {id, isFavorite} = movie;

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Routes>
            <Route path={AppRoute.SignIn} element={<h1>Login page</h1>} />
            <Route path="*" element={<MyListButtonComponent id={id} isFavorite={isFavorite} />} />
          </Routes>
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.queryByText(/Login page/i)).not.toBeInTheDocument();
    expect(screen.getByTestId(/add/i)).toBeInTheDocument();
    expect(screen.getByText(/My list/i)).toBeInTheDocument();

    userEvent.click(screen.getByTestId(/my-list-button/i));

    expect(screen.queryByText(/My list/i)).not.toBeInTheDocument();
    expect(screen.getByText(/Login page/i)).toBeInTheDocument();
  });

  it('should call dispatch when auth user clicked on button.', () => {
    const dispatch = jest.fn();
    const useDispatch = jest.spyOn(Redux, 'useDispatch');

    useDispatch.mockReturnValue(dispatch);
    history.push('/fake-page');
    authStatus.authorizationStatus = AuthorizationStatus.Auth;
    movie.isFavorite = true;
    const {id, isFavorite} = movie;


    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Routes>
            <Route path={AppRoute.SignIn} element={<h1>Login page</h1>} />
            <Route path="*" element={<MyListButtonComponent id={id} isFavorite={isFavorite} />} />
          </Routes>
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.queryByText(/Login page/i)).not.toBeInTheDocument();
    expect(screen.getByTestId(/in-list/i)).toBeInTheDocument();
    expect(screen.getByText(/My list/i)).toBeInTheDocument();

    userEvent.click(screen.getByTestId(/my-list-button/i));

    expect(screen.queryByText(/Login page/i)).not.toBeInTheDocument();
    expect(dispatch).toBeCalledTimes(1);
  });
});
