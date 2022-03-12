import {MoviesData} from '../../types/movies';
import MovieCardComponent from '../movie-card-component/movie-card-component';

type MoviesListProps = {
  movies: MoviesData;
}

function MoviesListComponent({movies}: MoviesListProps): JSX.Element {
  return (
    <div className="catalog__films-list">
      {movies.map((movie) => (<MovieCardComponent key={movie.id} movie={movie} />))}
    </div>
  );
}

export default MoviesListComponent;
