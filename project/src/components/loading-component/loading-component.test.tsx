import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import HistoryRouter from '../history-route-component/history-route-component';
import {loadingScreenTitle} from './loading-component';
import LoadingScreen from './loading-component';
import {preloaderTitle} from '../preloader-component/preloader-component';


describe('Component: loading.', () => {
  it('should correctly render', () => {
    const history = createMemoryHistory();

    render(
      <HistoryRouter history={history}>
        <LoadingScreen />
      </HistoryRouter>,
    );

    const headerElement = screen.getByText(loadingScreenTitle);
    const preloaderElement = screen.getByText(preloaderTitle);

    expect(headerElement).toBeInTheDocument();
    expect(preloaderElement).toBeInTheDocument();
  });
});
