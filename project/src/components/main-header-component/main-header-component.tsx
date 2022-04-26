import AuthComponent from '../auth-component/auth-component';
import NoAuthComponent from '../no-auth-component/no-auth-component';
import {useAppSelector} from '../../hooks';
import {AuthorizationStatus} from '../../const';
import PlayButtonComponent from '../play-button-component/play-button-component';
import MyListButtonComponent from '../my-list-button-component/my-list-button-component';
import LogoComponent from '../logo-component/logo-component';
import {getCurrentMovie, getPromo} from '../../store/data-process/selectors';
import {getAuthStatus} from '../../store/user-process/selectors';
import VisuallyHiddenComponent from '../visually-hidden-component/visually-hidden-component';

function MainHeaderComponent(): JSX.Element {
  const promo = useAppSelector(getPromo);
  const {name, posterImage, genre, released, backgroundImage, id, backgroundColor} = promo;
  const currentMovie = useAppSelector(getCurrentMovie);
  const authorizationStatus = useAppSelector(getAuthStatus);
  let isFavorite = false;

  if (id === currentMovie.id) {
    isFavorite = currentMovie.isFavorite;
  }

  return (
    <section className="film-card" style={{backgroundColor: backgroundColor}}>
      <div className="film-card__bg">
        <img src={backgroundImage} alt={name}/>
      </div>
      <VisuallyHiddenComponent />
      <header className="page-header film-card__head">
        <LogoComponent classAttribute={''} />
        {authorizationStatus === AuthorizationStatus.Auth ? <AuthComponent /> : <NoAuthComponent/>}
      </header>
      <div className="film-card__wrap">
        <div className="film-card__info">
          <div className="film-card__poster">
            <img data-testid="img-promo" src={posterImage} alt={name} width="218" height="327" />
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
