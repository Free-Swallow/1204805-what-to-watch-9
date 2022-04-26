import {logoutAction} from '../../store/api-actions';
import {Link, useNavigate} from 'react-router-dom';
import {useAppDispatch} from '../../hooks';
import {AppRoute, defaultGenre, AVATAR_URL} from '../../const';
import {changeGenre, resetMoviesCount} from '../../store/content-process/content-process';
import {MouseEvent} from 'react';

function AuthComponent(): JSX.Element {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleClickAvatar = () => {
    navigate(AppRoute.MyList);
    dispatch(resetMoviesCount());
    dispatch(changeGenre(defaultGenre));
  };

  const handleClickLink = (evt: MouseEvent<HTMLAnchorElement>) => {
    evt.preventDefault();
    dispatch(changeGenre(defaultGenre));
    dispatch(logoutAction());
    dispatch(resetMoviesCount());
  };

  return (
    <ul className="user-block">
      <li className="user-block__item">
        <div onClick={handleClickAvatar} className="user-block__avatar" data-testid="img-link">
          <img src={AVATAR_URL} alt="User avatar" width="63" height="63" data-testid="auth-img" />
        </div>
      </li>
      <li className="user-block__item">
        <Link onClick={handleClickLink} to='/' className="user-block__link">Sign out</Link>
      </li>
    </ul>
  );
}

export default AuthComponent;
