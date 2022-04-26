import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import HistoryRouter from '../history-route-component/history-route-component';
import PreloaderComponent from './preloader-component';
import {preloaderTitle} from './preloader-component';

describe('Component: preloader', () => {
  it('should correctly render', () => {
    const history = createMemoryHistory();

    render(
      <HistoryRouter history={history}>
        <PreloaderComponent />
      </HistoryRouter>,
    );

    const titleElement = screen.getByText(preloaderTitle);

    expect(titleElement).toBeInTheDocument();
  });
});
