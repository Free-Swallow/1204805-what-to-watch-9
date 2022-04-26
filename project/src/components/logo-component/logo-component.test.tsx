import {render, screen} from '@testing-library/react';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {createMemoryHistory} from 'history';
import HistoryRouter from '../history-route-component/history-route-component';
import {Provider} from 'react-redux';
import LogoComponent from './logo-component';
import userEvent from '@testing-library/user-event';
import {Routes, Route} from 'react-router-dom';
import {AppRoute} from '../../const';
import * as Redux from 'react-redux';

const history = createMemoryHistory();
const mockStore = configureMockStore();

describe('Component: logo.', () => {
  it('should render correctly', () => {
    window.scrollTo = jest.fn();

    render(
      <Provider store={mockStore()}>
        <HistoryRouter history={history}>
          <LogoComponent classAttribute={''} />
        </HistoryRouter>
      </Provider>,
    );

    const textElement = screen.getByRole('link');
    const firstLinkElement = screen.getByTestId('logo-1');
    const secondLinkElement = screen.getByTestId('logo-2');
    const thirdLinkElement = screen.getByTestId('logo-3');

    expect(firstLinkElement).toBeInTheDocument();
    expect(secondLinkElement).toBeInTheDocument();
    expect(thirdLinkElement).toBeInTheDocument();
    expect(textElement).toBeInTheDocument();
  });

  it('should redirect to root url when user clicked to link', () => {
    window.scrollTo = jest.fn();

    const dispatch = jest.fn();
    const useDispatch = jest.spyOn(Redux, 'useDispatch');

    useDispatch.mockReturnValue(dispatch);
    history.push('/fake');

    render(
      <Provider store={mockStore()}>
        <HistoryRouter history={history}>
          <Routes>
            <Route path={AppRoute.Main} element={<h1>This is main page</h1>} />
            <Route path="*" element={<LogoComponent classAttribute={''} />} />
          </Routes>
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.queryByText(/This is main page/i)).not.toBeInTheDocument();

    userEvent.click(screen.getByTestId('link-logo'));

    expect(screen.getByText(/This is main page/i)).toBeInTheDocument();
    expect(useDispatch).toBeCalledTimes(1);
    expect(dispatch).nthCalledWith(2,  {
      payload: undefined,
      type: 'CONTENT/resetMoviesCount',
    });
    expect(dispatch).nthCalledWith(1,  {
      payload: 'All genres',
      type: 'CONTENT/changeGenre',
    });
  });
});
