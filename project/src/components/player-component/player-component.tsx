import {useAppSelector, useAppDispatch} from '../../hooks';
import {useParams, useNavigate} from 'react-router-dom';
import {useEffect, useRef, useState, FormEvent} from 'react';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import {fetchCurrentMovieAction} from '../../store/api-actions';
import LoadingScreen from '../../components/loading-component/loading-component';
import {CURRENT_TIME_MOVIE} from '../../const';
dayjs.extend(duration);

function PlayerComponent(): JSX.Element {
  const {currentMovie: {videoLink, previewVideoLink, runTime, name}, isCurrentMovieLoaded} = useAppSelector(({DATA}) => DATA);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(CURRENT_TIME_MOVIE);
  const [videoDuration, setVideoDuration] = useState(videoRef.current?.duration);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const {id} = useParams();
  const progressVideoStyle: {left: string} = {left: `${currentTime}%`};

  const handleVideoPlay = () => {
    setIsPlaying(!isPlaying);
  };

  const movieDuration = dayjs.duration(videoDuration || runTime, 'seconds');
  const convertDuration = movieDuration.asHours() >= 1 ? movieDuration.format('-HH:mm:ss') : movieDuration.format('-mm:ss');

  const handleTimeChange = () => {
    if (videoRef && videoRef.current) {
      setCurrentTime((videoRef.current?.currentTime / videoRef.current?.duration) * 100);
      setVideoDuration(videoRef.current.duration - videoRef.current.currentTime);
    }
  };

  const handleVideoCurrentTime = (evt: FormEvent<HTMLProgressElement>) => {
    if (videoRef && videoRef.current) {
      const target = evt.target as HTMLProgressElement;
      const change = Number(target.value);
      videoRef.current.currentTime = (videoRef.current?.duration / 100) * change;
      setCurrentTime(change);
    }
  };

  const handleExit = () => navigate(-1);

  const handleClickFullScreen = () => videoRef.current?.requestFullscreen();

  useEffect(() => {
    dispatch(fetchCurrentMovieAction(Number(id)));
    if (videoRef.current === null) {
      return;
    }

    if (isPlaying) {
      videoRef.current.play();
      return;
    }

    videoRef.current.pause();
  }, [dispatch, id, isPlaying]);

  useEffect(() => {
    if (videoRef.current !== null) {
      videoRef.current.onloadeddata = () => setIsPlaying(true);
    }
    return () => {
      if (videoRef.current !== null) {
        videoRef.current.onloadeddata = null;
        videoRef.current = null;
      }
    };
  }, [dispatch, id]);

  if (!isCurrentMovieLoaded) {
    return <LoadingScreen />;
  }

  return (
    <div className="player">
      <video data-testid="video" onTimeUpdate={handleTimeChange} ref={videoRef} src={videoLink} className="player__video" poster={previewVideoLink}></video>

      <button onClick={handleExit} type="button" className="player__exit">Exit</button>

      <div className="player__controls">
        <div className="player__controls-row">
          <div className="player__time">
            <progress onChange={(evt) => handleVideoCurrentTime(evt)} className="player__progress" value={currentTime} max="100"></progress>
            <div className="player__toggler" style={progressVideoStyle}>Toggler</div>
          </div>
          <div className="player__time-value">{convertDuration}</div>
        </div>

        <div className="player__controls-row">
          <button data-testid={`play-set-${isPlaying}`} onClick={handleVideoPlay} type="button" className="player__play">
            {isPlaying ? <><svg viewBox="0 0 14 21" width="14" height="21"><use xlinkHref="#pause"></use></svg><span>Pause</span></> : <><svg viewBox="0 0 19 19" width="19" height="19"><use xlinkHref="#play-s"></use></svg><span>Play</span></>}
          </button>
          <div className="player__name">{name}</div>

          <button onClick={handleClickFullScreen} type="button" className="player__full-screen">
            <svg viewBox="0 0 27 27" width="27" height="27">
              <use xlinkHref="#full-screen"></use>
            </svg>
            <span>Full screen</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default PlayerComponent;
