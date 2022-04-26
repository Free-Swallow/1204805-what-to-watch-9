import {render, screen} from '@testing-library/react';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {createMemoryHistory} from 'history';
import {Provider} from 'react-redux';
import HistoryRouter from '../../components/history-route-component/history-route-component';
import SignInScreen from './sign-in-screen';
import userEvent from '@testing-library/user-event';
import {AuthorizationStatus} from '../../const';

const history = createMemoryHistory();
const mockStore = configureMockStore();
const store = mockStore({
  USER: {
    authorizationStatus: AuthorizationStatus.NoAuth,
  },
});

describe('Screen: login.', () => {
  it('Should correctly render.', () => {
    render(
      <Provider store={store} >
        <HistoryRouter history={history}>
          <SignInScreen />
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByTestId(/sign-in-title/i)).toBeInTheDocument();
    expect(screen.getByText(/Email address/i)).toBeInTheDocument();
    expect(screen.getByText(/Password/i)).toBeInTheDocument();
    expect(screen.getByTestId(/login-button/i)).toBeInTheDocument();
    expect(screen.getByText(/© 2019 What to watch Ltd./i)).toBeInTheDocument();
  });

  it('Should change value input.', () => {
    render(
      <Provider store={store} >
        <HistoryRouter history={history}>
          <SignInScreen />
        </HistoryRouter>
      </Provider>,
    );

    userEvent.type(screen.getByTestId(/login-input/i), 'login1234');
    userEvent.type(screen.getByTestId(/password-input/i), 'qwerty123');

    expect(screen.getByDisplayValue(/login1234/i)).toBeInTheDocument();
    expect(screen.getByDisplayValue(/qwerty123/i)).toBeInTheDocument();
  });
});
