import MainHeaderComponent from '../../components/main-header-component/main-header-component';
import FooterComponent from '../../components/footer-component/footer-component';
import MoviesListComponent from '../../components/movies-list-component/movies-list-component';
import {MoviesData} from '../../types/movies';
import {useAppSelector} from '../../hooks';
import type {initialStateProps} from '../../store/reducer';
import TabsMoviesListComponent from '../../components/tabs-movies-list-component/tabs-movies-list-component';
import {getSimilarMovies} from '../../utils';

type MainStartProps = {
  movies: MoviesData;
}

function MainStartScreen({movies}: MainStartProps): JSX.Element {

  const [firstMovies] = movies;
  const moviesList = useAppSelector((state: initialStateProps) => state.moviesList);
  const currentGenre = useAppSelector((state: initialStateProps) => state.genre);
  const bitch = getSimilarMovies(moviesList, currentGenre);

  const genres = useAppSelector((state: initialStateProps) => {
    const moviesGenres = state.moviesList.map((movie) => movie.genre);
    return ['All genres', ...new Set(moviesGenres)];
  });

  return (
    <>
      <MainHeaderComponent firstMovies={firstMovies}/>

      <div className="page-content">
        <section className="catalog">
          <h2 className="catalog__title visually-hidden">Catalog</h2>

          <TabsMoviesListComponent genres={genres} />

          <MoviesListComponent movies={bitch} />

          <div className="catalog__more">
            <button className="catalog__button" type="button">Show more</button>
          </div>
        </section>

        <FooterComponent />
      </div>
    </>
  );
}

export default MainStartScreen;
