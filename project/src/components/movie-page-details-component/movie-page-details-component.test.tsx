import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {Provider} from 'react-redux';
import {makeFakeMovie} from '../../utils/mocks';
import MoviePageDetailsComponent from './movie-page-details-component';
import HistoryRouter from '../history-route-component/history-route-component';

const movie = makeFakeMovie();
const history = createMemoryHistory();
const mockStore = configureMockStore();
const store = mockStore({
  DATA: {
    currentMovie: movie,
  },
});

describe('Component: movie page details.', () => {
  it('should correctly render', () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <MoviePageDetailsComponent />
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByText(/Director/i)).toBeInTheDocument();
    expect(screen.getByText(/David Yates/i)).toBeInTheDocument();
    expect(screen.getByText(/Starring/i)).toBeInTheDocument();
    expect(screen.getByText(/Bazuzu, Huiii, Penis-Dominator/i)).toBeInTheDocument();
    expect(screen.getByText(/Run Time/i)).toBeInTheDocument();
    expect(screen.getByText(/2 h 14 m/i)).toBeInTheDocument();
    expect(screen.getByText(/Genre/i)).toBeInTheDocument();
    expect(screen.getByText(/Fantasy/i)).toBeInTheDocument();
    expect(screen.getByText(/Released/i)).toBeInTheDocument();
    expect(screen.getByText(/2018/i)).toBeInTheDocument();
  });
});
