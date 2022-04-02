import {Comment} from '../../types/movies';

type CommentProps = {
  commentData: Comment;
}
function CommentComponent({commentData}: CommentProps): JSX.Element {
  const {user: {name}, comment, date, rating} = commentData;

  return (
    <div className="review">
      <blockquote className="review__quote">
        <p className="review__text">{comment}</p>

        <footer className="review__details">
          <cite className="review__author">{name}</cite>
          <time className="review__date" dateTime="2016-12-20">{date}</time>
        </footer>
      </blockquote>

      <div className="review__rating">{rating}</div>
    </div>
  );
}

export default CommentComponent;
