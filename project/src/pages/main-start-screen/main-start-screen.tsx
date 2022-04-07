import MainHeaderComponent from '../../components/main-header-component/main-header-component';
import FooterComponent from '../../components/footer-component/footer-component';
import MoviesListComponent from '../../components/movies-list-component/movies-list-component';
import ButtonShowMoreComponent from '../../components/button-show-more-component/button-show-more-component';
import {MoviesData} from '../../types/movies';
import {useAppSelector} from '../../hooks';
import type {initialStateProps} from '../../store/reducer';
import TabsMoviesListComponent from '../../components/tabs-movies-list-component/tabs-movies-list-component';
import {basicGenre} from '../../const';

type MainStartProps = {
  movies: MoviesData;
}

function MainStartScreen({movies}: MainStartProps): JSX.Element {
  const [firstMovies] = movies;
  const moviesCount = useAppSelector((state: initialStateProps) => state.moviesCount);
  const moviesList = useAppSelector((state: initialStateProps) => state.moviesList);
  const currentGenre = useAppSelector((state: initialStateProps) => state.genre);
  const genresList = useAppSelector((state: initialStateProps) => {
    const moviesGenres = state.moviesList.map((movie) => movie.genre);
    return [basicGenre, ...new Set(moviesGenres)];
  });

  const filteredMovies = currentGenre === basicGenre ? moviesList : moviesList.filter((movie) => movie.genre === currentGenre);

  return (
    <>
      <MainHeaderComponent firstMovies={firstMovies}/>

      <div className="page-content">
        <section className="catalog">
          <h2 className="catalog__title visually-hidden">Catalog</h2>

          <TabsMoviesListComponent genres={genresList} />

          <MoviesListComponent movies={filteredMovies.slice(0, moviesCount)} />

          {moviesCount < filteredMovies.length ? <ButtonShowMoreComponent/> : null}

        </section>

        <FooterComponent />

      </div>
    </>
  );
}

export default MainStartScreen;
