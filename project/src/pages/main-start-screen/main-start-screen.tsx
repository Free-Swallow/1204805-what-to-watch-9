import MainHeaderComponent from '../../components/main-header-component/main-header-component';
import FooterComponent from '../../components/footer-component/footer-component';
import MoviesListComponent from '../../components/movies-list-component/movies-list-component';
import ButtonShowMoreComponent from '../../components/button-show-more-component/button-show-more-component';
import {useAppSelector} from '../../hooks';
import type {initialStateProps} from '../../store/reducer';
import TabsMoviesListComponent from '../../components/tabs-movies-list-component/tabs-movies-list-component';
import {defaultGenre} from '../../const';

function MainStartScreen(): JSX.Element {
  const moviesCount = useAppSelector((state: initialStateProps) => state.moviesCount);
  const moviesList = useAppSelector((state: initialStateProps) => state.moviesList);
  const currentGenre = useAppSelector((state: initialStateProps) => state.genre);
  const genresList = useAppSelector((state: initialStateProps) => {
    const moviesGenres = state.moviesList.map((movie) => movie.genre);
    return [defaultGenre, ...new Set(moviesGenres)];
  });

  const filteredMovies = currentGenre === defaultGenre ? moviesList : moviesList.filter((movie) => movie.genre === currentGenre);

  return (
    <>
      <MainHeaderComponent />

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
