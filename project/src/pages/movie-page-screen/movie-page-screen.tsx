import FooterComponent from '../../components/footer-component/footer-component';
import NoAuthComponent from '../../components/no-auth-component/no-auth-component';
import AuthComponent from '../../components/auth-component/auth-component';
import MoviesListComponent from '../../components/movies-list-component/movies-list-component';
import TabsMovieComponent from '../../components/tabs-movie-component/tabs-movie-component';
import {MoviesData} from '../../types/movies';
import {Link} from 'react-router-dom';
import {AppRoute, MIN_MOVIES_SIMILAR, MAX_MOVIES_SIMILAR, AuthorizationStatus, APIRoute} from '../../const';
import {useAppSelector, useAppDispatch} from '../../hooks';
import {initialStateProps} from '../../store/reducer';
import {useParams} from 'react-router-dom';
import {fetchCurrentMovieAction, fetchSimilarMoviesAction} from '../../store/api-actions';
import {useEffect, useMemo} from 'react';
import LoadingScreen from '../../components/loading-component/loading-component';

function MoviePageScreen(): JSX.Element {

  const {
    currentMovie,
    similarMovies,
    isCurrentMovieLoaded,
    authorizationStatus,
  } = useAppSelector((state: initialStateProps) => state);

  const {
    name,
    genre,
    released,
    posterImage,
    backgroundImage,
  } = currentMovie;

  const {id} = useParams();

  const dispatch = useAppDispatch();

  const filteredSimilarMovies = useMemo<MoviesData>(() => similarMovies
    .filter((item) => item.id !== currentMovie.id)
    .slice(MIN_MOVIES_SIMILAR, MAX_MOVIES_SIMILAR), [currentMovie.id, similarMovies]);

  useEffect(() => {
    dispatch(fetchCurrentMovieAction(Number(id)));
    dispatch(fetchSimilarMoviesAction(Number(id)));
  }, [dispatch, id]);

  if (!isCurrentMovieLoaded || !currentMovie) {
    return <LoadingScreen />;
  }

  return (
    <>
      <section className="film-card film-card--full">
        <div className="film-card__hero">
          <div className="film-card__bg">
            <img src={backgroundImage} alt={name}/>
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

            {authorizationStatus === AuthorizationStatus.Auth ? <AuthComponent /> : <NoAuthComponent/>}

          </header>

          <div className="film-card__wrap">
            <div className="film-card__desc">
              <h2 className="film-card__title">{name}</h2>
              <p className="film-card__meta">
                <span className="film-card__genre">{genre}</span>
                <span className="film-card__year">{released}</span>
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
                {authorizationStatus === AuthorizationStatus.Auth ? <Link  to={`${APIRoute.Movies}/${id}${APIRoute.review}`} className="btn film-card__button">Add review</Link> : null}
              </div>
            </div>
          </div>
        </div>

        <div className="film-card__wrap film-card__translate-top">
          <div className="film-card__info">
            <div className="film-card__poster film-card__poster--big">
              <img src={posterImage} alt={name} width="218" height="327"/>
            </div>

            <TabsMovieComponent />

          </div>
        </div>
      </section>

      <div className="page-content">
        <section className="catalog catalog--like-this">
          <h2 className="catalog__title">More like this</h2>

          <MoviesListComponent movies={filteredSimilarMovies} />
        </section>

        <FooterComponent />
      </div>
    </>
  );
}

export default MoviePageScreen;
