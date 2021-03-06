import {APIRoute} from '../../const';
import {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import VideoPlayerComponent from '../video-player-component/video-player-component';
import {MovieCardProps} from '../../types/components';
import {useAppDispatch} from '../../hooks';
import {resetMoviesCount} from '../../store/content-process/content-process';

function MovieCardComponent({movie}: MovieCardProps): JSX.Element {
  const {name, id, videoLink, previewImage} = movie;
  const navigate = useNavigate();
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  const handleClick = () => {
    navigate(`${APIRoute.Movies}/${id}`);
    window.scrollTo(0, 0);
    dispatch(resetMoviesCount());
  };

  function handleMouseOver() {
    setIsPlaying(true);
  }

  function handleMouseLeave() {
    setIsPlaying(false);
  }

  return (
    <article data-testid="movie-card" className="small-film-card catalog__films-card" onClick={handleClick} onMouseOver={handleMouseOver} onMouseLeave={handleMouseLeave}>
      <div data-testid={isPlaying} className="small-film-card__image">
        <VideoPlayerComponent isPlaying={isPlaying} src={videoLink} srcPoster={previewImage}/>
      </div>
      <h3 className="small-film-card__title">
        <Link data-testid="card-link" to={`${APIRoute.Movies}/${id}`} className="small-film-card__link">{name}</Link>
      </h3>
    </article>
  );
}

export default MovieCardComponent;
