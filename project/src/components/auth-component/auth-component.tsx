import {logoutAction} from '../../store/api-actions';
import {Link, useNavigate} from 'react-router-dom';
import {useAppDispatch} from '../../hooks';
import {AppRoute} from '../../const';
import {resetMoviesCount} from '../../store/content-process/content-process';

function AuthComponent(): JSX.Element {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleClickAvatar = () => {
    navigate(AppRoute.MyList);
    dispatch(resetMoviesCount());
  };

  return (
    <ul className="user-block">
      <li className="user-block__item">
        <div onClick={handleClickAvatar} className="user-block__avatar">
          <img src="../img/avatar.jpg" alt="User avatar" width="63" height="63"/>
        </div>
      </li>
      <li className="user-block__item">
        <Link onClick={(evt) => {evt.preventDefault(); dispatch(logoutAction()); dispatch(resetMoviesCount());}} to='/' className="user-block__link">Sign out</Link>
      </li>
    </ul>
  );
}

export default AuthComponent;
