import FooterComponent from '../../components/footer-component/footer-component';
import NoAuthComponent from '../../components/no-auth-component/no-auth-component';
import AuthComponent from '../../components/auth-component/auth-component';
import MoviesListComponent from '../../components/movies-list-component/movies-list-component';
import TabsMovieComponent from '../../components/tabs-movie-component/tabs-movie-component';
import {MoviesData} from '../../types/movies';
import {Link} from 'react-router-dom';
import {AppRoute, MIN_MOVIES_SIMILAR, MAX_MOVIES_SIMILAR, AuthorizationStatus} from '../../const';
import {useAppSelector, useAppDispatch} from '../../hooks';
import {useParams} from 'react-router-dom';
import {fetchCurrentMovieAction, fetchSimilarMoviesAction} from '../../store/api-actions';
import {useEffect, useMemo} from 'react';
import LoadingScreen from '../../components/loading-component/loading-component';
import PlayButtonComponent from '../../components/play-button-component/play-button-component';
import MyListButtonComponent from '../../components/my-list-button-component/my-list-button-component';
import LogoComponent from '../../components/logo-component/logo-component';
import VisuallyHiddenComponent from '../../components/visually-hidden-component/visually-hidden-component';
import {getCurrentMovie, getSimilarList, getStateMovieLoad} from '../../store/data-process/selectors';
import {getAuthStatus} from '../../store/user-process/selectors';

function MoviePageScreen(): JSX.Element {
  const authorizationStatus = useAppSelector(getAuthStatus);
  const currentMovie = useAppSelector(getCurrentMovie);
  const similarMovies = useAppSelector(getSimilarList);
  const isCurrentMovieLoaded = useAppSelector(getStateMovieLoad);
  const {
    name,
    genre,
    released,
    posterImage,
    backgroundImage,
    isFavorite,
    backgroundColor,
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
      <section className="film-card film-card--full" style={{backgroundColor: backgroundColor}}>
        <div className="film-card__hero">
          <div className="film-card__bg">
            <img data-testid="background-img" src={backgroundImage} alt={name}/>
          </div>
          <VisuallyHiddenComponent />
          <header className="page-header film-card__head">
            <LogoComponent classAttribute={''} />
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
                <PlayButtonComponent id={Number(id)} />
                <MyListButtonComponent id={Number(id)} isFavorite={isFavorite} />
                {authorizationStatus === AuthorizationStatus.Auth ? <Link  to={`${AppRoute.Film}/${id}${AppRoute.Review}`} className="btn film-card__button">Add review</Link> : null}
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
