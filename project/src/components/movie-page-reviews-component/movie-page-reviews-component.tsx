import CommentComponent from '../comment-component/comment-component';
import {CommentsData} from '../../types/movies';

type MoviePageReviewsProps = {
  comments: CommentsData;
}

function MoviePageReviewsComponent({comments}: MoviePageReviewsProps): JSX.Element {
  const randomComments = comments.slice(0, 3);
  const randomCommentsSecond = comments.slice(-3);

  return (
    <div className="film-card__reviews film-card__row">
      <div className="film-card__reviews-col">
        {randomComments.map((comment) => (<CommentComponent key={comment.id} comment={comment} />))}
      </div>

      <div className="film-card__reviews-col">
        {randomCommentsSecond.map((comment) => (<CommentComponent key={comment.id} comment={comment} />))}
      </div>
    </div>
  );
}

export default MoviePageReviewsComponent;
