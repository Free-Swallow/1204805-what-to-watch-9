import AuthComponent from '../auth-component/auth-component';
import {Link} from 'react-router-dom';
import {AppRoute} from '../../const';
import NoAuthComponent from '../no-auth-component/no-auth-component';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {AuthorizationStatus} from '../../const';
import PlayButtonComponent from '../play-button-component/play-button-component';
import MyListButtonComponent from '../my-list-button-component/my-list-button-component';
import {resetMoviesCount} from '../../store/content-process/content-process';

function MainHeaderComponent(): JSX.Element {
  const {promo: {name, posterImage, genre, released, backgroundImage, id}, currentMovie} = useAppSelector(({DATA}) => DATA);
  const {authorizationStatus} = useAppSelector(({USER}) => USER);
  let isFavorite = false;
  const dispatch = useAppDispatch();

  const handleClick = () => dispatch(resetMoviesCount());

  if (id === currentMovie.id) {
    isFavorite = currentMovie.isFavorite;
  }

  return (
    <section className="film-card">
      <div className="film-card__bg">
        <img src={backgroundImage} alt={name}/>
      </div>
      <h1 className="visually-hidden">WTW</h1>
      <header className="page-header film-card__head">
        <div className="logo">
          <Link onClick={handleClick} to={AppRoute.Main} className="logo__link">
            <span className="logo__letter logo__letter--1">W</span>
            <span className="logo__letter logo__letter--2">T</span>
            <span className="logo__letter logo__letter--3">W</span>
          </Link>
        </div>

        {authorizationStatus === AuthorizationStatus.Auth ? <AuthComponent /> : <NoAuthComponent/>}

      </header>
      <div className="film-card__wrap">
        <div className="film-card__info">
          <div className="film-card__poster">
            <img src={posterImage} alt={name} width="218" height="327" />
          </div>
          <div className="film-card__desc">
            <h2 className="film-card__title">{name}</h2>
            <p className="film-card__meta">
              <span className="film-card__genre">{genre}</span>
              <span className="film-card__year">{released}</span>
            </p>
            <div className="film-card__buttons">
              <PlayButtonComponent id={Number(id)} />
              <MyListButtonComponent id={id} isFavorite={isFavorite} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default MainHeaderComponent;
