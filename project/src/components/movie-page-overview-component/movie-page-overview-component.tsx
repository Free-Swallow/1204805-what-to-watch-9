import {useAppSelector} from '../../hooks';
import {RatingNumber, RatingText} from '../../const';

function MoviePageOverviewComponent(): JSX.Element {
  const {currentMovie: {rating, scoresCount, description, director,starring}} = useAppSelector((state) => state);

  const getRating = (ratingMovie: number) => {
    if (ratingMovie <= RatingNumber.Bad) {
      return RatingText.Bad;
    }

    if (ratingMovie > RatingNumber.Bad && ratingMovie <= RatingNumber.Normal) {
      return RatingText.Normal;
    }

    if (ratingMovie > RatingNumber.Normal && ratingMovie <= RatingNumber.Good) {
      return RatingText.Good;
    }

    if (ratingMovie > RatingNumber.Good && ratingMovie < RatingNumber.Awesome) {
      return RatingText.VeryGood;
    }

    if (ratingMovie === RatingNumber.Awesome) {
      return RatingText.Awesome;
    }
  };

  return (
    <>
      <div className="film-rating">
        <div className="film-rating__score">{rating}</div>
        <p className="film-rating__meta">
          <span className="film-rating__level">{getRating(rating)}</span>
          <span className="film-rating__count">{scoresCount} ratings</span>
        </p>
      </div>

      <div className="film-card__text">
        <p>{description}</p>

        <p className="film-card__director"><strong>Director: {director}</strong></p>

        <p className="film-card__starring"><strong>Starring: {starring.join(', ')}</strong></p>
      </div>
    </>
  );
}

export default MoviePageOverviewComponent;
