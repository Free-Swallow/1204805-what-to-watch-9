import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import HistoryRouter from '../history-route-component/history-route-component';
import ErrorComponent from './error-component';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {Provider} from 'react-redux';

const mockStore = configureMockStore();

describe('Component: 404 Page.', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();

    render(
      <Provider store={mockStore()}>
        <HistoryRouter history={history}>
          <ErrorComponent />
        </HistoryRouter>
      </Provider>
      ,
    );

    const headerElement = screen.getByText('Ooops! 404. Something is wrong.');
    const linkElement = screen.getByText('Return Main page?');

    expect(headerElement).toBeInTheDocument();
    expect(linkElement).toBeInTheDocument();
  });
});
