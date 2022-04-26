import {Route, Routes} from 'react-router-dom';
import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {AppRoute, AuthorizationStatus} from '../../const';
import {Provider} from 'react-redux';
import HistoryRouter from '../history-route-component/history-route-component';
import PrivateRoute from './private-route';

const history = createMemoryHistory();
const mockStore = configureMockStore();

describe('Component: private route.', () => {
  beforeEach(() => {
    history.push('/private');
  });

  it('should render component for public route, when user not authorized', () => {
    const store = mockStore();

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Routes>
            <Route path={AppRoute.SignIn} element={<h1>Public route</h1>}/>
            <Route path='/private' element={<PrivateRoute authorizationStatus={AuthorizationStatus.NoAuth}><h1>Private route</h1></PrivateRoute>}/>
          </Routes>
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByText(/Public route/i)).toBeInTheDocument();
    expect(screen.queryByText(/Private route/i)).not.toBeInTheDocument();
  });

  it('should render component for private route, when user authorized', () => {
    const store = mockStore({
      USER: {authorizationStatus: AuthorizationStatus.Auth},
    });

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Routes>
            <Route path={AppRoute.SignIn} element={<h1>Public route</h1>}/>
            <Route path='/private' element={<PrivateRoute authorizationStatus={AuthorizationStatus.Auth}><h1>Private route</h1></PrivateRoute>}/>
          </Routes>
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByText(/Private route/i)).toBeInTheDocument();
    expect(screen.queryByText(/Public route/i)).not.toBeInTheDocument();
  });
});
