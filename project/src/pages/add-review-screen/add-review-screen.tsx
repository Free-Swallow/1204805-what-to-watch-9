import AuthComponent from '../../components/auth-component/auth-component';
import {Link, useParams} from 'react-router-dom';
import {AppRoute} from '../../const';
import {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {fetchCurrentMovieAction} from '../../store/api-actions';
import {isPushComment} from '../../store/data-process/data-process';
import AddReviewFormComponent from '../../components/add-review-form-component/add-review-form-component';

function AddReviewScreen(): JSX.Element {
  const {id} = useParams();

  const {currentMovie: {name, posterImage, backgroundImage}} = useAppSelector(({DATA}) => DATA);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchCurrentMovieAction(Number(id)));
    dispatch(isPushComment(false));
  }, [dispatch, id]);

  return (
    <section className="film-card film-card--full">
      <div className="film-card__header">
        <div className="film-card__bg">
          <img src={backgroundImage} alt={name}/>
        </div>

        <h1 className="visually-hidden">WTW</h1>

        <header className="page-header">
          <div className="logo">
            <Link to={AppRoute.Main} className="logo__link">
              <span className="logo__letter logo__letter--1">W</span>
              <span className="logo__letter logo__letter--2">T</span>
              <span className="logo__letter logo__letter--3">W</span>
            </Link>
          </div>

          <nav className="breadcrumbs">
            <ul className="breadcrumbs__list">
              <li className="breadcrumbs__item">
                <Link to={`${AppRoute.Film}/${id}`} className="breadcrumbs__link">{name}</Link>
              </li>
              <li className="breadcrumbs__item">
                <Link to={`${AppRoute.Film}/${id}/${AppRoute.Reviews}`} className="breadcrumbs__link">Add review</Link>
              </li>
            </ul>
          </nav>

          <AuthComponent />

        </header>

        <div className="film-card__poster film-card__poster--small">
          <img src={posterImage} alt={name} width="218" height="327"/>
        </div>
      </div>

      <AddReviewFormComponent />

    </section>
  );
}

export default AddReviewScreen;
