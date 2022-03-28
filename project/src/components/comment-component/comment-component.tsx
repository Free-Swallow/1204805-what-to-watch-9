import {Comment} from '../../types/movies';

type CommentProps = {
  comment: Comment;
}
function CommentComponent({comment}: CommentProps): JSX.Element {
  const {name} = comment.user;

  return (
    <div className="review">
      <blockquote className="review__quote">
        <p className="review__text">{comment.comment}</p>

        <footer className="review__details">
          <cite className="review__author">{name}</cite>
          <time className="review__date" dateTime="2016-12-20">{comment.date}</time>
        </footer>
      </blockquote>

      <div className="review__rating">{comment.rating}</div>
    </div>
  );
}

export default CommentComponent;
