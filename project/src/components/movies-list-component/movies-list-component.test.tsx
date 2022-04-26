import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {Provider} from 'react-redux';
import {makeFakeMovie} from '../../utils/mocks';
import HistoryRouter from '../history-route-component/history-route-component';
import MoviesListComponent from './movies-list-component';

const movies = [makeFakeMovie()];
const store = configureMockStore();
const history = createMemoryHistory();

describe('Component: movies list.', () => {
  it('should correctly render.', () => {
    render(
      <Provider store={store()}>
        <HistoryRouter history={history}>
          <MoviesListComponent movies={movies} />
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByTestId(/movie-list/i)).toBeInTheDocument();
    expect(screen.getByTestId(/video-player/i)).toBeInTheDocument();
  });
});
