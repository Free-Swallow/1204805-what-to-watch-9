import {Link} from 'react-router-dom';
import {AppRoute} from '../../const';
import {useAppDispatch} from '../../hooks';
import {resetMoviesCount} from '../../store/content-process/content-process';

function FooterComponent(): JSX.Element {
  const dispatch = useAppDispatch();

  const handleClick = () => dispatch(resetMoviesCount());

  return (
    <footer className="page-footer">
      <div className="logo">
        <Link onClick={handleClick} to={AppRoute.Main} className="logo__link logo__link--light">
          <span className="logo__letter logo__letter--1">W</span>
          <span className="logo__letter logo__letter--2">T</span>
          <span className="logo__letter logo__letter--3">W</span>
        </Link>
      </div>

      <div className="copyright">
        <p>© 2019 What to watch Ltd.</p>
      </div>
    </footer>
  );
}

export default FooterComponent;
