import {Movie, CommentsData} from '../../types/movies';
import {Link, Route, Routes} from 'react-router-dom';
import MoviePageOverviewComponent from '../movie-page-overview-component/movie-page-overview-component';
import MoviePageDetailsComponent from '../movie-page-details-component/movie-page-details-component';
import MoviePageReviewsComponent from '../movie-page-reviews-component/movie-page-reviews-component';

type TabsMovieProps = {
  movie: Movie;
  comments: CommentsData;
}

function TabsMovieComponent({movie, comments}: TabsMovieProps): JSX.Element {
  return (
    <div className="film-card__desc">
      <nav className="film-nav film-card__nav">
        <ul className="film-nav__list">
          <li className="film-nav__item film-nav__item--active">
            <Link to='overview' className="film-nav__link">Overview</Link>
          </li>
          <li className="film-nav__item">
            <Link to='details' className="film-nav__link">Details</Link>
          </li>
          <li className="film-nav__item">
            <Link to='reviews' className="film-nav__link">Reviews</Link>
          </li>
        </ul>
      </nav>

      <Routes>
        <Route index element={<MoviePageOverviewComponent movie={movie} />}/>
        <Route path='/overview' element={<MoviePageOverviewComponent movie={movie} />}/>
        <Route path='/details' element={<MoviePageDetailsComponent movie={movie} />}/>
        <Route path='/reviews' element={<MoviePageReviewsComponent comments={comments} />}/>
      </Routes>

    </div>
  );
}

export default TabsMovieComponent;
