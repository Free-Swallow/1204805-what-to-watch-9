import {Link} from 'react-router-dom';
import {AppRoute, defaultGenre} from '../../const';
import {useAppDispatch} from '../../hooks';
import {changeGenre, resetMoviesCount} from '../../store/content-process/content-process';

function NoAuthComponent(): JSX.Element {
  const dispatch = useAppDispatch();

  const handleClickAvatar = () => {
    dispatch(resetMoviesCount());
    dispatch(changeGenre(defaultGenre));
  };

  return (
    <div className="user-block">
      <Link onClick={handleClickAvatar} to={AppRoute.SignIn} className="user-block__link">Sign in</Link>
    </div>
  );
}

export default NoAuthComponent;
