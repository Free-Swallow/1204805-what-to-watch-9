import {AppRoute, defaultGenre} from '../../const';
import {Link} from 'react-router-dom';
import {changeGenre, resetMoviesCount} from '../../store/content-process/content-process';
import {useAppDispatch} from '../../hooks';
import classNames from 'classnames';

type LogoProps = {
  classAttribute: string;
}

function LogoComponent({classAttribute}: LogoProps): JSX.Element {
  const dispatch = useAppDispatch();

  const handleClick = () => {
    dispatch(changeGenre(defaultGenre));
    dispatch(resetMoviesCount());
    window.scrollTo(0, 0);
  };

  return (
    <div className="logo">
      <Link onClick={handleClick} to={AppRoute.Main} className={classNames('logo__link', classAttribute)} data-testid="link-logo">
        <span className="logo__letter logo__letter--1" data-testid="logo-1">W</span>
        <span className="logo__letter logo__letter--2" data-testid="logo-2">T</span>
        <span className="logo__letter logo__letter--3" data-testid="logo-3">W</span>
      </Link>
    </div>
  );
}

export default LogoComponent;
