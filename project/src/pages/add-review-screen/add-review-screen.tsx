import AuthComponent from '../../components/auth-component/auth-component';
import {Link, useParams} from 'react-router-dom';
import {AppRoute} from '../../const';
import {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {fetchCurrentMovieAction} from '../../store/api-actions';
import {isPushComment} from '../../store/data-process/data-process';
import AddReviewFormComponent from '../../components/add-review-form-component/add-review-form-component';
import LogoComponent from '../../components/logo-component/logo-component';
import {getCurrentMovie} from '../../store/data-process/selectors';
import VisuallyHiddenComponent from '../../components/visually-hidden-component/visually-hidden-component';

function AddReviewScreen(): JSX.Element {
  const {id} = useParams();

  const currentMovie = useAppSelector(getCurrentMovie);
  const {name, posterImage, backgroundImage} = currentMovie;
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchCurrentMovieAction(Number(id)));
    dispatch(isPushComment(false));
  }, [dispatch, id]);

  return (
    <section className="film-card film-card--full">
      <div className="film-card__header">
        <div className="film-card__bg">
          <img data-testid="background-img" src={backgroundImage} alt={name}/>
        </div>
        <VisuallyHiddenComponent />
        <header className="page-header">
          <LogoComponent classAttribute={''} />
          <nav data-testid="review-nav" className="breadcrumbs">
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
