import {Link} from 'react-router-dom';
import {AppRoute} from '../../const';
import {errorLinkStyle} from './error-link-style';
import LogoComponent from '../logo-component/logo-component';

function ErrorComponent(): JSX.Element {
  return (
    <div className="user-page">
      <header className="page-header user-page__head">
        <LogoComponent classAttribute={''} />

        <h1 className="page-title user-page__title">Ooops! 404. Something is wrong.</h1>

      </header>
      <div className="sign-in user-page__content">
        <div className="sign-in__fields">
          <div className="sign-in__submit">
            <Link className="sign-in__btn" to={AppRoute.Main} style={errorLinkStyle}>Return Main page?</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ErrorComponent;
