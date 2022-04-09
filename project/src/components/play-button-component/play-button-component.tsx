import {useNavigate} from 'react-router-dom';
import {AppRoute} from '../../const';
import {useAppDispatch} from '../../hooks';
import {resetMoviesCount} from '../../store/content-process/content-process';

type PlayButtonProps = {
  id: number
}

function PlayButtonComponent({id}: PlayButtonProps): JSX.Element {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleClick = () => {
    dispatch(resetMoviesCount());
    navigate(`${AppRoute.Player}/${id}`);
  };

  return (
    <button onClick={() => {handleClick()}} className="btn btn--play film-card__button" type="button">
      <svg viewBox="0 0 19 19" width="19" height="19">
        <use xlinkHref="#play-s"></use>
      </svg>
      <span>Play</span>
    </button>
  );
}

export default PlayButtonComponent;
