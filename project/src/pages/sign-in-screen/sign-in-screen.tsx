import FooterComponent from '../../components/footer-component/footer-component';
import {Link, useNavigate} from 'react-router-dom';
import {AppRoute, AuthorizationStatus} from '../../const';
import {FormEvent, useRef} from 'react';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {loginAction} from '../../store/api-actions';
import {AuthData} from '../../types/auth-data';
import {toast} from 'react-toastify';

function SignInScreen(): JSX.Element {
  const loginRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const {authorizationStatus} = useAppSelector(({USER}) => USER);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onSubmit = (authData: AuthData) => {
    dispatch(loginAction(authData));
  };

  const validationPassword = /^.*(?=.{2,})(?=.*\d)(?=.*[a-zA-Z]).*$/i;


  const checkValidatePassword = (value: string) => {
    if (!validationPassword.test(String(value).toLowerCase())) {
      toast.error('Некорректный пароль. Должен содержать минимум одну букву и одну цифру.');
    }
  };

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    if (passwordRef.current !== null) {
      checkValidatePassword(passwordRef.current.value);
    }

    if (loginRef.current !== null &&
      passwordRef.current !== null &&
      loginRef.current.value.length &&
      passwordRef.current.value.length &&
      validationPassword.test(String(passwordRef.current.value).toLowerCase())
    ) {
      passwordRef.current.reportValidity();
      onSubmit({
        login: loginRef.current.value,
        password: passwordRef.current.value,
      });

      navigate(-1);
    }
  };


  if (authorizationStatus === AuthorizationStatus.Auth) {
    navigate(AppRoute.Main);
  }

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

        <h1 className="page-title user-page__title">Sign in</h1>
      </header>

      <div className="sign-in user-page__content">
        <form onSubmit={handleSubmit} action="" className="sign-in__form">
          <div className="sign-in__fields">
            <div className="sign-in__field">
              <input ref={loginRef} className="sign-in__input" type="email" placeholder="Email address" name="user-email" id="user-email"/>
              <label className="sign-in__label visually-hidden" htmlFor="user-email">Email address</label>
            </div>
            <div className="sign-in__field">
              <input ref={passwordRef} className="sign-in__input" type="password" placeholder="Password" name="user-password" id="user-password"/>
              <label className="sign-in__label visually-hidden" htmlFor="user-password">Password</label>
            </div>
          </div>
          <div className="sign-in__submit">
            <button className="sign-in__btn" type="submit">Sign in</button>
          </div>
        </form>
      </div>
      <FooterComponent />
    </div>
  );
}

export default SignInScreen;
