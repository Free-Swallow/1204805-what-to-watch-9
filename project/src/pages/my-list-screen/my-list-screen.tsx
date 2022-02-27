import MovieCardComponent from '../../components/movie-card-component/movie-card-component';
import FooterComponent from '../../components/footer-component/footer-component';
import AuthComponent from '../../components/auth-component/auth-component';

function MyListScreen(): JSX.Element {
  return (
    <div className="user-page">
      <header className="page-header user-page__head">
        <div className="logo">
          <a href="main.html" className="logo__link">
            <span className="logo__letter logo__letter--1">W</span>
            <span className="logo__letter logo__letter--2">T</span>
            <span className="logo__letter logo__letter--3">W</span>
          </a>
        </div>

        <h1 className="page-title user-page__title">My list</h1>

        <AuthComponent />

      </header>

      <section className="catalog">
        <h2 className="catalog__title visually-hidden">Catalog</h2>

        <div className="catalog__films-list">
          <MovieCardComponent/>
          <MovieCardComponent/>
          <MovieCardComponent/>
          <MovieCardComponent/>
          <MovieCardComponent/>
          <MovieCardComponent/>
          <MovieCardComponent/>
          <MovieCardComponent/>
          <MovieCardComponent/>
        </div>
      </section>

      <FooterComponent/>
    </div>
  );
}

export default MyListScreen;
