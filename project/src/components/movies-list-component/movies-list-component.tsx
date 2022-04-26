import MovieCardComponent from '../movie-card-component/movie-card-component';
import {MoviesListProps} from '../../types/components';

function MoviesListComponent({movies}: MoviesListProps): JSX.Element {
  return (
    <div data-testid="movie-list" className="catalog__films-list">
      {movies.map((movie) => (<MovieCardComponent key={movie.id} movie={movie} />))}
    </div>
  );
}

export default MoviesListComponent;
