import {Movie} from '../../types/movies';
import {AppRoute} from '../../const';
import {useState} from 'react';
import {Link} from 'react-router-dom';
import VideoPlayerComponent from '../video-player-component/video-player-component';

type MovieCardProps = {
  movie: Movie;
}

// Записал в title currentMovie чтоб lint не ругался

function MovieCardComponent({movie}: MovieCardProps): JSX.Element {
  // const [currentMovie, setRecordMovie] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  function handleMouseOver() {
    // setRecordMovie(movie.id);
    setIsPlaying(true);
  }

  function handleMouseLeave() {
    setIsPlaying(false);
  }

  // Данная функция просто отсебятина
  function handleChangeMute() {
    setIsMuted(!isMuted);
  }

  return (
    <article className="small-film-card catalog__films-card" onClick={() => {handleChangeMute();}} onMouseOver={() => {handleMouseOver();}} onMouseLeave={() => {handleMouseLeave();}}>
      <div className="small-film-card__image">
        <VideoPlayerComponent muted={isMuted} isPlaying={isPlaying} src={movie.videoLink} srcPoster={movie.previewImage}/>
      </div>
      <h3 className="small-film-card__title">
        <Link to={AppRoute.Film} className="small-film-card__link">{movie.name}</Link>
      </h3>
    </article>
  );
}

export default MovieCardComponent;
