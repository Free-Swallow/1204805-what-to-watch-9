import FooterComponent from '../../components/footer-component/footer-component';
import NoAuthComponent from '../../components/no-auth-component/no-auth-component';
import MoviesListComponent from '../../components/movies-list-component/movies-list-component';
import TabsMovieComponent from '../../components/tabs-movie-component/tabs-movie-component';
import {CommentsData, MoviesData} from '../../types/movies';
import {Link} from 'react-router-dom';
import {AppRoute} from '../../const';
import {getSimilarMovies} from '../../utils';

type MoviePageScreenProps = {
  movies: MoviesData;
  comments: CommentsData;
}

const MOVIES_NUMBER = 4;

function MoviePageScreen({movies, comments}: MoviePageScreenProps): JSX.Element {
  const [movie] = movies;
  const similarMovies = getSimilarMovies(movies, movie.genre, MOVIES_NUMBER);

  return (
    <>
      <section className="film-card film-card--full">
        <div className="film-card__hero">
          <div className="film-card__bg">
            <img src="img/bg-the-grand-budapest-hotel.jpg" alt="The Grand Budapest Hotel"/>
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
            <div className="film-card__desc">
              <h2 className="film-card__title">{movie.name}</h2>
              <p className="film-card__meta">
                <span className="film-card__genre">{movie.genre}</span>
                <span className="film-card__year">{movie.released}</span>
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
                <Link to={AppRoute.AddReview} className="btn film-card__button">Add review</Link>
              </div>
            </div>
          </div>
        </div>

        <div className="film-card__wrap film-card__translate-top">
          <div className="film-card__info">
            <div className="film-card__poster film-card__poster--big">
              <img src="img/the-grand-budapest-hotel-poster.jpg" alt="The Grand Budapest Hotel poster" width="218" height="327"/>
            </div>

            <TabsMovieComponent movie={movie} comments={comments} />

          </div>
        </div>
      </section>

      <div className="page-content">
        <section className="catalog catalog--like-this">
          <h2 className="catalog__title">More like this</h2>

          <MoviesListComponent movies={similarMovies} />
        </section>

        <FooterComponent />
      </div>
    </>
  );
}

export default MoviePageScreen;
