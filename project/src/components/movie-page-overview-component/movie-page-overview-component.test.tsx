import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {Provider} from 'react-redux';
import {makeFakeMovie} from '../../utils/mocks';
import MoviePageOverviewComponent from './movie-page-overview-component';
import HistoryRouter from '../history-route-component/history-route-component';

const movie = makeFakeMovie();
const history = createMemoryHistory();
const mockStore = configureMockStore();
const store = mockStore({
  DATA: {
    currentMovie: movie,
  },
});
const component = (
  <Provider store={store}>
    <HistoryRouter history={history}>
      <MoviePageOverviewComponent />
    </HistoryRouter>
  </Provider>
);

describe('Component: movie page overview.', () => {
  it('should correctly render.', () => {
    render(component);

    expect(screen.getByText(/3.4/i)).toBeInTheDocument();
    expect(screen.getByText(/Normal/i)).toBeInTheDocument();
    expect(screen.getByText(/160757 ratings/i)).toBeInTheDocument();
    expect(screen.getByText(/In an effort to thwart Grindelwalds plans of raising pure-blood wizards to rule over all non-magical beings, Albus Dumbledore enlists his former student Newt Scamander, who agrees to help, though hes unaware of the dangers that lie ahead. Lines are drawn as love and loyalty are tested, even among the truest friends and family, in an increasingly divided wizarding world./i)).toBeInTheDocument();
    expect(screen.getByText(/Director: David Yates/i)).toBeInTheDocument();
    expect(screen.getByText(/Starring: Bazuzu, Huiii, Penis-Dominator/i)).toBeInTheDocument();
  });

  it('should correctly call "getRating" with "Bad".', () => {
    movie.rating = 0;

    render(component);

    expect(screen.getByText(/Bad/i)).toBeInTheDocument();
  });

  it('should correctly call "getRating" with "Good".', () => {
    movie.rating = 6.5;

    render(component);

    expect(screen.getByText(/Good/i)).toBeInTheDocument();
  });

  it('should correctly call "getRating" with "Very good".', () => {
    movie.rating = 9.8;

    render(component);

    expect(screen.getByText(/Very good/i)).toBeInTheDocument();
  });

  it('should correctly call "getRating" with "Awesome".', () => {
    movie.rating = 10;

    render(component);

    expect(screen.getByText(/Awesome/i)).toBeInTheDocument();
  });
});
