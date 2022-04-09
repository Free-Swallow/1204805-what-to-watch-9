import {Link} from 'react-router-dom';
import {AppRoute} from '../../const';
import {ErrorScreenProps} from '../../types/components';
import {errorLinkStyle} from '../../style/error-link-style';

function ErrorScreen({link}: ErrorScreenProps): JSX.Element {
  return (
    <div className="user-page">
      <header className="page-header user-page__head">
        <div className="logo">
          <Link to={AppRoute.Main} className="logo__link">
            <span className="logo__letter logo__letter--1">W</span>
            <span className="logo__letter logo__letter--2">T</span>
            <span className="logo__letter logo__letter--3">W</span>
          </Link>
        </div>

        <h1 className="page-title user-page__title">Ooops! 404. Something is wrong.</h1>

      </header>
      <div className="sign-in user-page__content">
        <div className="sign-in__fields">
          <div className="sign-in__submit">
            <Link className="sign-in__btn" to={link} style={errorLinkStyle}>Return Main page?</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ErrorScreen;
