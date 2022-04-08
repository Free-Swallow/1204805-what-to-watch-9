import {Movie} from '../../types/movies';
import {APIRoute} from '../../const';
import {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import VideoPlayerComponent from '../video-player-component/video-player-component';

type MovieCardProps = {
  movie: Movie;
}

// Записал в title currentMovie чтоб lint не ругался

function MovieCardComponent({movie}: MovieCardProps): JSX.Element {
  const {name, id, videoLink, previewImage} = movie;
  const navigate = useNavigate();
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  const handleClick = () => {
    navigate(`${APIRoute.Movies}/${id}`);
  };

  function handleMouseOver() {
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
    <article className="small-film-card catalog__films-card" onDoubleClick={() => {handleChangeMute();}} onClick={() => {handleClick();}} onMouseOver={() => {handleMouseOver();}} onMouseLeave={() => {handleMouseLeave();}}>
      <div className="small-film-card__image">
        <VideoPlayerComponent muted={isMuted} isPlaying={isPlaying} src={videoLink} srcPoster={previewImage}/>
      </div>
      <h3 className="small-film-card__title">
        <Link to={`${APIRoute.Movies}/${id}`} className="small-film-card__link">{name}</Link>
      </h3>
    </article>
  );
}

export default MovieCardComponent;
