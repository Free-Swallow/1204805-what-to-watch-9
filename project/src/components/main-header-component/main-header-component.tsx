// import AuthComponent from '../auth-component/auth-component';
import {Link} from 'react-router-dom';
import {AppRoute} from '../../const';
import NoAuthComponent from '../no-auth-component/no-auth-component';
import {Movie} from '../../types/movies';

type MainHeaderProps = {
  firstMovies: Movie;
}

function MainHeaderComponent({firstMovies}: MainHeaderProps): JSX.Element {

  return (
    <section className="film-card">
      <div className="film-card__bg">
        <img src="../img/bg-the-grand-budapest-hotel.jpg" alt="The Grand Budapest Hotel"/>
      </div>

      <h1 className="visually-hidden">WTW</h1>

      <header className="page-header film-card__head">
        <div className="logo">
          <Link to={AppRoute.Main} className="logo__link">
            <span className="logo__letter logo__letter--1">W</span>
            <span className="logo__letter logo__letter--2">T</span>
            <span className="logo__letter logo__letter--3">W</span>
          </Link>
        </div>

        <NoAuthComponent />

      </header>

      <div className="film-card__wrap">
        <div className="film-card__info">
          <div className="film-card__poster">
            <img src={firstMovies.posterImage} alt="The Grand Budapest Hotel poster" width="218" height="327" />
          </div>

          <div className="film-card__desc">
            <h2 className="film-card__title">{firstMovies.name}</h2>
            <p className="film-card__meta">
              <span className="film-card__genre">{firstMovies.genre}</span>
              <span className="film-card__year">{firstMovies.released}</span>
            </p>

            <div className="film-card__buttons">
              <button className="btn btn--play film-card__button" type="button">
                <svg viewBox="0 0 19 19" width="19" height="19">
                  <use xlinkHref="#play-s"></use>
                </svg>
                <span>Play</span>
              </button>
              <button className="btn btn--list film-card__button" type="button">
                <svg viewBox="0 0 19 20" width="19" height="20">
                  <use xlinkHref="#add"></use>
                </svg>
                <span>My list</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default MainHeaderComponent;
