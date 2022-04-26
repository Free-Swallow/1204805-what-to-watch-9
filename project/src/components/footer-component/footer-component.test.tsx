import {render, screen} from '@testing-library/react';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {createMemoryHistory} from 'history';
import HistoryRouter from '../history-route-component/history-route-component';
import {Provider} from 'react-redux';
import FooterComponent from './footer-component';

const store = configureMockStore();
const history = createMemoryHistory();

describe('Component: footer.', () => {
  it('should correctly render', () => {
    render(
      <Provider store={store()}>
        <HistoryRouter history={history}>
          <FooterComponent />
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByText(/© 2019 What to watch Ltd./i)).toBeInTheDocument();
    expect(screen.getByTestId(/link-logo/i)).toBeInTheDocument();
  });
});
