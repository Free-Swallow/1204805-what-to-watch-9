import AuthComponent from '../../components/auth-component/auth-component';
import {CommentUser} from '../../types/movies';
import {Link, useParams, useNavigate} from 'react-router-dom';
import {APIRoute, RATING_DEFAULT, COMMENT_MAX_LENGTH, COMMENT_MIN_LENGTH, AppRoute} from '../../const';
import {useState, ChangeEvent, useEffect, FormEvent} from 'react';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {fetchCurrentMovieAction} from '../../store/api-actions';
import {isPushComment} from '../../store/action';
import {pushCurrentMovieComment} from '../../store/api-actions';
import {ratings} from '../../const';

function AddReviewScreen(): JSX.Element {
  const [commentText, setCommentText] = useState('');
  const [ratingMovie, setRatingMovie] = useState(RATING_DEFAULT);
  const {id} = useParams();
  const navigate = useNavigate();

  const {currentMovie: {name, posterImage, backgroundImage}, isCommentPush} = useAppSelector((state) => state);
  const dispatch = useAppDispatch();

  const fieldChangeHandle = (evt: ChangeEvent<HTMLTextAreaElement>): void => {
    const {value} = evt.target;

    setCommentText(value);
  };

  const onSubmit = (comment: CommentUser) => {
    dispatch(pushCurrentMovieComment(comment));
  };

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    onSubmit({
      comment: commentText,
      rating: ratingMovie,
      id: Number(id),
    });

    navigate(`${APIRoute.Movies}/${id}${APIRoute.reviews}`);
  };

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
                <Link to={`${APIRoute.Movies}/${id}`} className="breadcrumbs__link">{name}</Link>
              </li>
              <li className="breadcrumbs__item">
                <Link to={`${APIRoute.Movies}/${id}${APIRoute.reviews}`} className="breadcrumbs__link">Add review</Link>
              </li>
            </ul>
          </nav>

          <AuthComponent />

        </header>

        <div className="film-card__poster film-card__poster--small">
          <img src={posterImage} alt={name} width="218" height="327"/>
        </div>
      </div>

      <div className="add-review">
        <form action="#" className="add-review__form" onSubmit={handleSubmit}>
          <div className="rating">
            <div className="rating__stars">
              {ratings.map(({rating}) => (
                <>
                  <input onChange={(evt) => setRatingMovie(Number(evt.target.value))} className="rating__input" key={rating} id={`star-${rating}`} type="radio" name="rating" value={rating}/>
                  <label className="rating__label" htmlFor={`star-${rating}`}>Rating {ratingMovie}</label>
                </>
              ))}
            </div>
          </div>

          <div className="add-review__text">
            <textarea maxLength={COMMENT_MAX_LENGTH} minLength={COMMENT_MIN_LENGTH} value={commentText} onChange={(fieldChangeHandle)} className="add-review__textarea" name="review-text" id="review-text" placeholder="Review text"></textarea>
            <div className="add-review__submit">
              <button className="add-review__btn" type="submit" disabled={ratingMovie === RATING_DEFAULT || commentText.length < COMMENT_MIN_LENGTH || commentText.length > COMMENT_MAX_LENGTH || isCommentPush}>Post</button>
            </div>

          </div>
        </form>
      </div>

    </section>
  );
}

export default AddReviewScreen;
