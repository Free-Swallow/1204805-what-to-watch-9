import CommentComponent from '../comment-component/comment-component';
import {useAppSelector, useAppDispatch} from '../../hooks';
import {useEffect} from 'react';
import {fetchCurrentMovieComments} from '../../store/api-actions';

function MoviePageReviewsComponent(): JSX.Element {
  const {currentMovie: {id}, currentMovieComments} = useAppSelector((state) => state);
  const dispatch = useAppDispatch();

  const firstBlockComments =
    currentMovieComments.length % 2 === 0
      ? currentMovieComments.length / 2
      : Math.ceil(currentMovieComments.length / 2);

  const leftBlockComments = currentMovieComments.slice(
    0,
    firstBlockComments);
  const rightBlockComments = currentMovieComments.slice(
    firstBlockComments);

  useEffect(() => {
    dispatch(fetchCurrentMovieComments(id));
  }, [dispatch, id]);

  return (
    <div className="film-card__reviews film-card__row">
      <div className="film-card__reviews-col">
        {leftBlockComments.map((comment) => (<CommentComponent key={comment.id} commentData={comment} />))}
      </div>

      <div className="film-card__reviews-col">
        {rightBlockComments.map((comment) => (<CommentComponent key={comment.id} commentData={comment} />))}
      </div>
    </div>
  );
}

export default MoviePageReviewsComponent;
