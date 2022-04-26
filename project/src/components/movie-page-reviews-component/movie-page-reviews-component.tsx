import CommentComponent from '../comment-component/comment-component';
import {useAppSelector, useAppDispatch} from '../../hooks';
import {useEffect} from 'react';
import {fetchCurrentMovieComments} from '../../store/api-actions';
import {MIN_COMMENT} from '../../const';
import {getCurrentMovie, getCommentList} from '../../store/data-process/selectors';

function MoviePageReviewsComponent(): JSX.Element {
  const currentMovie = useAppSelector(getCurrentMovie);
  const currentMovieComments = useAppSelector(getCommentList);
  const {id} = currentMovie;
  const dispatch = useAppDispatch();

  const firstBlockComments =
    currentMovieComments.length % 2 === 0
      ? currentMovieComments.length / 2
      : Math.ceil(currentMovieComments.length / 2);

  const leftBlockComments = currentMovieComments.slice(
    MIN_COMMENT,
    firstBlockComments);
  const rightBlockComments = currentMovieComments.slice(
    firstBlockComments);

  useEffect(() => {
    dispatch(fetchCurrentMovieComments(id));
  }, [dispatch, id]);

  return (
    <div className="film-card__reviews film-card__row">
      <div data-testid="first-comment-col" className="film-card__reviews-col">
        {leftBlockComments.map((comment) => (<CommentComponent key={comment.id} commentData={comment} />))}
      </div>

      <div data-testid="second-comment-col" className="film-card__reviews-col">
        {rightBlockComments.map((comment) => (<CommentComponent key={comment.id} commentData={comment} />))}
      </div>
    </div>
  );
}

export default MoviePageReviewsComponent;
