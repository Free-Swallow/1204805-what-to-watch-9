import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import HistoryRouter from '../history-route-component/history-route-component';
import {Provider} from 'react-redux';
import {configureMockStore} from '@jedmao/redux-mock-store';
import userEvent from '@testing-library/user-event';
import AuthComponent from './auth-component';
import {Routes, Route} from 'react-router-dom';
import {AppRoute} from '../../const';
import * as Redux from 'react-redux';

const history = createMemoryHistory();
const mockStore = configureMockStore();

describe('Component: auth', () => {
  it('should correctly render.', () => {
    render(
      <Provider store={mockStore()}>
        <HistoryRouter history={history}>
          <AuthComponent />
        </HistoryRouter>
      </Provider>,
    );

    const imgElement = screen.getByTestId('auth-img');
    const linkElement = screen.getByRole('link');

    expect(imgElement).toBeInTheDocument();
    expect(linkElement).toBeInTheDocument();
  });

  it('should redirect to my list url when user clicked to link', () => {
    const dispatch = jest.fn();
    const useDispatch = jest.spyOn(Redux, 'useDispatch');

    useDispatch.mockReturnValue(dispatch);
    history.push('/fake');

    render(
      <Provider store={mockStore()}>
        <HistoryRouter history={history}>
          <Routes>
            <Route path={AppRoute.MyList} element={<h1>My list page</h1>} />
            <Route path="*" element={<AuthComponent />} />
          </Routes>
        </HistoryRouter>
      </Provider>,
    );

    const imgLinkElement = screen.getByTestId('img-link');

    expect(screen.queryByText(/My list page/i)).not.toBeInTheDocument();

    userEvent.click(imgLinkElement);

    expect(screen.getByText(/My list page/i)).toBeInTheDocument();
    expect(useDispatch).toBeCalledTimes(1);
    expect(dispatch).nthCalledWith(2, {
      payload: 'All genres',
      type: 'CONTENT/changeGenre',
    });
    expect(dispatch).nthCalledWith(1, {
      payload: undefined,
      type: 'CONTENT/resetMoviesCount',
    });
  });

  it('should logout when user clicked to link', () => {
    const dispatch = jest.fn();
    const useDispatch = jest.spyOn(Redux, 'useDispatch');

    useDispatch.mockReturnValue(dispatch);

    render(
      <Provider store={mockStore()}>
        <HistoryRouter history={history}>
          <AuthComponent />
        </HistoryRouter>
      </Provider>,
    );

    const linkElement = screen.getByRole('link');

    userEvent.click(linkElement);

    expect(useDispatch).toBeCalledTimes(1);
    expect(dispatch).nthCalledWith(3, {
      payload: undefined,
      type: 'CONTENT/resetMoviesCount',
    });
    expect(dispatch).nthCalledWith(1, {
      payload: 'All genres',
      type: 'CONTENT/changeGenre',
    });
  });
});
