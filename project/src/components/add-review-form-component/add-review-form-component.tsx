import {CommentUser} from '../../types/movies';
import {AppRoute, COMMENT_MAX_LENGTH, COMMENT_MIN_LENGTH, RATING_DEFAULT, ratings} from '../../const';
import {ChangeEvent, FormEvent, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {pushCurrentMovieComment} from '../../store/api-actions';

function AddReviewFormComponent() {
  const [commentText, setCommentText] = useState('');
  const [ratingMovie, setRatingMovie] = useState(RATING_DEFAULT);
  const {id} = useParams();
  const navigate = useNavigate();

  const {isCommentPush} = useAppSelector(({DATA}) => DATA);
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

    navigate(`${AppRoute.Film}/${id}/${AppRoute.Reviews}`);
  };

  return (
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
  );
}

export default AddReviewFormComponent;
