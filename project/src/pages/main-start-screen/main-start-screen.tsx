import MainHeaderComponent from '../../components/main-header-component/main-header-component';
import FooterComponent from '../../components/footer-component/footer-component';
import MovieCardComponent from '../../components/movie-card-component/movie-card-component';

type MainStartProps = {
  movieName: string;
  movieRelease: number;
  movieKind: string;
}

function MainStartScreen({movieName, movieRelease, movieKind}: MainStartProps): JSX.Element {
  return (
    <>
      <MainHeaderComponent movieName={movieName} movieRelease={movieRelease} movieKind={movieKind} />

      <div className="page-content">
        <section className="catalog">
          <h2 className="catalog__title visually-hidden">Catalog</h2>

          <ul className="catalog__genres-list">
            <li className="catalog__genres-item catalog__genres-item--active">
              <a href="/#" className="catalog__genres-link">All genres</a>
            </li>
            <li className="catalog__genres-item">
              <a href="/#" className="catalog__genres-link">Comedies</a>
            </li>
            <li className="catalog__genres-item">
              <a href="/#" className="catalog__genres-link">Crime</a>
            </li>
            <li className="catalog__genres-item">
              <a href="/#" className="catalog__genres-link">Documentary</a>
            </li>
            <li className="catalog__genres-item">
              <a href="/#" className="catalog__genres-link">Dramas</a>
            </li>
            <li className="catalog__genres-item">
              <a href="/#" className="catalog__genres-link">Horror</a>
            </li>
            <li className="catalog__genres-item">
              <a href="/#" className="catalog__genres-link">Kids & Family</a>
            </li>
            <li className="catalog__genres-item">
              <a href="/#" className="catalog__genres-link">Romance</a>
            </li>
            <li className="catalog__genres-item">
              <a href="/#" className="catalog__genres-link">Sci-Fi</a>
            </li>
            <li className="catalog__genres-item">
              <a href="/#" className="catalog__genres-link">Thrillers</a>
            </li>
          </ul>

          <div className="catalog__films-list">
            <MovieCardComponent />
            <MovieCardComponent />
            <MovieCardComponent />
            <MovieCardComponent />
            <MovieCardComponent />
            <MovieCardComponent />
            <MovieCardComponent />
            <MovieCardComponent />
            <MovieCardComponent />
            <MovieCardComponent />
            <MovieCardComponent />
            <MovieCardComponent />
            <MovieCardComponent />
            <MovieCardComponent />
            <MovieCardComponent />
            <MovieCardComponent />
          </div>

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
