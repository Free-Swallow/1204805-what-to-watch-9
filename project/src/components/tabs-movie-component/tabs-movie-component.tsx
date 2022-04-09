import {Link, Route, Routes, useLocation} from 'react-router-dom';
import MoviePageOverviewComponent from '../movie-page-overview-component/movie-page-overview-component';
import MoviePageDetailsComponent from '../movie-page-details-component/movie-page-details-component';
import MoviePageReviewsComponent from '../movie-page-reviews-component/movie-page-reviews-component';
import {AppRoute} from '../../const';
import classNames from 'classnames';

function TabsMovieComponent(): JSX.Element {
  const {pathname} = useLocation();

  return (
    <div className="film-card__desc">
      <nav className="film-nav film-card__nav">
        <ul className="film-nav__list">
          <li className={classNames('film-nav__item', {'film-nav__item--active' : pathname.includes(AppRoute.Overview)})}>
            <Link to={AppRoute.Overview} className="film-nav__link">Overview</Link>
          </li>
          <li className={classNames('film-nav__item', {'film-nav__item--active' : pathname.includes(AppRoute.Details)})}>
            <Link to={AppRoute.Details} className="film-nav__link">Details</Link>
          </li>
          <li className={classNames('film-nav__item', {'film-nav__item--active' : pathname.includes(AppRoute.Reviews)})}>
            <Link to={AppRoute.Reviews} className="film-nav__link">Reviews</Link>
          </li>
        </ul>
      </nav>

      <Routes>
        <Route index element={<MoviePageOverviewComponent />}/>
        <Route path={AppRoute.Overview} element={<MoviePageOverviewComponent />}/>
        <Route path={AppRoute.Details} element={<MoviePageDetailsComponent />}/>
        <Route path={AppRoute.Reviews} element={<MoviePageReviewsComponent />}/>
      </Routes>

    </div>
  );
}

export default TabsMovieComponent;
