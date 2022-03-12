import {StyleMovie} from '../../types/movies';
import {AppRoute} from '../../const';
import {useState} from 'react';
import {Link} from 'react-router-dom';

type MovieCardProps = {
  movie: StyleMovie;
}

// Записал в title currentMovie чтоб lint не ругался

function MovieCardComponent({movie}: MovieCardProps): JSX.Element {
  const [currentMovie, setRecMovie] = useState('');

  return (
    <article className="small-film-card catalog__films-card" onMouseOver={() => {setRecMovie(`${movie.id}`);}}>
      <div className="small-film-card__image">
        <img src={movie.previewImage} title={currentMovie} alt="Orlando" width="280" height="175"/>
      </div>
      <h3 className="small-film-card__title">
        <Link to={AppRoute.Film} className="small-film-card__link">{movie.name}</Link>
      </h3>
    </article>
  );
}

export default MovieCardComponent;
