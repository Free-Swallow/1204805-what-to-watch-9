import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {Provider} from 'react-redux';
import HistoryRouter from '../history-route-component/history-route-component';
import {makeFakeMovie} from '../../utils/mocks';
import {AuthorizationStatus} from '../../const';
import MainHeaderComponent from './main-header-component';

const history = createMemoryHistory();
const mockStore = configureMockStore();
const movie = makeFakeMovie();
const storeNoAuth = mockStore({
  DATA: {
    currentMovie: movie,
    promo: movie,
  },
  USER: {
    authorizationStatus: AuthorizationStatus.NoAuth,
  },
});

describe('Component: "Main Header".', () => {
  it('should correctly render', () => {
    render(
      <Provider store={storeNoAuth}>
        <HistoryRouter history={history}>
          <MainHeaderComponent />
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByText(/WTW/i)).toBeInTheDocument();
    expect(screen.getByText(/Sign in/i)).toBeInTheDocument();
    expect(screen.getByText(/The Grand Budapest Hotel/i)).toBeInTheDocument();
    expect(screen.getByTestId(/img-promo/i)).toBeInTheDocument();
    expect(screen.getByText(/Fantasy/i)).toBeInTheDocument();
    expect(screen.getByText(/2018/i)).toBeInTheDocument();
    expect(screen.getByText(/Play/i)).toBeInTheDocument();
    expect(screen.getByText(/My list/i)).toBeInTheDocument();
  });
});
